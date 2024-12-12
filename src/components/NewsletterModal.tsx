import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #000000;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LogoText = styled.div`
  margin-bottom: 1.5rem;
  color: white;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: "🌹";
    position: absolute;
    font-size: 1.2rem;
    bottom: -5px;
    right: -20px;
    transform: rotate(15deg);
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #cccccc;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const SubscribeButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e63e1f;
  }
`;

const NoThanksButton = styled.button`
  background: none;
  border: none;
  color: #666;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    color: #999;
  }
`;

const PrivacyText = styled.p`
  color: #666;
  font-size: 0.8rem;
  margin-top: 1.5rem;
`;

const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Vérifier si le modal a déjà été affiché
    const hasSeenModal = localStorage.getItem('hasSeenNewsletterModal');
    
    if (!hasSeenModal) {
      // Attendre 2 secondes avant d'afficher le modal
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewsletterModal', 'true');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, ajoutez la logique pour gérer l'inscription à la newsletter
    console.log('Email souscrit:', email);
    handleClose();
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={handleClose}>×</CloseButton>
        
        <LogoText>
          FORTBLAKE
        </LogoText>
        
        <Title>Sign up the newsletter</Title>
        <Subtitle>And get a 10% Bonus Code</Subtitle>
        
        <form onSubmit={handleSubscribe}>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <SubscribeButton type="submit">
            Subscribe!
          </SubscribeButton>
        </form>
        
        <NoThanksButton onClick={handleClose}>
          No, thanks
        </NoThanksButton>
        
        <PrivacyText>
          You are signing up to receive communication via email and can unsubscribe at any time.
        </PrivacyText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewsletterModal;
