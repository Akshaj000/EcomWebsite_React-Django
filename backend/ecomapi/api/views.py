from itertools import count
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ecomapi.models import*
from ecomapi.serializers import*

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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
    serialiser = ProductSerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
    return Response(serialiser.data)
        
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateProduct(request,productid):    
    product = Product.objects.get(id=productid)
    serialiser = ProductSerializer(instance=product,data=request.data)
    if serialiser.is_valid():
        serialiser.save()
    return Response(serialiser.data)
        
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request,productid):
    product = ProductSerializer.objects.get(id=productid)
    product.delete()
    return Response("Product successfully deleted!")
        
    

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
def removeCart(request,productid):
    try:
        product = Product.objects.get(id=productid)
        cart = Cart.objects.get(product=product,user = request.user)  
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
    order = Order.objects.get(id=orderid)
    serialiser = OrderSerializer(order, many=False)
    return Response(serialiser.data)
        
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request): 
    serialiser = OrderSerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save(user=request.user)
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

