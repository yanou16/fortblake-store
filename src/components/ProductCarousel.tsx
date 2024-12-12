import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

const CarouselContainer = styled.div`
  position: relative;
  padding: 2rem 0;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 800;
  letter-spacing: 1px;
`;

const CarouselTrack = styled.div<{ transform: string }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.transform}px);
  gap: 2rem;
  padding: 1rem;
`;

const ProductCard = styled(Link)`
  flex: 0 0 300px;
  text-decoration: none;
  color: inherit;
  position: relative;
  
  @media (max-width: 768px) {
    flex: 0 0 250px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ProductInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.span`
  font-weight: 600;
`;

const CarouselButton = styled.button<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#000' : '#ddd'};
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#000' : '#999'};
  }
`;

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transform, setTransform] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const itemsPerView = window.innerWidth < 768 ? 1 : 3;

  useEffect(() => {
    const handleResize = () => {
      const newCardWidth = window.innerWidth < 768 ? 250 : 300;
      setCardWidth(newCardWidth);
      setTransform(-currentIndex * newCardWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setTransform(prev => prev + cardWidth);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - itemsPerView) {
      setCurrentIndex(prev => prev + 1);
      setTransform(prev => prev - cardWidth);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setTransform(-index * cardWidth);
  };

  return (
    <CarouselContainer>
      <Title>{title}</Title>
      
      <CarouselButton 
        direction="prev" 
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        ←
      </CarouselButton>

      <CarouselTrack transform={transform.toString()}>
        {products.map((product) => (
          <ProductCard key={product.id} to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}€</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </CarouselTrack>

      <CarouselButton 
        direction="next" 
        onClick={handleNext}
        disabled={currentIndex >= products.length - itemsPerView}
      >
        →
      </CarouselButton>

      <ProgressDots>
        {Array.from({ length: products.length - itemsPerView + 1 }).map((_, index) => (
          <Dot
            key={index}
            active={currentIndex === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </ProgressDots>
    </CarouselContainer>
  );
};

export default ProductCarousel;
