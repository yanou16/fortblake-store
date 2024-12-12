import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../data/products';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (orderData: any) => Promise<string>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === action.payload.id && 
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems)
        };
      }

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const loadCartFromLocalStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 }, loadCartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addOrder = async (orderData: any) => {
    try {
      // Validation des données requises
      if (!orderData.userId || !orderData.items || !orderData.total || !orderData.deliveryInfo) {
        throw new Error('Données de commande incomplètes');
      }

      // Validation des informations de livraison
      const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'phone', 'email'];
      for (const field of requiredFields) {
        if (!orderData.deliveryInfo[field]) {
          throw new Error(`Le champ ${field} est requis pour la livraison`);
        }
      }

      // Formatage des données pour Firestore
      const formattedOrderData = {
        userId: orderData.userId,
        items: orderData.items.map((item: any) => ({
          id: item.id || '',
          name: item.name || '',
          price: item.price || 0,
          quantity: item.quantity || 1,
          selectedSize: item.selectedSize || '',
          selectedColor: item.selectedColor || ''
        })),
        total: orderData.total || 0,
        deliveryInfo: {
          fullName: orderData.deliveryInfo.fullName,
          address: orderData.deliveryInfo.address,
          city: orderData.deliveryInfo.city,
          postalCode: orderData.deliveryInfo.postalCode,
          phone: orderData.deliveryInfo.phone,
          email: orderData.deliveryInfo.email,
          additionalInfo: orderData.deliveryInfo.additionalInfo || ''
        },
        status: 'pending',
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      };

      const docRef = await addDoc(collection(db, 'orders'), formattedOrderData);
      console.log('Commande ajoutée avec ID:', docRef.id);
      clearCart(); // Vider le panier après la commande
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la commande:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider as CartContext };
