import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, CreditCard } from "lucide-react";
import axios from 'axios';

export function Cart({ isOpen, closeCart }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      const data = response.data;
      setCartItems(data.cart);
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { productId: product.id });
      fetchCart(); // Refresh cart after adding
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId, change) => {
    try {
      await axios.post('http://localhost:5000/api/cart/update-quantity', {
        productId,
        quantityChange: change,
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeCart}></div>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <button type="button" className="text-gray-400 hover:text-gray-500" onClick={closeCart}>
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-8">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={`https://via.placeholder.com/150?text=${item.name}`}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center mt-4">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-gray-400 hover:text-gray-500"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <p className="mx-2 text-gray-500">Qty {item.quantity}</p>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 text-gray-400 hover:text-gray-500"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-4 font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs.{totalPrice.toFixed(2)}</p>
              </div>
              <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700">
                <CreditCard className="mr-2 h-5 w-5" /> Checkout
              </button>
              <div className="mt-6 text-center text-gray-500">
                <button onClick={closeCart} className="text-blue-600 hover:text-blue-500">
                  Continue Shopping →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
