// src/App.js
import React, { useState, useEffect } from 'react';
import Gallery from './Components/Gallery/Gallery';
import Header from './Components/Header/Header';
import Wishlist from './Components/Wishlist/Wishlist';
import Loader from './Components/Loader/Loader';
import './App.css';

function App() {
  const [category, setCategory] = useState('all');
  const [showWishlist, setShowWishlist] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const openWishlist = () => {
    setShowWishlist(true);
  };

  const closeWishlist = () => {
    setShowWishlist(false);
  };

  useEffect(() => {
    // Simulate data loading with a delay (you can replace this with actual data fetching)
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate 2 seconds loading
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Initialize userLikes in local storage if it doesn't exist
    if (!localStorage.getItem('userLikes')) {
      localStorage.setItem('userLikes', JSON.stringify({}));
    }
  }, []);

  return (
    <div className="App">
      <Header onCategoryChange={handleCategoryChange} onWishlistClick={openWishlist} activeCategory={category} />
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <>
          <Gallery category={category} showWishlist={showWishlist} onCloseWishlist={closeWishlist} />
          {showWishlist && <Wishlist onClose={closeWishlist} />}
        </>
      )}
    </div>
  );
}

export default App;
