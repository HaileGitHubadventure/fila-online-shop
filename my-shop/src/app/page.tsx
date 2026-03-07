'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// FIREBASE CONFIGURATION (lib/firebase.js structure)
// ============================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase storage utility functions
const uploadToFirebase = async (file, path) => {
  // In production, use actual Firebase Storage
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: URL.createObjectURL(file), path });
    }, 1000);
  });
};

// ============================================
// SAMPLE PRODUCT DATA
// ============================================
const initialProducts = [
  {
    id: 1,
    name: "Premium Sportswear Set",
    price: 89.99,
    image: "https://image.qwenlm.ai/public_source/cef74b0d-6c72-438f-bf5f-2ea745cfcbce/17c670042-3a72-4029-804b-1e905481b6cf.png",
    description: "Comfortable sportswear for active lifestyle",
    category: "clothes",
    subcategory: "sport",
    seller: "SportsPro",
    stock: 50
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://image.qwenlm.ai/public_source/cef74b0d-6c72-438f-bf5f-2ea745cfcbce/1e7b78665-f7ba-4adb-a84e-010b8c0382b2.png",
    description: "Advanced fitness tracking and notifications",
    category: "electronics",
    subcategory: "watch",
    seller: "TechHub",
    stock: 30
  },
  {
    id: 3,
    name: "Industrial Motor",
    price: 549.99,
    image: "https://image.qwenlm.ai/public_source/cef74b0d-6c72-438f-bf5f-2ea745cfcbce/176086264-c5f0-43db-a281-7bdfc6c83e27.png",
    description: "High-performance industrial motor for machinery",
    category: "machinery",
    subcategory: "spare-parts",
    seller: "MachineryWorld",
    stock: 15
  },
  {
    id: 4,
    name: "Kids Fashion Bundle",
    price: 59.99,
    image: "https://image.qwenlm.ai/public_source/cef74b0d-6c72-438f-bf5f-2ea745cfcbce/17c670042-3a72-4029-804b-1e905481b6cf.png",
    description: "Stylish and comfortable kids clothing",
    category: "clothes",
    subcategory: "kids",
    seller: "KidsStyle",
    stock: 100
  },
  {
    id: 5,
    name: "Smartphone X12",
    price: 799.99,
    image: "https://image.qwenlm.ai/public_source/cef74b0d-6c72-438f-bf5f-2ea745cfcbce/1e7b78665-f7ba-4adb-a84e-010b8c0382b2.png",
    description: "Latest flagship smartphone with AI features",
    category: "electronics",
    subcategory: "cell-phone",
    seller: "MobileZone",
    stock: 25
  },
  {
    id: 6,
    name: "Domestic Appliance Set",
    price: 399.99,
    image: "https://image.qwenlm.ai/public_source/cef74b0d-6c72-438f-bf5f-2ea745cfcbce/176086264-c5f0-43db-a281-7bdfc6c83e27.png",
    description: "Complete home appliance package",
    category: "machinery",
    subcategory: "domestic",
    seller: "HomeEssentials",
    stock: 40
  }
];

// ============================================
// CATEGORY CONFIGURATION
// ============================================
const categories = {
  clothes: {
    name: "Clothing & Fashion",
    icon: "👕",
    subcategories: [
      { id: "sport", name: "Sport", icon: "⚽" },
      { id: "kids", name: "Kids", icon: "👶" },
      { id: "fashion", name: "Fashion", icon: "👗" }
    ]
  },
  machinery: {
    name: "Machinery & Equipment",
    icon: "⚙️",
    subcategories: [
      { id: "spare-parts", name: "Spare Parts", icon: "🔧" },
      { id: "domestic", name: "Domestic Products", icon: "🏠" },
      { id: "other", name: "Other", icon: "📦" }
    ]
  },
  electronics: {
    name: "Electronics",
    icon: "📱",
    subcategories: [
      { id: "watch", name: "Watch", icon: "⌚" },
      { id: "cell-phone", name: "Cell Phone", icon: "📱" },
      { id: "bureau", name: "Office Devices", icon: "🖥️" }
    ]
  }
};

