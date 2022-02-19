from itertools import count, product
from unicodedata import category
from xmlrpc.client import boolean
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ecomapi.models import*
from rest_framework import status
from rest_framework import generics
from ecomapi.serializers import*
from django.contrib import auth
from .serializer import RegisterSerializer, ChangePasswordSerializer
from rest_framework import generics
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser
from django.db.models import*

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['superuser'] = user.is_superuser
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterApi(CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny 
    ]
    serializer_class = RegisterSerializer


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                

@api_view(['GET'])
def apiOverview(request):
    
        api_urls = {
            'Customer Detail' : '/customer-detail/',
            'Customer Add'  :  '/customer-add/',
            'Customer Update': '/customer-update/',
            'Customer Delete' : '/customer-delete/',  

            'Product List' : '/product-list/',
            'Product Detail' :  '/product-detail/<str:productid>/',
            'Create Product' : '/product-create/',
            'Update Product' : '/product-update/<str:productid>/',
            'Delete Product' : '/product-delete/<str:productid>/',

            'Category List':'/category-list/',
            'Add Category':'/category-add/',
            'Remove Category':'/category-remove/<str:categoryid>/',

            'Cart List' : '/cart-list/<str:customerid>/',
            'Cart Detail' : '/cart-detail/<str:cartid>/',
            'Add to cart'  : '/cart-add/<str:productid>/',
            'Remove from cart' : '/cart-remove/<str:productid>/',
            'Update cart' : '/cart-update/<str:customerid>/<str:productid>/',

            'Order List':'/order-list/<str:customerid>/',
            'Order Detail':'/order-detail/<str:orderid>/',
            'Place Order' : '/order-add/',
            'Delete Order' : '/order-remove/<str:orderid>/',
            'Update Order' : '/order-update/<str:orderid>/',
            'Authenticate Token' : '/token/',
            'refresh Token' : '/token/refresh/',
            
        } 
        return Response(api_urls)
    

#Customer--------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customerDetail(request):
    user = request.user
    customer = Customer.objects.get(user=user)
    serialiser = CustomerSerializer(customer, many=False)
    return Response(serialiser.data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCustomer(request):
    serialiser = CustomerSerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save(user=request.user)
    return Response(serialiser.data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateCustomer(request):    
    customer = Customer.objects.get(user=request.user)
    serialiser = CustomerSerializer(instance=customer,data=request.data)
    if serialiser.is_valid():
        serialiser.save()
    return Response(serialiser.data)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCustomer(request):
    customer = Customer.objects.get(user=request.user)
    customer.delete();
    return Response("Customer successfully removed!")
        
#Product--------------------------------------------------------------------

@api_view(['GET'])
def productList(request):
    products = Product.objects.all()
    serialiser = ProductSerializer(products, many=True)
    return Response(serialiser.data)
    
@api_view(['GET'])
def productDetail(request,productid):
    product = Product.objects.get(id=productid)
    serialiser = ProductSerializer(product, many=False)
    return Response(serialiser.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
    serialiser = ProductNoImageSerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
    return Response(serialiser.data)
        
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser])
@parser_classes([MultiPartParser])
def updateProduct(request,productid,*args, **kwargs):    
    product = Product.objects.get(id=productid)
    serialiser = ProductNoImageSerializer(instance=product,data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response("Serialized")
    return Response(serialiser.data)
        
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request,productid):
    product = Product.objects.get(id=productid)
    product.delete()
    return Response("Product successfully deleted!")
        

class ProductEditImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request,productid,format=None):
        product = Product.objects.get(id=productid)
        serializer = ProductImageSerializer(instance=product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Search---------

@api_view(['GET'])
def search(request):
    q = request.GET['q']
    productdist = []
    products = Product.objects.filter(Q(name__contains=q)|Q(category__categoryname__contains=q))
    for i in products:
        if i not in productdist:
            productdist.append(i)
    serialiser = ProductSerializer(productdist,many=True)
    return Response(serialiser.data)


#Category--------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categoryList(request):
    category = Category.objects.all()
    serialiser = CategorySerializer(category, many=True)
    return Response(serialiser.data)
        
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCategory(request):    
    serialiser = CategorySerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
    return Response(serialiser.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateCategory(request,categoryid):    
    category = Category.objects.get(id=categoryid)
    serialiser = CategorySerializer(instance=category,data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response("Serialized")
    return Response(serialiser.data)
        
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeCategory(request,categoryid):    
    category = Category.objects.get(id=categoryid)
    category.delete()
    return Response("Category successfully deleted!")
        
    

#Cart--------------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cartList(request):
    user = request.user
    cart = user.cart_set.all()
    serializer = CartSerializer(cart, many=True)
    return Response(serializer.data)

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cartDetail(request,cartid):
    cart = Cart.objects.get(id=cartid)
    serialiser = ProductSerializer(cart, many=False)
    return Response(serialiser.data)
        
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def addCart(request,productid):
    user = request.user
    try:
        product = Product.objects.get(id=productid)
        cart = Cart.objects.get(user=user,product=product)
        cart.count+=1
        cart.save()
        return Response("count incremented!")
    except:
        product = Product.objects.get(id=productid)
        Cart.objects.create(product=product, user=user,count=1)
        
    
@api_view(['DELETE','GET'])
@permission_classes([IsAuthenticated])
def removeCart(request,productid,instantremove):
    product = Product.objects.get(id=productid)
    cart = Cart.objects.get(product=product,user = request.user)  
    if instantremove == "true":
        cart.delete()
        return Response("Removed")
    else:
        try:
            cart.count-=1
            if (cart.count==0):
                cart.delete()
            else:
                cart.save()
            return Response("count decremented!")
        except:
            return Response("Cart doesnt exist")
        
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateCart(request,productid):
    try:
        product = Product.objects.get(id=productid)
        cart = Cart.objects.get(product=product,user=request.user)
        serialiser = CartSerializer(instance=cart,data=request.data)
        if serialiser.is_valid():
            serialiser.save(user=request.user)
        return Response(serialiser.data)
    except:
        return Response("Cart doesnt exist")
        
    
#Orders------------------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orderList(request):
    order = Order.objects.filter(user=request.user)
    serialiser = OrderSerializer(order, many=True)
    return Response(serialiser.data)
   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orderDetail(request,orderid):
    order = Order.objects.get(id=orderid, user=request.user)
    serialiser = OrderSerializer(order, many=False)
    return Response(serialiser.data)
        
    
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def addOrder(request): 
    serialiser = OrderSerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save(user=request.user)
        return Response("serialised")
    return Response(serialiser.data)
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeOrder(request,orderid):
    order = Product.objects.get(id=orderid)
    order.delete()
    return Response("Order successfully deleted!")   

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateOrder(request,orderid):
    order = Order.objects.get(id=orderid)
    serialiser = OrderSerializer(instance=order,data=request.data)
    if serialiser.is_valid():
        serialiser.save()
    return Response(serialiser.data)




