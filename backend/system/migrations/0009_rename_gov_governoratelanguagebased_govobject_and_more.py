# Generated by Django 4.1.5 on 2023-04-04 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0008_alter_landmark_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='governoratelanguagebased',
            old_name='gov',
            new_name='govObject',
        ),
        migrations.AlterUniqueTogether(
            name='governoratelanguagebased',
            unique_together={('govObject', 'lang')},
        ),
    ]