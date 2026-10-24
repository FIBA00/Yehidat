import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ! internal imports
import Hero from "../components/sections/HomeHero.jsx";
import Occasions from "../components/sections/HomeOccasions.jsx";
import HowItWorks from "../components/sections/HomeHowItWorks.jsx";
import Packages from "../components/sections/HomePackages.jsx";
import Gallery from "../components/sections/HomeGallery.jsx";
import FAQ from "../components/sections/HomeFAQ.jsx";
import Contact from "../components/sections/HomeContact.jsx";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Occasions />
      <HowItWorks />
      <Packages />
      <Gallery />
      <FAQ />
      <Contact />
    </>
  );
}
