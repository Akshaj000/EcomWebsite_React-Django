from dataclasses import field
from rest_framework.serializers import ModelSerializer
from ecomapi.models import Category, Customer, Product, Cart, Order


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer 
        fields = '__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category 
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","name","image","description","category","price"]

        def save(self, *args, **kwargs):
            if self.instance.image:
                self.instance.image.delete()
            return super().save(*args, **kwargs)

class ProductNoImageSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","name","description","category","price"]

class ProductImageSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ["image"]

        def save(self, *args, **kwargs):
            if self.instance.image:
                self.instance.image.delete()
            return super().save(*args, **kwargs)


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart 
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order 
        fields = '__all__'