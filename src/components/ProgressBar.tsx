import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Step = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 20px;
    height: 2px;
    background: ${({ active }) => (active ? '#000' : '#ddd')};
    z-index: -1;
  }
`;

const StepLabel = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? '#000' : '#aaa')};
  font-weight: bold;
`;

const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <ProgressContainer>
      <Step active={currentStep >= 1}>
        <StepLabel active={currentStep >= 1}>Panier</StepLabel>
      </Step>
      <Step active={currentStep >= 2}>
        <StepLabel active={currentStep >= 2}>Informations de livraison</StepLabel>
      </Step>
      <Step active={currentStep >= 3}>
        <StepLabel active={currentStep >= 3}>Confirmation</StepLabel>
      </Step>
    </ProgressContainer>
  );
};

export default ProgressBar;
