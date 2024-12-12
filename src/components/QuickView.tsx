import React, { useState } from 'react';
import styled from 'styled-components';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext'; 

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    max-width: 90%;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 95%;
    gap: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  z-index: 2;

  &:hover {
    opacity: 0.7;
  }
`;

const ImageSection = styled.div`
  position: relative;
  padding-bottom: 125%;
  background: #f8f8f8;

  @media (max-width: 768px) {
    padding-bottom: 100%;
  }
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #666;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ColorButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  background: ${props => props.active ? 'black' : 'transparent'};
  color: ${props => props.active ? 'white' : 'black'};
  border: 2px solid black;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }

  &:hover {
    background: ${props => props.active ? 'black' : '#f0f0f0'};
  }
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const SizeButton = styled(ColorButton)`
  min-width: 60px;

  @media (max-width: 768px) {
    min-width: 50px;
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
  transition: all 0.3s ease;
  letter-spacing: 2px;
  margin-top: auto;

  &:hover {
    background: #333;
  }
`;

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal onClick={handleClickOutside}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ImageSection>
          <ProductImage src={product.image} alt={product.name} />
        </ImageSection>
        <InfoSection>
          <Title>{product.name}</Title>
          <Price>{product.price.toFixed(2)} €</Price>
          <Description>{product.description}</Description>
          
          <Label>Couleur</Label>
          <ColorOptions>
            {product.colors.map(color => (
              <ColorButton
                key={color}
                active={color === selectedColor}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </ColorButton>
            ))}
          </ColorOptions>

          <Label>Taille</Label>
          <SizeOptions>
            {product.sizes.map(size => (
              <SizeButton
                key={size}
                active={size === selectedSize}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeButton>
            ))}
          </SizeOptions>

          <AddToCartButton onClick={handleAddToCart}>
            Ajouter au panier
          </AddToCartButton>
        </InfoSection>
      </ModalContent>
    </Modal>
  );
};

export default QuickView;
