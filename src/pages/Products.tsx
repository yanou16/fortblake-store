import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductsContainer = styled.div`
  padding: 140px 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 120px 1rem 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 800;
  letter-spacing: 2px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  position: relative;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: black;
  color: white;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const QuickView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const QuickViewContent = styled.div`
  background: white;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const SelectionContainer = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const QuickViewButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.8rem;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const Products = () => {
  const { category, collection } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const filteredProducts = products.filter(product => {
    // Pour la page Nouveautés
    if (location.pathname === '/nouveautes') {
      return product.isNewArrival === true;
    }
    
    // Pour la page Best-Sellers
    if (location.pathname === '/best-sellers') {
      return product.isBestSeller === true;
    }
    
    // Pour les collections
    if (collection) {
      return product.collection === collection;
    }
    
    // Pour les catégories
    if (category) {
      return product.category === category;
    }
    
    return true;
  });

  const getTitle = () => {
    if (location.pathname === '/nouveautes') {
      return 'Nouveautés';
    }
    if (location.pathname === '/best-sellers') {
      return 'Best-Sellers';
    }
    if (collection) {
      const collectionNames = {
        street: 'FORTBLAKE STREET',
        essential: 'FORTBLAKE ESSENTIAL',
        winter: 'WINTER 2024',
        sport: 'SPORT COLLECTION'
      };
      return collectionNames[collection] || 'Collection';
    }
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return 'Tous les produits';
  };

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setSelectedColor('');
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize && selectedColor) {
      addToCart({
        ...selectedProduct,
        quantity: 1,
        selectedSize,
        selectedColor,
      });
      setSelectedProduct(null);
      setSelectedSize('');
      setSelectedColor('');
    }
  };

  return (
    <ProductsContainer>
      <Title>{getTitle()}</Title>
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}€</ProductPrice>
              <AddToCartButton onClick={() => addToCart({ ...product, quantity: 1, selectedSize: 'M', selectedColor: 'Rouge' })}>
                Ajouter au panier
              </AddToCartButton>
            </ProductInfo>
            <QuickViewButton onClick={() => handleQuickView(product)}>
              Aperçu rapide
            </QuickViewButton>
          </ProductCard>
        ))}
      </ProductGrid>

      {selectedProduct && (
        <QuickView>
          <QuickViewContent>
            <CloseButton onClick={() => setSelectedProduct(null)}>×</CloseButton>
            <ProductImage src={selectedProduct.image} alt={selectedProduct.name} />
            <ProductInfo>
              <ProductName>{selectedProduct.name}</ProductName>
              <ProductPrice>{selectedProduct.price}€</ProductPrice>
            </ProductInfo>
            <SelectionContainer>
              <Label>Taille</Label>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Sélectionnez une taille</option>
                {selectedProduct.sizes.map((size: string) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>

              <Label>Couleur</Label>
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Sélectionnez une couleur</option>
                {selectedProduct.colors.map((color: string) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
            </SelectionContainer>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              Ajouter au panier
            </AddToCartButton>
          </QuickViewContent>
        </QuickView>
      )}
    </ProductsContainer>
  );
};

export default Products;
