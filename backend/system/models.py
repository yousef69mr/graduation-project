from django.utils import timezone
from django.db import models
# Create your models here.

DIRECTIONS = (
    ("rtl", "Right to Left"),
    ("ltr", "Left to Right")
)

ERAS = (
    ("BC", "BC"),
    ("AD", "AD")
)


class Language(models.Model):
    code = models.CharField(
        unique=True, help_text="Example : [ar ,en,es]", max_length=3, verbose_name="Language Code")
    country_code = models.CharField(
        help_text="Example : [eg ,gb,sa,de]", max_length=3)
    name = models.TextField()
    dir = models.CharField(choices=DIRECTIONS, max_length=3)
    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    class Meta:
        verbose_name = 'Language'
        verbose_name_plural = 'Languages'
        ordering = ['id']

    def __str__(self):
        return f'{self.name} ({self.country_code})'


THEMES = (
    ('green', 'Green'),
    ('yellow', 'Yellow'),
    ('blue', 'Blue'),
    ('red', 'Red'),
    ('brown', 'Brown')
)


class Governorate(models.Model):
    title = models.CharField(default='', max_length=30)
    emblem = models.ImageField(upload_to='emblems/%y/%m/%d')
    shape = models.TextField()
    area = models.FloatField(help_text="Squared Area in Km")
    theme = models.CharField(max_length=10, choices=THEMES)
    population = models.IntegerField(default=0)
    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.title


class GovernorateLanguageBased(models.Model):
    gov = models.ForeignKey(
        Governorate, related_name="governorates", on_delete=models.CASCADE, verbose_name="governorate")
    lang = models.ForeignKey(
        Language, on_delete=models.CASCADE, verbose_name="language")
    name = models.CharField(max_length=30)
    governor = models.CharField(max_length=70)
    description = models.TextField()

    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    class Meta:
        ordering = ['id']
        unique_together = (("gov", "lang"),)

    def __str__(self):
        return f'{self.name} => {self.lang.name}'


TICKETS_CATEGORIES = (
    ('foreginer', 'Foreginer'),
    ('foreginerStudent', 'Foreginer Student'),
    ('egyptian', 'Egyptian'),
    ('arab', 'Arab'),
    ('student', 'Student'),
    ('أجنبى', 'أجنبى'),
    ('طالب_أجنبى', 'طالب أجنبى'),
    ('مصرى', 'مصرى'),
    ('عربى', 'عربى'),
    ('طالب', 'طالب')
)


class Landmark(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(
        upload_to='landmark_images/%y/%m/%d')

    area = models.FloatField(help_text="Squared Area in metre")
    location = models.CharField(max_length=200, help_text="google maps link ")
    governorate = models.ForeignKey(Governorate, on_delete=models.CASCADE)
    height = models.FloatField(default=1, help_text="height in metre")
    foundationDate = models.DateField(
        default=timezone.now, verbose_name="Foundation Date")
    foundationDateEra = models.CharField(
        choices=ERAS, max_length=3, default='AD', verbose_name="Foundation Date Era")
    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.title


# class LandmarkImage(models.Model):
#     landmark = models.ForeignKey(Landmark, on_delete=models.CASCADE)
#     image = models.ImageField(
#         upload_to=landmark.id)

#     def __str__(self):
#         return f'{self.landmark.title} image'


class LandmarkLanguageBased(models.Model):
    place = models.ForeignKey(
        Landmark, related_name="landmarks", on_delete=models.CASCADE, verbose_name="landmark")
    lang = models.ForeignKey(
        Language, on_delete=models.CASCADE, verbose_name="language")
    name = models.CharField(max_length=30)
    founder = models.CharField(max_length=70)
    description = models.TextField()
    address = models.TextField(max_length=300)
    # foreignersPrice = models.FloatField(help_text="price in Egyptian Pound")
    # localPrice = models.FloatField(help_text="price in Egyptian Pound")

    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    class Meta:
        ordering = ['id']
        unique_together = (("place", "lang"),)

    def __str__(self):
        return f'{self.name} => {self.lang.name}'

# class LandmarkEvent(models.Model):
#     title = models.CharField(max_length=50)
#     place = models.ForeignKey(
#         Landmark, on_delete=models.CASCADE, verbose_name="landmark")
#     created = models.DateTimeField(
#         default=timezone.now, verbose_name="Creation Date")
#     active = models.BooleanField(default=True, blank=False)


class Ticket(models.Model):

    price = models.FloatField(help_text="Price in Egyptian Pounds")
    place = models.ForeignKey(
        Landmark, on_delete=models.CASCADE, verbose_name="landmark")
    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return f'{self.place.title} => {self.price} LE'


class TicketLanguageBased(models.Model):
    ticketObject = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, verbose_name="Ticket")
    lang = models.ForeignKey(
        Language, on_delete=models.CASCADE, verbose_name="language")
    title = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=TICKETS_CATEGORIES)
    created = models.DateTimeField(
        default=timezone.now, verbose_name="Creation Date")
    active = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return f'{self.lang.code} => {self.category} ({self.ticketObject.price} LE)'
