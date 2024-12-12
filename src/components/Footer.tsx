import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  font-weight: 600;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.8rem;
`;

const FooterLink = styled.a`  /* Changement ici */
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid #333;
  color: #666;
  font-size: 0.9rem;
`;

const Newsletter = styled.div`
  margin-top: 1rem;
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid #333;
  padding: 0.8rem;
  width: 100%;
  color: white;
  margin-bottom: 1rem;

  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  background: white;
  color: black;
  border: none;
  padding: 0.8rem 2rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>FORTBLAKE</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/about">À propos</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/stores">Nos magasins</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/careers">Carrières</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Service Client</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="https://github.com/yanou16" target="_blank" rel="noopener noreferrer">Service Client</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="https://github.com/yanou16" target="_blank" rel="noopener noreferrer">Contact</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="https://github.com/yanou16" target="_blank" rel="noopener noreferrer">Livraison</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="https://github.com/yanou16" target="_blank" rel="noopener noreferrer">Retours</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="https://github.com/yanou16" target="_blank" rel="noopener noreferrer">Guide des tailles</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Légal</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/terms">Conditions générales</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/privacy">Politique de confidentialité</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/cookies">Cookies</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Newsletter</FooterTitle>
          <Newsletter>
            <Input type="email" placeholder="Votre email" />
            <Button>S'inscrire</Button>
          </Newsletter>
          <SocialLinks>
            <SocialIcon href="https://instagram.com" target="_blank">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="https://facebook.com" target="_blank">
              <i className="fab fa-facebook"></i>
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} FORTBLAKE. Tous droits réservés.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;