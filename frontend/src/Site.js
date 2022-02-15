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
                <> 
                <Header/>
                    <Product/>
                  <Footer/>
                </> 
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
              <Route exact path='/login' element={
                  <LoginPage/>
              }/>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default Site;


