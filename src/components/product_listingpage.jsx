import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Cart } from './cartbutton';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false); // Manage cart visibility
  const [cartItems, setCartItems] = useState([]); // Store cart items

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate fetching 50 random products
        const fetchedProducts = Array.from({ length: 50 }, (_, index) => ({
          id: index + 1,
          name: `Product ${index + 1}`,
          price: Math.floor(Math.random() * 200) + 50,
          image: `https://via.placeholder.com/200?text=Product+${index + 1}`, // Update image URL
        }));

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart after adding
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 font-medium">₹{product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)} // Correct placement of onClick
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Cart isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} cartItems={cartItems} />
    </div>
  );
};

export default ProductListing;
