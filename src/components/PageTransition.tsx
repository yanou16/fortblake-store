import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TransitionWrapper = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
  width: 100%;
`;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionWrapper key={location.pathname}>
      {children}
    </TransitionWrapper>
  );
};

export default PageTransition;
