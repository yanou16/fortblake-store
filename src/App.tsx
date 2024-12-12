import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import { WishlistProvider } from './context/WishlistContext'; 
import ResponsiveNavbar from './components/ResponsiveNavbar';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Collections from './pages/Collections';
import About from './pages/About';
import Stores from './pages/Stores';
import Careers from './pages/Careers';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Confirmation from './pages/Confirmation'; 
import Jackets from './pages/Jackets';
import Polos from './pages/Polos';
import TShirts from './pages/TShirts';
import Sweats from './pages/Sweats';
import Pants from './pages/Pants';
import Accessories from './pages/Accessories';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist'; 
import NewsletterModal from './components/NewsletterModal';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  margin-top: 120px; 
  padding: 0;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContainer>
              <ResponsiveNavbar />
              <NewsletterModal />
              <MainContent>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/nouveautes" element={<Products />} />
                    <Route path="/best-sellers" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/collections/:collectionId" element={<Collections />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/categories/vestes" element={<Jackets />} />
                    <Route path="/categories/polos" element={<Polos />} />
                    <Route path="/categories/t-shirts" element={<TShirts />} />
                    <Route path="/categories/sweats" element={<Sweats />} />
                    <Route path="/categories/pantalons" element={<Pants />} />
                    <Route path="/categories/accessoires" element={<Accessories />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                  </Routes>
                </PageTransition>
              </MainContent>
              <Footer />
            </AppContainer>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
