from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import RegisterApi, ChangePasswordView

urlpatterns  = [
    path('', views.apiOverview,name="api-overview"),
    path('customer-detail/',views.customerDetail,name="customer-detail"),
    path('customer-add/', views.addCustomer,name="customer-add"),
    path('customer-update/',views.updateCustomer,name="customer-update"),
    path('customer-delete/', views.deleteCustomer,name="customer-delete"),  

    path('product-list/',views.productList,name="product-list"),
    path('product-detail/<str:productid>/',views.productDetail,name="product-detail"),
    path('product-add/',views.createProduct,name="product-create"),
    path('product-search/',views.search),
    path('product-update/<str:productid>/',views.updateProduct,name="product-update"),
    path('product-image-update/<str:productid>/',views.ProductEditImageView.as_view(),name="product-image-update"),
    path('product-delete/<str:productid>/',views.deleteProduct,name="product-delete"),

    path('category-list/',views.categoryList,name="category-list"),
    path('category-add/',views.addCategory,name="category-add"),
    path('category-update/<str:categoryid>',views.updateCategory,name="category-update"),
    path('category-remove/<str:categoryid>/',views.removeCategory,name="category-remove"),

    path('cart-list/',views.cartList,name="cart-list"),
    path('cart-add/<str:productid>/',views.addCart,name="cart-add"),
    path('cart-remove/<str:productid>/',views.removeCart,name="cart-remove"),
    path('cart-update/<str:productid>/',views.updateCart,name="cart-update"),

    path('order-list/',views.orderList,name="order-list"),
    path('order-detail/',views.orderDetail,name="order-detail"),
    path('order-add/',views.addOrder,name="order-add"),

    
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterApi.as_view(),name="register"),
    path('change-password/',ChangePasswordView.as_view(),name="changepassword")
]