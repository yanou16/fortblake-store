import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 140px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 800;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #333;
`;

const ImageSection = styled.div`
  width: 100%;
  height: 400px;
  margin: 3rem 0;
  background-image: url('/images/fortblake/about-hero.png');
  background-size: cover;
  background-position: center;
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>À propos de FORTBLAKE</Title>
      
      <ImageSection />
      
      <Section>
        <SubTitle>Notre Histoire</SubTitle>
        <Text>
          Fondée en 2023, FORTBLAKE est née d'une passion pour le streetwear et d'une vision unique de la mode urbaine. 
          Notre marque puise son inspiration dans la culture urbaine contemporaine et l'esthétique minimaliste.
        </Text>
        <Text>
          Ce qui a commencé comme un petit projet est rapidement devenu une référence dans le monde du streetwear, 
          grâce à notre engagement envers la qualité et notre style distinctif.
        </Text>
      </Section>

      <Section>
        <SubTitle>Notre Vision</SubTitle>
        <Text>
          Chez FORTBLAKE, nous croyons que le streetwear est plus qu'un simple style vestimentaire - c'est une forme d'expression personnelle. 
          Notre objectif est de créer des vêtements qui permettent à chacun d'exprimer sa personnalité tout en restant fidèle à l'esthétique urbaine.
        </Text>
      </Section>

      <Section>
        <SubTitle>Nos Valeurs</SubTitle>
        <Text>
          • Qualité Premium : Nous utilisons uniquement les meilleurs matériaux pour garantir durabilité et confort.
        </Text>
        <Text>
          • Design Unique : Chaque pièce est conçue avec soin pour offrir un style distinctif et intemporel.
        </Text>
        <Text>
          • Durabilité : Nous nous engageons à réduire notre impact environnemental à travers des pratiques responsables.
        </Text>
      </Section>
    </AboutContainer>
  );
};

export default About;
