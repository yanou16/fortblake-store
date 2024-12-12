import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addUserToFirestore = async (userId, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), userData);
      console.log('Utilisateur ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    }
  };

  const addOrderToFirestore = async (userId, orderData) => {
    try {
      const orderId = new Date().getTime().toString(); // Utilise un timestamp comme ID unique
      await setDoc(doc(db, 'orders', orderId), { userId, ...orderData });
      console.log('Commande ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la commande :', error);
    }
  };

  const value = {
    currentUser,
    loading,
    addUserToFirestore,
    addOrderToFirestore
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
