import React from "react";
import { useState } from "react";

export default function ResponsiveImage({
  path,
  alt,
  className = "",
  loading = "lazy",
}) {
  const [useFallback, setUseFallback] = useState(false);

  if (!path) return null;

  if (typeof path === "string") {
    return (
      <img
        src={path}
        alt={alt}
        loading={loading}
        className={`${className} object-cover`}
      />
    );
  }

  const imagePath = path || {};
  if (!imagePath.avif && !imagePath.webp && !imagePath.png) return null;
  const fallbackSrc = imagePath.webp || imagePath.avif || imagePath.png;

  if (useFallback && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        className={`${className} object-cover`}
      />
    );
  }

  return (
    <picture className={className}>
      {imagePath.avif && <source srcSet={imagePath.avif} type="image/avif" />}
      {imagePath.webp && <source srcSet={imagePath.webp} type="image/webp" />}
      {imagePath.png && <source srcSet={imagePath.png} type="image/png" />}
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        onError={() => {
          if (fallbackSrc && !useFallback) setUseFallback(true);
        }}
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
