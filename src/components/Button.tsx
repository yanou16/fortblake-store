import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const getVariantStyles = (variant: string = 'primary') => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: var(--color-accent);
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #e63e1f;
        }
      `;
    case 'secondary':
      return css`
        background-color: var(--color-secondary);
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #3a3a3a;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);

        &:hover:not(:disabled) {
          background-color: var(--color-primary);
          color: white;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: string = 'medium') => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 16px;
        font-size: 14px;
      `;
    case 'large':
      return css`
        padding: 16px 32px;
        font-size: 18px;
      `;
    default:
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => getVariantStyles(props.variant)}
  ${props => getSizeStyles(props.size)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
