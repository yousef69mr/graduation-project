# Generated by Django 4.1.5 on 2023-04-04 07:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0006_rename_event_landmarkevent'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='EventLanguageBased',
            new_name='LandmarkEventLanguageBased',
        ),
        migrations.RenameField(
            model_name='landmarkevent',
            old_name='place',
            new_name='landmarkObject',
        ),
        migrations.RenameField(
            model_name='landmarklanguagebased',
            old_name='place',
            new_name='landmarkObject',
        ),
        migrations.AlterUniqueTogether(
            name='landmarklanguagebased',
            unique_together={('landmarkObject', 'lang')},
        ),
    ]