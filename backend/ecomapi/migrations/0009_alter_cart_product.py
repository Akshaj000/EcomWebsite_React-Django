# Generated by Django 4.0.2 on 2022-02-19 07:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecomapi', '0008_alter_customer_address_alter_customer_country_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ecomapi.product'),
        ),
    ]