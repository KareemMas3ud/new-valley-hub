# Hand-written migration — only creates the two new tables.
# The old SavedTrip / SavedSouvenir tables never existed cleanly in this DB,
# so we skip all RemoveField / DeleteModel operations.

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourism', '0016_savedsouvenir_savedtrip'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSavedTrip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transport_mode', models.CharField(default='unknown', max_length=20)),
                ('total_co2', models.DecimalField(decimal_places=2, default=0, max_digits=8)),
                ('route_data', models.JSONField(blank=True, default=list)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='user_saved_trips',
                                           to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'User Saved Trip',
                'verbose_name_plural': 'User Saved Trips',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='UserSavedSouvenir',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_data', models.TextField(help_text='Base-64 PNG data-URL of the souvenir canvas')),
                ('caption', models.CharField(blank=True, default='', max_length=120)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='user_saved_souvenirs',
                                           to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'User Saved Souvenir',
                'verbose_name_plural': 'User Saved Souvenirs',
                'ordering': ['-created_at'],
            },
        ),
    ]
