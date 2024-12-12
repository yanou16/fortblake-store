import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Adresse email invalide');
          break;
        case 'auth/user-disabled':
          setError('Ce compte a été désactivé');
          break;
        case 'auth/user-not-found':
          setError('Aucun compte ne correspond à cette adresse email');
          break;
        case 'auth/wrong-password':
          setError('Mot de passe incorrect');
          break;
        default:
          setError('Une erreur est survenue lors de la connexion');
      }
    }
  };

  const handleGoogleSignIn = async () => {
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
      <Title>Connexion</Title>
      <GoogleButton type="button" onClick={handleGoogleSignIn}>
        <img src="/google-icon.png" alt="Google" width="20" height="20" />
        Continuer avec Google
      </GoogleButton>
      
      <AnonymousButton type="button" onClick={handleAnonymousSignIn}>
        Continuer en tant qu'invité
      </AnonymousButton>

      <Divider>
        <span>ou</span>
      </Divider>

      <StyledForm onSubmit={handleEmailSignIn}>
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
        <Button type="submit">Se connecter avec Email</Button>
      </StyledForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default SignIn;