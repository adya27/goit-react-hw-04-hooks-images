import React from "react";

function ImageGalleryItem({ onClick, webformatURL, largeImageURL }) {
  const handleClick = (e) => {
    onClick(e.currentTarget.dataset.largesrc);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        onClick={handleClick}
        data-largesrc={largeImageURL}
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

export default ImageGalleryItem;
