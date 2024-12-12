import React from 'react';
import styled from 'styled-components';

const CareersContainer = styled.div`
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

const Intro = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const JobsGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const JobCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const JobLocation = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const JobType = styled.span`
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const JobDescription = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 1rem 0;
`;

const ApplyButton = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`;

const jobs = [
  {
    id: 1,
    title: 'Designer Produit',
    location: 'Paris, France',
    type: 'CDI',
    description: 'Nous recherchons un designer produit passionné pour rejoindre notre équipe créative et participer à la conception de nos futures collections.'
  },
  {
    id: 2,
    title: 'Responsable E-commerce',
    location: 'Paris, France',
    type: 'CDI',
    description: 'Gérez notre boutique en ligne et développez notre présence digitale. Une expérience en e-commerce et une passion pour la mode sont requises.'
  },
  {
    id: 3,
    title: 'Visual Merchandiser',
    location: 'Lyon, France',
    type: 'CDI',
    description: 'Créez des expériences visuelles uniques dans nos boutiques et assurez une présentation optimale de nos collections.'
  }
];

const Careers = () => {
  return (
    <CareersContainer>
      <Title>Carrières</Title>
      
      <Intro>
        <IntroText>
          Rejoignez l'équipe FORTBLAKE et participez à l'évolution du streetwear. 
          Nous recherchons des talents passionnés qui partagent notre vision et notre créativité.
        </IntroText>
      </Intro>

      <JobsGrid>
        {jobs.map(job => (
          <JobCard key={job.id}>
            <JobTitle>{job.title}</JobTitle>
            <JobLocation>{job.location}</JobLocation>
            <JobType>{job.type}</JobType>
            <JobDescription>{job.description}</JobDescription>
            <ApplyButton>Postuler</ApplyButton>
          </JobCard>
        ))}
      </JobsGrid>
    </CareersContainer>
  );
};

export default Careers;
