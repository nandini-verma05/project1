import React, { useState } from 'react';
import { Star, Heart, Share2, Truck, ShieldCheck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const product = {
  name: "Premium Wireless Noise-Cancelling Headphones",
  price: 299.99,
  rating: 4.7,
  reviews: 1287,
  description: "Experience crystal-clear audio and immersive sound with our Premium Wireless Noise-Cancelling Headphones. Perfect for music enthusiasts and professionals alike.",
  features: [
    "Active Noise Cancellation technology",
    "40-hour battery life",
    "Bluetooth 5.0 connectivity",
    "Comfortable over-ear design",
    "Built-in microphone for calls",
    "Touch controls for easy operation"
  ],
  specs: {
    "Brand": "AudioTech",
    "Model": "AT-5000",
    "Color": "Midnight Black",
    "Connectivity": "Wireless",
    "Battery Life": "Up to 40 hours",
    "Weight": "250g"
  },
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400"
  ]
};

export default function ProductDescription() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('features');

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-500">{rating} ({product.reviews} reviews)</span>
      </div>
    );
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
            <img src={mainImage} className="h-full w-full object-cover" alt={product.name} />
          </div>
          <div className="flex -mx-2 mb-4">
            {product.images.map((image, i) => (
              <div className="flex-1 px-2" key={i}>
                <button 
                  onClick={() => setMainImage(image)} 
                  className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <img src={image} className="h-full object-cover" alt={`${product.name} ${i + 1}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center mb-4">
            {renderRatingStars(product.rating)}
          </div>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 ml-2">+ Free Shipping</span>
          </div>
          <p className="text-gray-500 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="font-bold text-gray-700 mr-2">Quantity:</span>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-md px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="flex -mx-2 mb-4">
            <div className="w-1/2 px-2">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
            <div className="w-1/2 px-2">
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <button className="flex items-center text-gray-700 mr-4">
              <Heart className="w-5 h-5 mr-1" />
              Add to Wishlist
            </button>
            <button className="flex items-center text-gray-700">
              <Share2 className="w-5 h-5 mr-1" />
              Share
            </button>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <Truck className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center mb-2">
              <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">2-Year Warranty</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">30-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex border-b mb-4">
          <button 
            onClick={() => setActiveTab('features')} 
            className={`py-2 px-4 ${activeTab === 'features' ? 'border-b-2 border-blue-500' : ''}`}
          >
            Features
          </button>
          <button 
            onClick={() => setActiveTab('specs')} 
            className={`py-2 px-4 ${activeTab === 'specs' ? 'border-b-2 border-blue-500' : ''}`}
          >
            Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')} 
            className={`py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500' : ''}`}
          >
            Reviews
          </button>
        </div>
        {activeTab === 'features' && (
          <ul className="list-disc pl-6">
            {product.features.map((feature, index) => (
              <li key={index} className="mb-2">{feature}</li>
            ))}
          </ul>
        )}
        {activeTab === 'specs' && (
          <table className="w-full">
            <tbody>
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="py-2 font-medium">{key}</td>
                  <td className="py-2 text-gray-500">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'reviews' && (
          <p>Customer reviews will be displayed here.</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        {['compatibility', 'battery', 'warranty'].map((section) => (
          <div key={section} className="border-b py-4">
            <button
              onClick={() => toggleSection(section)}
              className="flex justify-between items-center w-full text-left font-medium"
            >
              <span>
                {section === 'compatibility' && "Are these headphones compatible with all devices?"}
                {section === 'battery' && "How long does the battery last?"}
                {section === 'warranty' && "What does the warranty cover?"}
              </span>
              {expandedSection === section ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expandedSection === section && (
              <p className="mt-2 text-gray-600">
                {section === 'compatibility' && "Yes, these headphones are compatible with any device that supports Bluetooth connectivity, including smartphones, tablets, laptops, and smart TVs."}
                {section === 'battery' && "The battery lasts up to 40 hours on a single charge with active noise cancellation turned on. With ANC off, you can get up to 60 hours of playtime."}
                {section === 'warranty' && "Our 2-year warranty covers manufacturing defects and malfunctions. It does not cover damage from accidents, misuse, or normal wear and tear."}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}