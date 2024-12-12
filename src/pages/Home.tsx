import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('/images/fortblake/carbone-hero.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 0;
  margin: 0;
  background-color: #808080;
`;

const HeroContent = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 7rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-weight: 800;
  letter-spacing: 8px;
  color: white;

  @media (max-width: 768px) {
    font-size: 4rem;
    letter-spacing: 4px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: white;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 4rem;
  background-color: white;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  border: none;
  font-size: 1.2rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
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
  margin-bottom: 3rem;
`;

const ProductCard = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const ProductPrice = styled.p`
  font-weight: 600;
  margin-bottom: 1rem;
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
`;

const CollectionTitle = styled.h3`
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const TestimonialsSection = styled.section`
  padding: 8rem 2rem;
  background-color: #f8f8f8;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TestimonialAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const TestimonialLocation = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
`;

const TestimonialRating = styled.div`
  color: #ffd700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const testimonials = [
  {
    id: 1,
    name: 'Thomas L.',
    location: 'Paris',
    avatar: '/images/fortblake/avatar1.png',
    text: 'La qualité des vêtements est exceptionnelle. Le sweat CARBONE est devenu mon favori, le style est unique et la coupe parfaite.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marie D.',
    location: 'Lyon',
    avatar: '/images/fortblake/avatar2.png',
    text: 'Service client au top et livraison rapide. Les tailles sont conformes et les matériaux utilisés sont de très haute qualité.',
    rating: 5
  },
  {
    id: 3,
    name: 'Lucas M.',
    location: 'Bordeaux',
    avatar: '/images/fortblake/avatar3.png',
    text: 'Le style FORTBLAKE est unique. Chaque pièce est pensée dans les moindres détails. Je recommande vivement !',
    rating: 5
  }
];

const Home = () => {
  const newArrivals = products.filter(product => product.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(product => product.isBestSeller).slice(0, 4);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle></HeroTitle>
          <HeroSubtitle>
            
          </HeroSubtitle>
          <Button to="/collections/street">DÉCOUVRIR</Button>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Nouveautés</SectionTitle>
        <ProductGrid>
          {newArrivals.map(product => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}€</ProductPrice>
              <Button to={'/nouveautes'}>Voir plus</Button>
            </ProductCard>
          ))}
        </ProductGrid>
      </Section>

      <Section style={{ background: '#f5f5f5' }}>
        <SectionTitle>Collections</SectionTitle>
        <CollectionGrid>
          <CollectionCard to="/collections/street">
            <CollectionImage src="/images/fortblake/street-collection.png" alt="Street Collection" />
            <CollectionOverlay>
              <CollectionTitle>STREET</CollectionTitle>
            </CollectionOverlay>
          </CollectionCard>
          <CollectionCard to="/collections/essential">
            <CollectionImage src="/images/fortblake/essential-collection.png" alt="Essential Collection" />
            <CollectionOverlay>
              <CollectionTitle>ESSENTIAL</CollectionTitle>
            </CollectionOverlay>
          </CollectionCard>
        </CollectionGrid>
      </Section>

      <Section>
        <SectionTitle>Best-Sellers</SectionTitle>
        <ProductGrid>
          {bestSellers.map(product => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}€</ProductPrice>
              <Button to={'/best-sellers'}>Voir plus</Button>
            </ProductCard>
          ))}
        </ProductGrid>
      </Section>

      <TestimonialsSection>
        <SectionTitle>Ce que disent nos clients</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id}>
              <TestimonialHeader>
                <TestimonialAvatar src={testimonial.avatar} alt={testimonial.name} />
                <TestimonialInfo>
                  <TestimonialName>{testimonial.name}</TestimonialName>
                  <TestimonialLocation>{testimonial.location}</TestimonialLocation>
                </TestimonialInfo>
              </TestimonialHeader>
              <TestimonialRating>
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </TestimonialRating>
              <TestimonialText>{testimonial.text}</TestimonialText>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>
    </HomeContainer>
  );
};

export default Home;
