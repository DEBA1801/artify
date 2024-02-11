import React from 'react';
import './Header.css';

const Header = ({ onCategoryChange, onWishlistClick, activeCategory }) => {
  const categories = ['Dogs', 'Cats', 'Lions', 'Tigers', 'Snakes'];

  return (
    <div className ="header-container">
      <header className="Header">
        <div className="logo-container">
          <h2 alt="Logo" className="logo">
            Artify
          </h2>
        </div>
        <div className="buttons-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={activeCategory === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
          
          <button onClick={onWishlistClick} className="wishlist-button">
            Favourites
            <span role="img" aria-label="heart-icon">❤️</span>
          </button>
        </div>
      </header>
      <hr className="horizontal-divider" />
    </div>
  );
};

export default Header;
