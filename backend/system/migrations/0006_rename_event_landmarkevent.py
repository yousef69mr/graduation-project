# Generated by Django 4.1.5 on 2023-04-04 07:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0005_rename_title_governorate_name_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Event',
            new_name='LandmarkEvent',
        ),
    ]