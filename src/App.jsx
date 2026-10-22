import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sections/HomeNavbar.jsx";
import Footer from "./components/sections/HomeFooter.jsx";
import LocaleRoute from "./components/LocaleRoute.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Gallery from "./pages/Gallery.jsx"

// Language is part of the URL: / is English, /am/ Amharic, /om/ Afaan Oromo.
// Every page exists in all three languages.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LocaleRoute locale="en"><Home /></LocaleRoute>} />
          <Route path="/about-us" element={<LocaleRoute locale="en" page="/about-us"><AboutUs /></LocaleRoute>} />
          <Route path="/gallery" element={<LocaleRoute locale="en" page="/gallery"><Gallery /></LocaleRoute>} />
          <Route path="/am/about-us" element={<LocaleRoute locale="am" page="/about-us"><AboutUs /></LocaleRoute>} />
          <Route path="/om/about-us" element={<LocaleRoute locale="oro" page="/about-us"><AboutUs /></LocaleRoute>} />
          <Route path="/am/gallery" element={<LocaleRoute locale="am" page="/gallery"><Gallery /></LocaleRoute>} />
          <Route path="/om/gallery" element={<LocaleRoute locale="oro" page="/gallery"><Gallery /></LocaleRoute>} />
          <Route path="/am/*" element={<LocaleRoute locale="am"><Home /></LocaleRoute>} />
          <Route path="/om/*" element={<LocaleRoute locale="oro"><Home /></LocaleRoute>} />
          <Route path="*" element={<LocaleRoute locale="en"><Home /></LocaleRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
