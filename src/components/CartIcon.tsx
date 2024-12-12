import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartContainer = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: black;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CartIcon = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContainer to="/cart">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
    </CartContainer>
  );
};

export default CartIcon;
