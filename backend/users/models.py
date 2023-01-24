import os

from django.conf import settings
from django.core.files.storage import default_storage


from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


from datetime import datetime

# Create your models here.


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, username, email, phone, first_name, last_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_verified', True)
        other_fields.setdefault('gender', 'male')

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')

        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        if other_fields.get('is_verified') is not True:
            raise ValueError('Superuser must be assigned to is_verified=True.')

        return self.create_user(username, email, phone, first_name, last_name, password, **other_fields)

    def create_user(self, username, email, phone, first_name, last_name, password, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address.'))

        email = self.normalize_email(email)
        user = User(username=username, email=email, phone=phone, full_name=first_name +
                    " "+last_name, first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.set_visible_password(password)
        user.save()
        return user

    # def create_student(self,mail,first_name,last_name,password,phone,parent_phone,gender,levelObject,address,school_name):
    #     if not mail:
    #         raise ValueError(_('You must provide an email address.'))

    #     email = self.normalize_email(mail)
    #     student = Student(
    #             full_name=first_name+" "+last_name,
    #             last_name=last_name,
    #             first_name=first_name,
    #             email=email,
    #             phone= phone,
    #             gender=gender,
    #             parentPhone=parent_phone,
    #             level=levelObject,
    #             address=address,
    #             schoolname=school_name
    #         )

    #     student.set_password(password)
    #     student.save()

    #     return student


GENDER = [
    ('male', 'MALE'),
    ('female', 'FEMALE'),
]


# AbstractUser._meta.get_field('email')._unique = True

class User(AbstractBaseUser, PermissionsMixin):

    profile_image = models.ImageField(
        default="defaults/avatar.svg", upload_to='profile_images/%y/%m/%d', null=True, blank=True)
    username = models.CharField(max_length=150, error_messages={'unique': 'A user with that username already exists.'},
                                help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', unique=True)
    full_name = models.CharField(
        max_length=200, help_text='Required. 200 characters or fewer. Letters, digits and @/./+/-/_ only.', verbose_name="Full Name")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(_('Email Address'), unique=True)
    password = models.CharField(max_length=100)
    raw_password = models.CharField(
        max_length=100, help_text='You have to update and overwite this field value , If You successfully changed the User\'s password ONLY !!!')
    phone = models.CharField(max_length=11, default="", unique=True)
    gender = models.CharField(max_length=10, choices=GENDER)
    is_staff = models.BooleanField(
        default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')
    is_active = models.BooleanField(
        default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')
    date_joined = models.DateTimeField(
        default=timezone.now, verbose_name='Date joined')
    is_verified = models.BooleanField(
        default=False, help_text='Designates whether the user verified his account or not.', verbose_name="Email Verified")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone', 'first_name', 'last_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'All Users'
        ordering = ['id']

    objects = CustomAccountManager()

    def set_profile_image(self, image):
        # print(os.path.getsize(image))
        # print(image.size)
        # print(type(image))

        extenstion = os.path.splitext(image.name)
        print(extenstion)
        file_name = str(self.id) + extenstion[1]
        print(file_name)

        now = datetime.now()
        y = now.strftime("%y")
        m = now.strftime("%m")
        d = now.strftime("%d")
        image_directory = os.path.join(
            'media\\profile_images\\'+str(y)+'\\'+str(m)+'\\'+str(d)+'\\')
        image_url = os.path.join(
            'media/profile_images/'+str(y)+'/'+str(m)+'/'+str(d)+'/', file_name)

        print(image_directory)
        full_image_directory = os.path.join(
            settings.MEDIA_ROOT, image_directory)

        try:
            os.makedirs(full_image_directory, exist_ok=True)
            print("Directory '%s' created successfully" % image_directory)
        except OSError as error:
            print("Directory '%s' can not be created" % image_directory)

        image_path = os.path.join(full_image_directory, file_name)
        # print(image_path)
        print(os.getcwd())
        os.chdir(str(full_image_directory))
        print(os.getcwd())
        # targetFile = os.path.join(path, image)
        print(image_path)

        ###################################

        with open(default_storage.path(image_path), 'wb+') as destination:
            print("write")
            for chunk in image.chunks():
                destination.write(chunk)

        self.profile_image = image_url

        print(self.profile_image)

        self.save()

        # print(self.profile_image.path)
        # print(self.profile_image.url)

    def set_first_name(self, first_name):
        self.first_name = first_name

    def set_last_name(self, last_name):
        self.last_name = last_name

    def set_username(self, username):
        self.username = username

    def set_gender(self, gender):
        self.gender = gender

    def set_email(self, email):
        self.email = email

    def set_visible_password(self, password):
        self.raw_password = password

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return f"{self.full_name} "
