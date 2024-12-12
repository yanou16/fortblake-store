import React from 'react';
import { products } from '../data/products';

const TShirts = () => {
    const filteredProducts = products.filter(product => product.category === 't-shirts');

    return (
        <div>
            <h1>T-Shirts</h1>
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

export default TShirts;
