import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 140px 2rem 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  background: #000;
  color: white;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled(Link)`
  font-size: 1.1rem;
  color: #000;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductPrice = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
`;

const AddToCartButton = styled(Button)`
  background: #000;
  color: white;

  &:hover {
    background: #333;
  }
`;

const RemoveButton = styled(Button)`
  background: white;
  color: #ff4d4d;
  border: 2px solid #ff4d4d;

  &:hover {
    background: #fff0f0;
  }
`;

const Wishlist = () => {
  const { state: { items }, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <WishlistContainer>
        <Title>Ma Liste de Favoris</Title>
        <EmptyWishlist>
          <EmptyMessage>Votre liste de favoris est vide</EmptyMessage>
          <ContinueShoppingButton to="/nouveautes">
            Découvrir nos produits
          </ContinueShoppingButton>
        </EmptyWishlist>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <Title>Ma Liste de Favoris</Title>
      <ProductGrid>
        {items.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName to={`/product/${product.id}`}>
                {product.name}
              </ProductName>
              <ProductPrice>{product.price}€</ProductPrice>
              <ButtonGroup>
                <AddToCartButton
                  onClick={() => addToCart({ ...product, quantity: 1, selectedSize: 'M', selectedColor: product.colors[0] })}
                >
                  Ajouter au panier
                </AddToCartButton>
                <RemoveButton onClick={() => removeFromWishlist(product.id)}>
                  Retirer
                </RemoveButton>
              </ButtonGroup>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </WishlistContainer>
  );
};

export default Wishlist;
