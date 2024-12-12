import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeliveryForm, { DeliveryInfo } from '../components/DeliveryForm';
import ProgressBar from '../components/ProgressBar';

const CartContainer = styled.div`
  padding: 140px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 120px 1rem 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: black;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eee;

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0;
`;

const ItemDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background: #f5f5f5;
  }
`;

const Quantity = styled.span`
  min-width: 40px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 0.5rem;

  &:hover {
    color: #666;
  }
`;

const ItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
`;

const CartSummary = styled.div`
  background: white;
  padding: 2rem;
  border: 1px solid #eee;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const Total = styled(SummaryRow)`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: black;
  color: white;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 2px;
  margin-top: 1rem;

  &:hover {
    background: #333;
  }
`;

const Cart = () => {
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { currentUser } = useAuth();
  const { state, removeFromCart, updateQuantity, addOrder } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    setCurrentStep(2);
    setShowDeliveryForm(true);
  };

  const handleDeliverySubmit = async (deliveryInfo: DeliveryInfo) => {
    const orderData = {
      userId: currentUser ? currentUser.uid : 'guest',
      items: state.items,
      total: state.total,
      deliveryInfo,
      date: new Date(),
      status: 'pending'
    };

    try {
      await addOrder(orderData);
      console.log('Commande passée avec succès !');
      setCurrentStep(3);
      navigate('/confirmation');
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
    }
  };

  if (showDeliveryForm) {
    return <DeliveryForm onSubmit={handleDeliverySubmit} />;
  }

  if (state.items.length === 0) {
    return (
      <CartContainer>
        <Title>Panier</Title>
        <EmptyCart>
          <EmptyMessage>Votre panier est vide</EmptyMessage>
          <ContinueShoppingButton to="/nouveautes">
            Continuer mes achats
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <ProgressBar currentStep={currentStep} />
      <Title>Panier</Title>
      <CartGrid>
        <CartItems>
          {state.items.map((item) => (
            <CartItem key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemDetails>
                  Taille: {item.selectedSize} | Couleur: {item.selectedColor}
                </ItemDetails>
                <ItemPrice>{item.price.toFixed(2)} €</ItemPrice>
              </ItemInfo>
              <ItemActions>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </RemoveButton>
              </ItemActions>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Récapitulatif</SummaryTitle>
          <SummaryRow>
            <span>Sous-total</span>
            <span>{state.total.toFixed(2)} €</span>
          </SummaryRow>
          <SummaryRow>
            <span>Livraison</span>
            <span>Gratuite</span>
          </SummaryRow>
          <Total>
            <span>Total</span>
            <span>{state.total.toFixed(2)} €</span>
          </Total>
          {state.items.length > 0 && (
            <CheckoutButton onClick={handleProceedToCheckout}>
              Passer la commande
            </CheckoutButton>
          )}
        </CartSummary>
      </CartGrid>
    </CartContainer>
  );
};

export default Cart;