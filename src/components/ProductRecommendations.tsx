import React from 'react';
import styled from 'styled-components';
import { Product } from '../data/products';
import { Link } from 'react-router-dom';

interface ProductRecommendationsProps {
  currentProduct: Product;
  allProducts: Product[];
}

const RecommendationsContainer = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: inherit;
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
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.span`
  font-weight: 600;
`;

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  allProducts,
}) => {
  // Logique pour trouver des produits similaires
  const getRecommendations = () => {
    return allProducts
      .filter(product => 
        // Exclure le produit actuel
        product.id !== currentProduct.id &&
        // Inclure les produits de la même collection ou catégorie
        (product.collection === currentProduct.collection ||
         product.category === currentProduct.category)
      )
      .slice(0, 4); // Limiter à 4 recommandations
  };

  const recommendations = getRecommendations();

  return (
    <RecommendationsContainer>
      <Title>Vous aimerez aussi</Title>
      <ProductGrid>
        {recommendations.map(product => (
          <ProductCard key={product.id} to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}€</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </RecommendationsContainer>
  );
};

export default ProductRecommendations;
