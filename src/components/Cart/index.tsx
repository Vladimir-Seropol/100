// src/components/Cart.tsx
import React from 'react';
import { Product } from '../Cart/Product.ts';

interface CartProps {
    items: Product[];
    onRemove: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
    const totalPrice = items.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h2>Корзина</h2>
            {items.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price.toFixed()} 
                            <button onClick={() => onRemove(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Итого: ${totalPrice.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;