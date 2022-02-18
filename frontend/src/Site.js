import React from "react";
import Header from "./components/header"
import Footer from "./components/footer"
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage"
import {
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute"
import Product from "./pages/Productdetail";
import { ProductProvider } from "./context/ProductContext";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import ChangePasscodeForm from "./pages/ChangePasswordPage";
import { CategoryProvider } from "./context/CategoryContext";
import CategoryPage from "./pages/CategoryPage";
import AddProductPage from "./pages/AddProductPage";
import Order from "./pages/OrderPage";




class Site extends React.Component{

  render(){

    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route exact path='/' element={
                <ProductProvider>
                    <Header/>
                      <Homepage/>
                    <Footer/>
                </ProductProvider>
              }/>
              <Route exact path='/product/:id' element={
                <ProductProvider>
                <CategoryProvider>
                  <Header/>
                    <Product/>
                  <Footer/>
                </CategoryProvider>
                </ProductProvider>
              }/>
              <Route exact path='/newproduct' element={
                <ProductProvider>
                <CategoryProvider>
                  <Header/>
                    <AddProductPage/>
                  <Footer/>
                </CategoryProvider>
                </ProductProvider>
              }/>
              <Route exact path='/cart' element={
                <CartProvider>
                  <ProductProvider>
                    <PrivateRoute>
                      <Header/>
                        <CartPage/>
                      <Footer/>
                    </PrivateRoute>
                  </ProductProvider>
                </CartProvider>
              }/>
              <Route exact path='/profile' element={
                <PrivateRoute>
                  <Header/>
                    <ProfilePage/>
                  <Footer/>
                </PrivateRoute>
              }/>
              <Route exact path='/orders' element={
                <PrivateRoute>
                  <Header/>
                    <Order/>
                  <Footer/>
                </PrivateRoute>
              }/>
              <Route exact path='/categories' element={
                <CategoryProvider>
                 <PrivateRoute>
                    <Header/>
                      <CategoryPage/>
                    <Footer/>
                  </PrivateRoute>
                </CategoryProvider>
              }/>
              <Route exact path='/login' element={
                <LoginPage/>
              }/>
              <Route exact path='/signup' element={
                <SignupPage/>
              }/>
              <Route exact path='/changepassword' element={
                <ChangePasscodeForm/>
              }/>

            </Routes>
          </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default Site;


