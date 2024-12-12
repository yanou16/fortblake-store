import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductReviews from '../components/ProductReviews';
import ProductRecommendations from '../components/ProductRecommendations';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div``;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ThumbnailImage = styled.img<{ active: boolean }>`
  width: 100%;
  height: auto;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ProductInfo = styled.div``;

const ProductName = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ColorOption = styled.div<{ color: string; active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.active ? 'black' : 'transparent'};
`;

const SizeGrid = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SizeOption = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? 'black' : '#ddd'};
  background: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'black' : '#f5f5f5'};
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: ${props => props.disabled ? '#ccc' : 'black'};
  color: white;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#333'};
  }
`;

const ValidationMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const WishlistButton = styled.button<{ isInWishlist: boolean }>`
  background: ${props => props.isInWishlist ? '#ff4d4d' : 'white'};
  color: ${props => props.isInWishlist ? 'white' : '#ff4d4d'};
  border: 2px solid #ff4d4d;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isInWishlist ? '#ff3333' : '#fff0f0'};
  }
`;

const ProductDetails = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
`;

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DetailItem = styled.li`
  margin-bottom: 1rem;
  color: #666;
`;

const RelatedProducts = styled.div`
  margin-top: 4rem;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const RelatedProduct = styled.div`
  cursor: pointer;
`;

const RelatedImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const RelatedName = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const RelatedPrice = styled.div`
  color: #666;
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [mainImage, setMainImage] = useState<number>(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const productImages = [
    product.image,
    product.image.replace('.png', '-2.png'),
    product.image.replace('.png', '-3.png'),
    product.image.replace('.png', '-4.png'),
  ];

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart({
        ...product,
        selectedColor,
        selectedSize,
        quantity: 1
      });
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <ProductContainer>
      <ProductGrid>
        <ImageSection>
          <MainImage src={productImages[mainImage]} alt={product.name} />
          <ImageGrid>
            {productImages.map((img, index) => (
              <ThumbnailImage
                key={index}
                src={img}
                alt={`${product.name} view ${index + 1}`}
                active={mainImage === index}
                onClick={() => setMainImage(index)}
              />
            ))}
          </ImageGrid>
        </ImageSection>

        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}€</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>

          <SectionTitle>Couleur</SectionTitle>
          <ColorGrid>
            {product.colors.map(color => (
              <ColorOption
                key={color}
                color={color}
                active={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </ColorGrid>

          <SectionTitle>Taille</SectionTitle>
          <SizeGrid>
            {product.sizes.map(size => (
              <SizeOption
                key={size}
                active={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeOption>
            ))}
          </SizeGrid>

          <AddToCartButton 
            onClick={handleAddToCart} 
            disabled={!selectedColor || !selectedSize}
          >
            {selectedColor && selectedSize ? 'Ajouter au panier' : 'Sélectionnez une taille et une couleur'}
          </AddToCartButton>
          
          {(!selectedColor || !selectedSize) && (
            <ValidationMessage>
              {!selectedColor && !selectedSize && "Veuillez sélectionner une taille et une couleur"}
              {!selectedColor && selectedSize && "Veuillez sélectionner une couleur"}
              {selectedColor && !selectedSize && "Veuillez sélectionner une taille"}
            </ValidationMessage>
          )}

          <WishlistButton
            onClick={handleWishlistToggle}
            isInWishlist={isInWishlist(product.id)}
          >
            {isInWishlist(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </WishlistButton>

          <ProductDetails>
            <SectionTitle>Détails du produit</SectionTitle>
            <DetailsList>
              <DetailItem>Matière : 100% coton</DetailItem>
              <DetailItem>Fabriqué en France</DetailItem>
              <DetailItem>Référence : {product.id}</DetailItem>
            </DetailsList>
          </ProductDetails>
        </ProductInfo>
      </ProductGrid>

      <ProductReviews
        productId={product.id}
        reviews={[]} // À connecter avec votre backend
        onAddReview={() => {}} // À connecter avec votre backend
      />

      <ProductRecommendations
        currentProduct={product}
        allProducts={products}
      />
    </ProductContainer>
  );
};

export default ProductDetail;