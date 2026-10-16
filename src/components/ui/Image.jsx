import React from "react";

// Assumes images are named consistently and located in your public/ directory
// e.g., /public/images/hero.avif, /public/images/hero.webp, etc.
const ResponsiveImage = ({ path,  alt, className }) => {

  return (
    <picture className={className}>
      <source srcSet={`${path}.avif`} type="image/avif" />
      <source srcSet={`${path}.webp`} type="image/webp" />
      <img src={`${path}.jpg`} alt={alt} loading="lazy" />
    </picture>
  );
};

export default ResponsiveImage;
