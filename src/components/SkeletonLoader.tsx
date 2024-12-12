import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ProductCardSkeleton = styled(SkeletonBase)`
  width: 100%;
  max-width: 300px;
  height: 400px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const TextLineSkeleton = styled(SkeletonBase)<{ width?: string }>`
  height: 1rem;
  width: ${props => props.width || '100%'};
  margin: 0.5rem 0;
`;

const ProductGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

interface SkeletonProps {
  type: 'product' | 'text' | 'grid';
  count?: number;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ type, count = 1, width }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'product':
        return <ProductCardSkeleton />;
      case 'text':
        return <TextLineSkeleton width={width} />;
      case 'grid':
        return (
          <ProductGridSkeleton>
            {Array.from({ length: count }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ProductGridSkeleton>
        );
      default:
        return null;
    }
  };

  if (type !== 'grid') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>
            {renderSkeleton()}
          </React.Fragment>
        ))}
      </>
    );
  }

  return renderSkeleton();
};

export default SkeletonLoader;
