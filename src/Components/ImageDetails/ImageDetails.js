import React from 'react';
import './ImageDetails.css';

const ImageDetails = ({ image, onClose }) => {
  return (
    <div className="image-details-overlay">
      <div className="image-details-container">
        <button className="close-button" onClick={onClose}>
          &times; {/* Close icon */}
        </button>
        <div class="image-container">
            <img src={image.urls.regular} alt={image.alt_description} className="big-image" />
        </div>
        <div className="image-details">
            <div class="author">
                <div class="author-name">
                  <p><strong>Artist: {image.user.name}</strong></p>
                </div>
                <div class="image-likes">
                  <p> &#x2665; {image.likes}</p>
                </div>
            </div>
          <p class="image-desc">{image.description}</p>
          {image.tags && image.tags.length > 0 && (
            <p class="image-tags">
              Tags: {image.tags.map((tag) => tag.title).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
