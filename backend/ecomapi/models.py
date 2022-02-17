
from math import prod
from readline import insert_text
from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from decimal import Decimal


# Create your models here.

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    photo = models.ImageField(upload_to=settings.MEDIA_ROOT,blank=True)
    name = models.CharField(blank=True,max_length=200, null=True)
    country = models.CharField(blank=True,max_length=200, null=True)
    state = models.CharField(blank=True,max_length=200, null=True)
    district = models.CharField(blank=True,max_length=200, null=True)
    address = models.CharField(blank=True,max_length=350, null=True)
    postalcode = models.CharField(blank=True,max_length=100,null=True)
    phone = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(blank=True,null=True)
    date_created = models.DateTimeField(blank=True,auto_now_add=True, null=True) 
    
    def __str__(self):
        return self.user.username

class Category(models.Model):
    categoryname  = models.CharField(max_length=200,null=True,unique=True)
    def __str__(self):
        return self.categoryname


class Product(models.Model):
    name  = models.CharField(max_length=200,null=True,unique=True)
    image = models.ImageField(upload_to=settings.MEDIA_ROOT)
    description = models.TextField(null=True)
    price = models.FloatField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    category = models.ManyToManyField(Category)
    
    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    product = models.ForeignKey(Product, null=True , on_delete= models.SET_NULL)
    date_added = models.DateTimeField(auto_now_add=True, null=True)
    count  = models.IntegerField()
    
    def totalprice(self):
        return self.product.price*self.count

    def __str__(self):
        try:
            return str(self.product.name)
        except:
            return "Unknown"
    


class Order(models.Model):
    STATUS =(
        ('Pending','Pending'),
        ('Out for delivery','Out for delivery'),
        ('Delivered','Delivered')
        )
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    product = models.ForeignKey(Product, null=True , on_delete= models.SET_NULL)
    totalprice = models.FloatField(null=True)
    count  = models.IntegerField(null=True)
    payment_status = models.BooleanField(null=True)
    date_ordered = models.DateTimeField(auto_now_add=True, null=True)
    status = models.CharField(max_length=200,null=True,choices=STATUS)

    def __str__(self):
        try:
            return str(self.product)
        except:
            return "Unknown"
