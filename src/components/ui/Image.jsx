import React from "react";

export default function ResponsiveImage({
  path,
  alt,
  className = "",
  loading = "lazy",
}) {
  if (!path) return null;

  return (
    <picture className={className}>
      {path.avif && (
        <source srcSet={path.avif} type="image/avif" />
      )}

      {path.webp && (
        <source srcSet={path.webp} type="image/webp" />
      )}

      <img
        src={path.webp || path.avif}
        alt={alt}
        loading={loading}
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
