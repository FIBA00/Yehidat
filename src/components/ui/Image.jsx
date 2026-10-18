import { useState } from "react";

/**
 * ResponsiveImage
 *
 * Renders a <picture> with AVIF → WebP → PNG sources, falling back to a
 * plain <img> when a format is missing or fails to load.
 *
 * `path` accepts either:
 *   - a plain URL string:  "/images/webp/hero.webp"
 *   - an object of formats, each value either a plain URL or a srcset string:
 *       {
 *         avif: "/images/avif/hero-480w.avif 480w, /images/avif/hero.avif 1200w",
 *         webp: "/images/webp/hero-480w.webp 480w, /images/webp/hero.webp 1200w",
 *         png:  "/images/hero.png",
 *       }
 *
 * `sizes` tells the browser how wide the image is drawn at each viewport,
 * so it can pick the smallest candidate that is still sharp. Without it the
 * browser assumes 100vw, which downloads larger files than needed for
 * images in a column or grid. Example for a half-width column on desktop:
 *   sizes="(min-width: 1024px) 50vw, 100vw"
 *
 * Pass `width` and `height` (intrinsic pixel size of the largest file) when
 * you know them, so the browser reserves space and avoids layout shift.
 *
 * Pass `loading="eager"` and `fetchPriority="high"` only for the one image
 * that is the Largest Contentful Paint (usually the hero). Everything else
 * stays lazy.
 */

// Returns the last (largest) URL from a srcset string, or the plain string.
function largestUrl(value) {
  if (!value) return null;
  const last = value.split(",").pop().trim();
  return last.split(/\s+/)[0];
}

export default function ResponsiveImage({
  path,
  alt = "",
  className = "",
  loading = "lazy",
  fetchPriority,
  sizes = "100vw",
  width,
  height,
}) {
  const [useFallback, setUseFallback] = useState(false);

  if (!path) return null;

  // Plain URL: no <picture> needed.
  if (typeof path === "string") {
    return (
      <img
        src={path}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        width={width}
        height={height}
        className={`${className} object-cover`}
      />
    );
  }

  const { avif, webp, png } = path;
  if (!avif && !webp && !png) return null;

  // Use the best available format's srcset (or URL) for the <img> itself.
  const imgSet = webp || avif || png;
  const fallbackSrc = largestUrl(imgSet);

  if (useFallback && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        width={width}
        height={height}
        className={`${className} object-cover`}
      />
    );
  }

  return (
    <picture className={`block ${className}`}>
      {avif && <source srcSet={avif} sizes={sizes} type="image/avif" />}
      {webp && <source srcSet={webp} sizes={sizes} type="image/webp" />}
      {png && <source srcSet={png} sizes={sizes} type="image/png" />}
      <img
        src={fallbackSrc}
        srcSet={imgSet.includes(" ") ? imgSet : undefined}
        sizes={imgSet.includes(" ") ? sizes : undefined}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        width={width}
        height={height}
        onError={() => {
          if (fallbackSrc && !useFallback) setUseFallback(true);
        }}
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
