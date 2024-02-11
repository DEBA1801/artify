import React, { useState, useEffect } from 'react';
import ImageDetails from '../ImageDetails/ImageDetails';
import './Gallery.css';



const Gallery = ({ category }) => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      let url = 'https://api.unsplash.com/photos';

      if (category !== 'all') {
        url = `https://api.unsplash.com/search/photos?query=${category}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: 'Client-ID 2PsKdCcv03KA2yQH0w-OmZHQrO68YaJsOiJ6wCGdHgE',
        },
      });

      const data = await response.json();

      if (category !== 'all') {
        setImages(data.results);
      } else {
        setImages(data);
      }
    };

    fetchImages();
  }, [category]);

  useEffect(() => {
    // Retrieve liked images from local storage
    const storedLikedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
    setLikedImages(storedLikedImages);
  }, []);

  const handleLikeToggle = async (imageId) => {
    // Retrieve user likes from local storage
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
  
    // Toggle like status for the clicked image across categories
    userLikes[imageId] = !userLikes[imageId];
  
    // Update local storage with the modified like status
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
  
    // Retrieve liked images from local storage
    const storedLikedImages = Object.keys(userLikes).filter((id) => userLikes[id]);
    setLikedImages(storedLikedImages);
  
    // Update state to trigger re-render
    setImages((prevImages) =>
      prevImages.map((image) => ({
        ...image,
        liked: userLikes[image.id] || false,
      }))
    );
  };

  const openDetailsOverlay = (image) => {
    setSelectedImage(image);
  };

  const closeDetailsOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-container">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              onClick={() => openDetailsOverlay(image)}
            />
            <div
              className={`like-button ${likedImages.includes(image.id) ? 'liked' : ''}`}
              onClick={() => handleLikeToggle(image.id)}
            >
              &#10084; {/* Heart emoji */}
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageDetails image={selectedImage} onClose={closeDetailsOverlay} />
      )}
    </div>
  );
};

export default Gallery;
