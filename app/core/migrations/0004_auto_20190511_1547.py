# Generated by Django 2.1.3 on 2019-05-11 14:47

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20190511_1529'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, default='default.png', null=True, upload_to=core.models.recipe_image_file_path),
        ),
    ]