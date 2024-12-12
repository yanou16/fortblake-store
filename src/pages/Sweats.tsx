import React from 'react';
import { products } from '../data/products';

const Sweats = () => {
    const filteredProducts = products.filter(product => product.category === 'sweats');

    return (
        <div>
            <h1>Sweats</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredProducts.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '200px' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p><strong>{product.price} €</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sweats;
