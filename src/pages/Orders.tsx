import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Commandes</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>ID de commande: {order.id}</p>
            <p>Utilisateur: {order.userId}</p>
            <p>Total: {order.total} €</p>
            <p>Date: {new Date(order.date.seconds * 1000).toLocaleString()}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
