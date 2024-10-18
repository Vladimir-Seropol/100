// src/App.tsx
import React, { useState } from 'react';
import Cart from '../../components/Cart';
import { Product } from '../../components/Cart/Product.ts';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const products: Product[] = [
        { id: 1, name: 'Товар 1', price: 10 },
        { id: 2, name: 'Товар 2', price: 20 },
        { id: 3, name: 'Товар 3', price: 30 },
    ];

    const addToCart = (product: Product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <div>
            <h1>Магазин</h1>
            <div>
                <h2>Товары</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - ${product.price.toFixed(2)} 
                            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
                        </li>
                    ))}
                </ul>
            </div>

            <Cart items={cartItems} onRemove={removeFromCart} />
        </div>
    );
};

export default CartPage;