import React from 'react';
import styled from 'styled-components';

const StoresContainer = styled.div`
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

const StoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StoreCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StoreImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url('/images/fortblake/store.png');
  background-size: cover;
  background-position: center;
`;

const StoreInfo = styled.div`
  padding: 1.5rem;
`;

const StoreName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const StoreAddress = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const StoreHours = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const StorePhone = styled.p`
  color: #666;
`;

const stores = [
  {
    id: 1,
    name: 'FORTBLAKE Paris',
    address: '123 Rue du Faubourg Saint-Honoré',
    city: '75008 Paris',
    hours: 'Lun-Sam: 10h-20h | Dim: Fermé',
    phone: '+33 1 23 45 67 89'
  },
  {
    id: 2,
    name: 'FORTBLAKE Lyon',
    address: '45 Rue de la République',
    city: '69002 Lyon',
    hours: 'Lun-Sam: 10h-19h | Dim: Fermé',
    phone: '+33 4 56 78 90 12'
  },
  {
    id: 3,
    name: 'FORTBLAKE Bordeaux',
    address: '78 Rue Sainte-Catherine',
    city: '33000 Bordeaux',
    hours: 'Lun-Sam: 10h-19h | Dim: Fermé',
    phone: '+33 5 56 78 90 12'
  }
];

const Stores = () => {
  return (
    <StoresContainer>
      <Title>Nos Magasins</Title>
      <StoresGrid>
        {stores.map(store => (
          <StoreCard key={store.id}>
            <StoreImage />
            <StoreInfo>
              <StoreName>{store.name}</StoreName>
              <StoreAddress>{store.address}</StoreAddress>
              <StoreAddress>{store.city}</StoreAddress>
              <StoreHours>{store.hours}</StoreHours>
              <StorePhone>{store.phone}</StorePhone>
            </StoreInfo>
          </StoreCard>
        ))}
      </StoresGrid>
    </StoresContainer>
  );
};

export default Stores;
