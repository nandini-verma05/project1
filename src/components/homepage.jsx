import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Cart } from './cartbutton.jsx';
import axios from 'axios';

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart(); // Fetch cart on component mount
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cart');
      const { cart, totalItems, totalPrice } = response.data;
      setCartItems(cart);
      setTotalItems(totalItems);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { productId: product.id });
      fetchCart(); // Update cart after adding
      setIsCartOpen(true); // Show cart after adding
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <SearchBar />
            <CartButton itemCount={totalItems} openCart={() => setIsCartOpen(true)} />
            <MobileMenuButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts addToCart={addToCart} />
      </main>

      <Footer />
      <Cart
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />
    </div>
  );
}

function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <ShoppingCart className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          ShopNest
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/ProductListing" className="hover:text-gray-600 transition-colors">Products</Link>
        <Link to="/categories" className="hover:text-gray-600 transition-colors">Categories</Link>
        <Link to="/deals" className="hover:text-gray-600 transition-colors">Deals</Link>
        <Link to="/about" className="hover:text-gray-600 transition-colors">About</Link>
      </nav>
    </div>
  );
}

function SearchBar() {
  return (
    <form className="hidden items-center lg:flex">
      <input
        type="search"
        placeholder="Search..."
        className="w-full sm:w-[300px] md:w-[200px] lg:w-[300px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

function CartButton({ itemCount, openCart }) {
  return (
    <button
      onClick={openCart}
      className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">Cart</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}

function MobileMenuButton() {
  return (
    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:hidden">
      <Menu className="h-4 w-4" />
      <span className="sr-only">Menu</span>
    </button>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to ShopNest
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Discover amazing products at unbeatable prices. Shop now and transform your lifestyle!
            </p>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
              Shop Now
            </button>
            <button className="px-4 py-2 bg-transparent text-white font-semibold border border-white rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ addToCart }) {
  const products = [
    { id: 1, name: "Wireless Earbuds", price: 79.99 },
    { id: 2, name: "Smart Watch", price: 199.99 },
    { id: 3, name: "Laptop Backpack", price: 49.99 },
    { id: 4, name: "4K Action Camera", price: 299.99 },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 bg-white">
              <img
                src={`https://via.placeholder.com/200`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)} // Correctly using addToCart function here
                  className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-4 bg-gray-900 text-white text-center text-sm">
      <p>&copy; 2024 ShopNest. All rights reserved.</p>
    </footer>
  );
}
