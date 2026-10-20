// ! internal imports
import Hero from "../components/sections/HomeHero.jsx";
import Occasions from "../components/sections/HomeOccasions.jsx";
import HowItWorks from "../components/sections/HomeHowItWorks.jsx";
import Packages from "../components/sections/HomePackages.jsx";
import Gallery from "../components/sections/HomeGallery.jsx";
import Contact from "../components/sections/HomeContact.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Occasions />
      <HowItWorks />
      <Packages />
      <Gallery />
      <Contact />
    </>
  );
}
