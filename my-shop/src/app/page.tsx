'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://image.qwenlm.ai/public_source/3cd6076d-935e-469c-be91-47a3397b1e57/1a8531570-d85f-48e9-81a3-54bad746d9f4.png",
    description: "Premium noise-canceling wireless headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "https://image.qwenlm.ai/public_source/3cd6076d-935e-469c-be91-47a3397b1e57/1e06c33e1-83a3-468e-a117-145743ce601b.png",
    description: "Advanced fitness tracking and notifications"
  },
  {
    id: 3,
    name: "Laptop Pro",
    price: 1299.99,
    image: "https://image.qwenlm.ai/public_source/3cd6076d-935e-469c-be91-47a3397b1e57/113e9fa20-0f59-4a36-a0ed-4a2c7a947020.png",
    description: "Powerful performance for professionals"
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 129.99,
    image: "https://image.qwenlm.ai/public_source/3cd6076d-935e-469c-be91-47a3397b1e57/125f3fbf5-1274-4e74-a5da-8b8d811cd167.png",
    description: "Lightweight and comfortable for daily runs"
  },
  {
    id: 5,
    name: "Travel Backpack",
    price: 79.99,
    image: "https://image.qwenlm.ai/public_source/3cd6076d-935e-469c-be91-47a3397b1e57/1d2d6462a-c287-41c0-a312-0e834c6ed931.png",
    description: "Durable and spacious for all your adventures"
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: 159.99,
    image: "https://image.qwenlm.ai/public_source/3cd6076d-935e-469c-be91-47a3397b1e57/16cb2b952-e96d-4a64-8c6e-be157707ec22.png",
    description: "UV protection with stylish design"
  }
];

// Header Component
const Header = ({ cartCount, onCartClick }: any) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ShopHub</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition">Home</a>
            <a href="#products" className="text-gray-600 hover:text-purple-600 transition">Products</a>
            <a href="#about" className="text-gray-600 hover:text-purple-600 transition">About</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600 transition">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-6">Welcome to ShopHub</h2>
          <p className="text-xl mb-8 opacity-90">Discover amazing products at unbeatable prices. Quality meets affordability in our curated collection.</p>
          <a 
            href="#products" 
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Shop Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }: any) => {
  return (
    <motion.div 
      className="product-card bg-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h4>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg hover:shadow-indigo-500/40"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Products Section Component
const ProductsSection = ({ onAddToCart }: any) => {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">Handpicked selection of premium products just for you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
      title: "Quality Guaranteed",
      description: "All products are verified for quality and authenticity"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Fast Delivery",
      description: "Free shipping on orders over $50"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      title: "24/7 Support",
      description: "Customer support available around the clock"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">ShopHub</h5>
            <p className="text-gray-400">Your one-stop destination for quality products at great prices.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#products" className="hover:text-white transition">Products</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Customer Service</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-2 rounded-r-lg hover:opacity-90 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Cart Sidebar Component
const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, subtotal, shipping, total, onCheckout }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[70]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-800">Shopping Cart</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item: any, index: number) => (
                    <motion.div 
                      key={item.id}
                      className="flex items-center space-x-4 mb-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-purple-600 font-semibold">${item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                            </svg>
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-2 hover:bg-red-50 rounded-full transition"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
              
              <div className="border-t p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold text-gray-800">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between mb-6 text-xl">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-purple-600">${total.toFixed(2)}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:scale-105 transition shadow-lg hover:shadow-indigo-500/40 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Checkout Modal Component
const CheckoutModal = ({ isOpen, onClose, total, onSubmit }: any) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-[110]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Checkout</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Shipping Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="First Name" 
                      required 
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Last Name" 
                      required 
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
                    />
                    <input 
                      type="text" 
                      name="address"
                      placeholder="Address" 
                      required 
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
                    />
                    <input 
                      type="text" 
                      name="city"
                      placeholder="City" 
                      required 
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input 
                      type="text" 
                      name="postalCode"
                      placeholder="Postal Code" 
                      required 
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Payment Information</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="Card Number" 
                      required 
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="expiry"
                        placeholder="MM/YY" 
                        required 
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input 
                        type="text" 
                        name="cvv"
                        placeholder="CVV" 
                        required 
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-purple-600 text-xl">${total.toFixed(2)}</span>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:scale-105 transition shadow-lg hover:shadow-indigo-500/40"
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Notification Component
const Notification = ({ message, isVisible }: any) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[200]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App Component
export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const showNotification = (message: string) => {
    setNotification({ message, isVisible: true });
    setTimeout(() => {
      setNotification({ message: '', isVisible: false });
    }, 3000);
  };

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: any) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: any, change: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleCheckout = (formData: any) => {
    showNotification(`Thank you, ${formData.firstName}! Order placed successfully.`);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <HeroSection />
        <ProductsSection onAddToCart={addToCart} />
        <FeaturesSection />
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onSubmit={handleCheckout}
      />

      <Notification 
        message={notification.message} 
        isVisible={notification.isVisible} 
      />
    </div>
  );
}