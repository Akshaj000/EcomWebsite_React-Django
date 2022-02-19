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
import { SearchProvider } from "./context/SearchContext";
import Searchpage from "./pages/SearchPage";
import { OrderProvider } from "./context/OrderContext";
import Invoice from "./pages/Invoice";
import { InvoiceProvider } from "./context/InvoiceContext";




class Site extends React.Component{

  render(){

    return (
      <BrowserRouter>
        <AuthProvider>
        <SearchProvider>
          <Routes>
              <Route exact path='/' element={
                <ProductProvider>
                    <Header/>
                      <Homepage/>
                    <Footer/>
                </ProductProvider>
              }/>
              <Route exact path='/search' element={
                <>
                    <Header/>
                      <Searchpage/>
                    <Footer/>
                </>
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
                <PrivateRoute>
                <ProductProvider>
                <CategoryProvider>
                  <Header/>
                    <AddProductPage/>
                  <Footer/>
                </CategoryProvider>
                </ProductProvider>
                </PrivateRoute>
              }/>
              <Route exact path='/cart' element={
                <PrivateRoute>
                <OrderProvider>
                <CartProvider>
                  <ProductProvider>
                      <Header/>
                        <CartPage/>
                      <Footer/>
                  </ProductProvider>
                </CartProvider>
                </OrderProvider>
                </PrivateRoute>
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
                <ProductProvider>
                <OrderProvider>
                  <Header/>
                    <Order/>
                  <Footer/>
                  </OrderProvider>
                  </ProductProvider>
                </PrivateRoute>
              }/>
              <Route exact path='/invoice/:id' element={
                <InvoiceProvider>
                  <Header/>
                    <Invoice/>
                  <Footer/>
                </InvoiceProvider>
              }/>
              <Route exact path='/categories' element={
                <PrivateRoute>
                <CategoryProvider>
                    <Header/>
                    <main class="main">
                    <div style={{marginTop:"2%",marginRight:"8%",marginLeft:"8%"}}>
                      <CategoryPage/>
                    </div>
                    </main>
                    <Footer/>
                </CategoryProvider>
                </PrivateRoute>
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
            </SearchProvider>
          </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default Site;


