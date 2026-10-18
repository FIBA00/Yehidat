// ! internal imports
import Hero from "../components/sections/Hero.jsx";
import Occasions from "../components/sections/Occasions.jsx";
import HowItWorks from "../components/sections/HowItWorks.jsx";
import Packages from "../components/sections/Packages.jsx";
import Gallery from "../components/sections/Gallery.jsx";
import Contact from "../components/sections/Contact.jsx";

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
