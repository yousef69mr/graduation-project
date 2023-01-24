from django.utils import timezone
from django.db import models

# Create your models here.

DIRECTIONS = (
    ("rtl", "Right to Left"),
    ("ltr", "Left to Right")
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


class Governorate(models.Model):
    title = models.CharField(default='', max_length=30)
    emblem = models.ImageField(upload_to='emblems/%y/%m/%d')
    shape = models.TextField()
    area = models.FloatField(help_text="Squared Area in Km")
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
