// src/pages/Confirmation.tsx
import React from 'react';

const Confirmation = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Merci pour votre commande !</h1>
      <p>Votre commande a été passée avec succès.</p>
      <p>Vous recevrez un e-mail de confirmation sous peu.</p>
      <p>
        <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
          Retour à la page d'accueil
        </a>
      </p>
    </div>
  );
};

export default Confirmation;