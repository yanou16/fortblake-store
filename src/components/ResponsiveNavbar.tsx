import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const NavContainer = styled.nav<{ hideNav?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  transform: translateY(${props => props.hideNav ? '-100%' : '0'});
  transition: transform 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const TopBar = styled.div`
  background: black;
  color: white;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
`;

const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  color: black;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 0 1 400px;
  margin: 0 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
    flex-direction: column;
    padding: 5rem 2rem;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease;
    width: 280px;
    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: black;
    transform: scaleX(0);
    transition: transform 0.2s;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: black;
  text-decoration: none;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: black;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const MenuIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background: ${props => props.isOpen ? 'transparent' : 'black'};
  position: relative;
  transition: all 0.3s ease;

  &:before, &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: black;
    transition: all 0.3s ease;
  }

  &:before {
    top: ${props => props.isOpen ? '0' : '-8px'};
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'none'};
  }

  &:after {
    bottom: ${props => props.isOpen ? '0' : '-8px'};
    transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'none'};
  }
`;

const MobileSearchButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileSearch = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1001;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { state: { items } } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <>
      <NavContainer hideNav={hideNav}>
        <TopBar>
          LIVRAISON GRATUITE EN FRANCE À PARTIR DE 100€ D'ACHAT
        </TopBar>
        
        <MainNav>
          <Logo to="/">FORTBLAKE</Logo>

          <SearchBar>
            <SearchInput placeholder="Rechercher un produit..." />
          </SearchBar>

          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon isOpen={isMenuOpen} />
          </MenuButton>

          <NavLinks isOpen={isMenuOpen}>
            <NavLink to="/nouveautes">Nouveautés</NavLink>
            <NavLink to="/collections">Collections</NavLink>
            <NavLink to="/best-sellers">Best-Sellers</NavLink>
            {currentUser ? (
              <>
                <NavLink to="/orders">Mes Commandes</NavLink>
                <NavLink to="/wishlist">Favoris</NavLink>
              </>
            ) : (
              <NavLink to="/signin">Connexion</NavLink>
            )}
            <CartIcon to="/cart">
              Panier
              {items.length > 0 && <CartCount>{items.length}</CartCount>}
            </CartIcon>
          </NavLinks>

          <MobileSearchButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
            🔍
          </MobileSearchButton>
        </MainNav>
      </NavContainer>

      <MobileSearch isOpen={isSearchOpen}>
        <SearchInput placeholder="Rechercher un produit..." />
      </MobileSearch>
    </>
  );
};

export default ResponsiveNavbar;
