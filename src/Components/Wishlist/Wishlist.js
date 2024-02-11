// Wishlist.js
import React, { useEffect, useState } from 'react';
import './Wishlist.css';

const Wishlist = ({ onClose }) => {
  const [wishlistImages, setWishlistImages] = useState([]);

  useEffect(() => {
    // Fetch liked images from local storage
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
    console.log('userLikes:', userLikes);
  
    // Filter out only liked images
    const likedImageIds = Object.keys(userLikes).filter((imageId) => userLikes[imageId]);
    console.log('likedImageIds:', likedImageIds);
  
    // Set wishlist images
    setWishlistImages(likedImageIds);
  }, []);
  

  return (
    <div className="wishlist-modal">
      <div className="wishlist-header">
        <h2>Favourites</h2>
        <button onClick={onClose}>&#10006;</button>
      </div>
      <hr className="horizontal-divider" />
      <div className="wishlist-grid">
        {wishlistImages.length === 0 ? (
          <p>Oops, let's try and like some images first</p>
        ) : (
          wishlistImages.map((imageId) => (
            <div key={imageId} className="wishlist-item">
              {/* Display wishlist images */}
              <img src={`https://source.unsplash.com/${imageId}/200x200`} alt={`Wishlist Image ${imageId}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
