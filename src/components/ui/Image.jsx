import { useState } from "react";

export default function ResponsiveImage({
  path,
  alt,
  className = "",
  loading = "lazy",
}) {
  const [useFallback, setUseFallback] = useState(false);

  if (!path || (!path.avif && !path.webp)) return null;

  const fallbackSrc = path.avif && path.webp ? path.webp : undefined;

  if (useFallback && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        className={`${className} w-full h-full object-cover`}
      />
    );
  }

  return (
    <picture className={className}>
      {path.avif && <source srcSet={path.avif} type="image/avif" />}
      {path.webp && <source srcSet={path.webp} type="image/webp" />}
      <img
        src={path.webp || path.avif}
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
