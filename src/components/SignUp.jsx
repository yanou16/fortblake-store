import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #1f2937;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f9fafb;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #2563eb;
    transform: scale(1.05);
  }
`;

const GoogleButton = styled(Button)`
  background-color: #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #357ae8;
  }
`;

const AnonymousButton = styled(Button)`
  background-color: #757575;

  &:hover {
    background-color: #616161;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  span {
    padding: 0 10px;
    color: #666;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Cette adresse email est déjà utilisée');
          break;
        case 'auth/invalid-email':
          setError('Adresse email invalide');
          break;
        case 'auth/operation-not-allowed':
          setError('Opération non autorisée');
          break;
        case 'auth/weak-password':
          setError('Le mot de passe est trop faible');
          break;
        default:
          setError('Une erreur est survenue lors de l\'inscription');
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError('Erreur lors de la connexion avec Google');
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      navigate('/');
    } catch (error) {
      setError('Erreur lors de la connexion anonyme');
    }
  };

  return (
    <FormContainer>
      <Title>Inscription</Title>
      <GoogleButton type="button" onClick={handleGoogleSignUp}>
        <img src="/google-icon.png" alt="Google" width="20" height="20" />
        Continuer avec Google
      </GoogleButton>
      
      <AnonymousButton type="button" onClick={handleAnonymousSignIn}>
        Continuer en tant qu'invité
      </AnonymousButton>

      <Divider>
        <span>ou</span>
      </Divider>

      <StyledForm onSubmit={handleEmailSignUp}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">S'inscrire avec Email</Button>
      </StyledForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default SignUp;