// ============================================
// AUTHENTICATION COMPONENTS
// ============================================
const WelcomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            FastTrade Shop
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Your one-stop marketplace for clothing, electronics, and machinery. 
            Connect with buyers and sellers worldwide.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-white font-semibold mb-2">Buy Products</h3>
            <p className="text-white/70 text-sm">Browse thousands of products across multiple categories</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-white font-semibold mb-2">Sell Products</h3>
            <p className="text-white/70 text-sm">List your products and reach global customers</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-white font-semibold mb-2">AI Assistant</h3>
            <p className="text-white/70 text-sm">Get personalized recommendations and support</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <button 
            onClick={onGetStarted}
            className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const AuthPage = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    cellPhone: '',
    whatsapp: '',
    userType: 'buyer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
    }

    // Simulate authentication
    setTimeout(() => {
      onAuthComplete({
        ...formData,
        id: Date.now().toString(),
        role: formData.userType
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to continue' : 'Join FastTrade Shop today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City, Country"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cell Phone</label>
                  <input
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 234..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 234..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
                <div className="grid grid-cols-3 gap-2">
                  {['buyer', 'seller', 'worker'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: type })}
                      className={`py-3 rounded-xl font-medium transition ${
                        formData.userType === type
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// HEADER COMPONENT
// ============================================
const Header = ({ user, cartCount, onCartClick, onNavigate, currentPage, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('marketplace')}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">FastTrade</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('marketplace')}
              className={`text-gray-600 hover:text-purple-600 transition font-medium ${currentPage === 'marketplace' ? 'text-purple-600' : ''}`}
            >
              Marketplace
            </button>
            {(user?.role === 'seller' || user?.role === 'admin') && (
              <button 
                onClick={() => onNavigate('upload')}
                className={`text-gray-600 hover:text-purple-600 transition font-medium ${currentPage === 'upload' ? 'text-purple-600' : ''}`}
              >
                Sell Product
              </button>
            )}
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate('admin')}
                className={`text-gray-600 hover:text-purple-600 transition font-medium ${currentPage === 'admin' ? 'text-purple-600' : ''}`}
              >
                Admin Panel
              </button>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{user?.username || 'Guest'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'visitor'}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'G'}
              </div>
              <button onClick={onLogout} className="text-sm text-red-600 hover:text-red-700">Logout</button>
            </div>

            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4 border-t pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-3">
              <button onClick={() => { onNavigate('marketplace'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-purple-600">Marketplace</button>
              {(user?.role === 'seller' || user?.role === 'admin') && (
                <button onClick={() => { onNavigate('upload'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-purple-600">Sell Product</button>
              )}
              {user?.role === 'admin' && (
                <button onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-purple-600">Admin Panel</button>
              )}
              <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="text-left text-red-600">Logout</button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// ============================================
// SEARCH & FILTER COMPONENT
// ============================================
const SearchFilter = ({ onSearch, onCategoryFilter, onSubcategoryFilter, selectedCategory, selectedSubcategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button 
          type="submit"
          className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Search
        </button>
        <button 
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          Filters
        </button>
      </form>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="border-t pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { onCategoryFilter(null); onSubcategoryFilter(null); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      !selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {Object.entries(categories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => { onCategoryFilter(key); onSubcategoryFilter(null); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === key ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              {selectedCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onSubcategoryFilter(null)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        !selectedSubcategory ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {categories[selectedCategory].subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onSubcategoryFilter(sub.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          selectedSubcategory === sub.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sub.icon} {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// PRODUCT CARD COMPONENT
// ============================================
const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {categories[product.category]?.icon} {categories[product.category]?.subcategories.find(s => s.id === product.subcategory)?.name}
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">Stock: {product.stock}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Seller: {product.seller}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Add to Cart
          </button>
          <button 
            onClick={() => onViewDetails(product)}
            className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PRODUCT UPLOAD COMPONENT
// ============================================
const ProductUpload = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    stock: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload to Firebase Storage
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: imagePreview || 'https://via.placeholder.com/400',
      id: Date.now()
    });
    
    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">List Your Product</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition cursor-pointer">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => { setImage(null); setImagePreview(null); }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition">
                Choose from Gallery
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your product"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Category</option>
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                required
                disabled={!formData.category}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              >
                <option value="">Select Subcategory</option>
                {formData.category && categories[formData.category].subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.icon} {sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'List Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================
// AI ASSISTANT COMPONENT
// ============================================
const AIAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I\'m your AI shopping assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I can help you find products in our marketplace. What category are you interested in?',
        'We have great deals on electronics, clothing, and machinery. Let me know what you\'re looking for!',
        'You can filter products by category and subcategory using the search filters above.',
        'To sell a product, go to the "Sell Product" page and fill in the product details.',
        'All products come with quality guarantee and fast shipping options.'
      ];
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: responses[Math.floor(Math.random() * responses.length)] 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed bottom-24 right-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
    >
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-white/70 text-xs">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// ADMIN PANEL COMPONENT
// ============================================
const AdminPanel = ({ products, users, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('products');

  const stats = [
    { label: 'Total Products', value: products.length, icon: '📦', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Users', value: users.length, icon: '👥', color: 'from-purple-500 to-pink-500' },
    { label: 'Total Sales', value: '$12,450', icon: '💰', color: 'from-green-500 to-emerald-500' },
    { label: 'Pending Orders', value: '23', icon: '📋', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'products' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'users' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'
              }`}
            >
              Users ({users.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'products' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 text-sm border-b">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Seller</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <span className="font-medium text-gray-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">
                        {categories[product.category]?.name}
                      </td>
                      <td className="py-4 font-medium text-purple-600">${product.price.toFixed(2)}</td>
                      <td className="py-4 text-gray-600">{product.stock}</td>
                      <td className="py-4 text-gray-600">{product.seller}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 text-sm border-b">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{user.email}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-100 text-red-700' :
                          user.role === 'seller' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600">{user.location}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">View</button>
                          <button className="text-red-600 hover:text-red-700">Ban</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// CART SIDEBAR COMPONENT
// ============================================
const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, subtotal, shipping, total, onCheckout }) => {
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
                  cart.map((item, index) => (
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

// ============================================
// NOTIFICATION COMPONENT
// ============================================
const Notification = ({ message, isVisible, type = 'success' }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[200] ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
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

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false, type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const showNotification = (message, type = 'success') => {
    setNotification({ message, isVisible: true, type });
    setTimeout(() => {
      setNotification({ message: '', isVisible: false, type: 'success' });
    }, 3000);
  };

  const handleAuthComplete = (userData) => {
    setUser(userData);
    setUsers(prev => [...prev, userData]);
    setCurrentPage('marketplace');
    showNotification(`Welcome, ${userData.username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('welcome');
    setCart([]);
    showNotification('Logged out successfully');
  };

  const addToCart = (product) => {
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

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
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

  const handleProductUpload = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, seller: user.username }]);
    setCurrentPage('marketplace');
    showNotification('Product listed successfully!');
  };

  const handleCheckout = () => {
    showNotification('Order placed successfully!');
    setCart([]);
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  // Render based on current page
  if (currentPage === 'welcome') {
    return <WelcomePage onGetStarted={() => setCurrentPage('auth')} />;
  }

  if (currentPage === 'auth' || !user) {
    return <AuthPage onAuthComplete={handleAuthComplete} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        user={user} 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'marketplace' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SearchFilter 
                onSearch={setSearchQuery}
                onCategoryFilter={setSelectedCategory}
                onSubcategoryFilter={setSelectedSubcategory}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
              />

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory ? categories[selectedCategory].name : 'All Products'}
                  {selectedSubcategory && ` > ${categories[selectedCategory]?.subcategories.find(s => s.id === selectedSubcategory)?.name}`}
                </h2>
                <p className="text-gray-600">{filteredProducts.length} products found</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={addToCart}
                      onViewDetails={() => showNotification('Product details coming soon!')}
                    />
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <p className="text-gray-500 text-lg">No products found</p>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </motion.div>
          </>
        )}

        {currentPage === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductUpload 
              onSubmit={handleProductUpload}
              onCancel={() => setCurrentPage('marketplace')}
            />
          </motion.div>
        )}

        {currentPage === 'admin' && user?.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminPanel 
              products={products} 
              users={users}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        )}
      </main>

      {/* AI Assistant Button */}
      <motion.button
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-110 transition"
        onClick={() => setIsAIOpen(!isAIOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </motion.button>

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onCheckout={handleCheckout}
      />

      <Notification 
        message={notification.message} 
        isVisible={notification.isVisible}
        type={notification.type}
      />
    </div>
  );
}
