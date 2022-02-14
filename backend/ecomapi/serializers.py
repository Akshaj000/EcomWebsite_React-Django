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
        fields = '__all__'

class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart 
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order 
        fields = '__all__'