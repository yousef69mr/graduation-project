# Generated by Django 4.1.5 on 2023-01-18 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='governorate',
            name='emblem',
            field=models.ImageField(upload_to='emblems/%y/%m/%d'),
        ),
    ]
