import React from "react";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ onClick, match }) {
  //   console.log(match);
  const onClickIMG = (data) => {
    onClick(data);
  };

  return (
    <ul className="ImageGallery">
      {match.map((image) => {
        return (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={onClickIMG}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;
