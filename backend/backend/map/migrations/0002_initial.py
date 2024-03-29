# Generated by Django 5.0.2 on 2024-02-12 17:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('map', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reservation', to=settings.AUTH_USER_MODEL, verbose_name='Сотрудник'),
        ),
        migrations.AddField(
            model_name='reservationhistory',
            name='place',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='map.place', verbose_name='Место'),
        ),
        migrations.AddField(
            model_name='reservationhistory',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reservation_history', to=settings.AUTH_USER_MODEL, verbose_name='Сотрудник'),
        ),
        migrations.AddField(
            model_name='room',
            name='places',
            field=models.ManyToManyField(to='map.place', verbose_name='Места'),
        ),
        migrations.AddField(
            model_name='map',
            name='room',
            field=models.ManyToManyField(to='map.room', verbose_name='Комнаты'),
        ),
    ]
