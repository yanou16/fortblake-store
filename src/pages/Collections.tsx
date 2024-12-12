import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

// Log initial pour vérifier que le fichier est chargé
console.log('Collections component loaded');
console.log('Initial products:', products);

const CollectionsContainer = styled.div`
  padding: 140px 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 800;
  letter-spacing: 2px;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CollectionCard = styled(Link)`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  &:hover img {
    transform: scale(1.05);
  }
`;

const CollectionImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const CollectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const CollectionTitle = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const CollectionDescription = styled.p`
  font-size: 1.1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;

const collections = [
  {
    id: 'street',
    title: 'FORTBLAKE STREET',
    description: 'Notre collection streetwear signature avec des pièces urbaines et modernes',
    image: '/images/fortblake/street-collection.png',
    link: '/collections/street'
  },
  {
    id: 'essential',
    title: 'FORTBLAKE ESSENTIAL',
    description: 'Les essentiels du quotidien revisités avec notre touche unique',
    image: '/images/fortblake/essential-collection.png',
    link: '/collections/essential'
  },
  {
    id: 'winter',
    title: 'WINTER 2024',
    description: 'Notre collection hivernale avec des pièces chaudes et stylées',
    image: '/images/fortblake/winter-collection.png',
    link: '/collections/winter'
  },
  {
    id: 'sport',
    title: 'SPORT COLLECTION',
    description: 'Des vêtements techniques pour un style urbain et sportif',
    image: '/images/fortblake/sport-collection.png',
    link: '/collections/sport'
  }
];

const Collections = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    const cartItem = {
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    };
    addToCart(cartItem);
  };

  // Si on est sur une page de collection spécifique
  if (collectionId) {
    console.log('---DEBUG INFO---');
    console.log('Collection ID:', collectionId);
    console.log('Products array length:', products.length);
    console.log('Products array content:', JSON.stringify(products, null, 2));
    
    const filteredProducts = products.filter(product => {
      const matches = product.collection === collectionId;
      console.log(`Product ${product.name} - Collection: ${product.collection} - Matches ${collectionId}?: ${matches}`);
      return matches;
    });

    console.log('Filtered products length:', filteredProducts.length);
    console.log('Filtered products:', filteredProducts);

    return (
      <CollectionsContainer>
        <Title>{collections.find(c => c.id === collectionId)?.title || 'Collection'}</Title>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            Aucun produit trouvé dans cette collection.
          </div>
        ) : (
          <ProductGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price} €</ProductPrice>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    Ajouter au panier
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
      </CollectionsContainer>
    );
  }

  // Sinon, on affiche la liste des collections
  return (
    <CollectionsContainer>
      <Title>Nos Collections</Title>
      <CollectionGrid>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} to={collection.link}>
            <CollectionImage src={collection.image} alt={collection.title} />
            <CollectionOverlay>
              <CollectionTitle>{collection.title}</CollectionTitle>
              <CollectionDescription>{collection.description}</CollectionDescription>
            </CollectionOverlay>
          </CollectionCard>
        ))}
      </CollectionGrid>
    </CollectionsContainer>
  );
};

export default Collections;
