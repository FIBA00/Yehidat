import backgrounds from "../../data/backgrounds.json";
import { toSrcSet } from "../../data/gallery";
import ResponsiveImage from "./Image";

// Blurred photo behind a section, with a light (or dark) overlay so content stays readable.
// Shows nothing if no photo exists for `name`, so the section keeps its solid colour.
// The file name decides the section: src/assets/backgrounds/hero.jpg -> name="hero".

const BY_NAME = Object.fromEntries(
  backgrounds.items.map((item) => [
    item.name,
    { avif: toSrcSet(item.avif), webp: toSrcSet(item.webp) },
  ]),
);

// The theme is dark: `gold-cream` is the dark surface colour, so these are dark veils.
// light = subtle (photo clearly visible), strong = heavier (for busy photos).
const OVERLAYS = {
  light: "bg-gold-cream/60",
  strong: "bg-gold-cream/85",
};

export default function SectionBackground({ name, overlay = "light" }) {
  const path = BY_NAME[name];
  if (!path) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <ResponsiveImage
        path={path}
        alt=""
        sizes="100vw"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className={`absolute inset-0 ${OVERLAYS[overlay]}`} />
    </div>
  );
}
