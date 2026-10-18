import { Routes, Route } from "react-router-dom";


// ! Internal imports
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";
import LocaleRoute from "./components/LocaleRoute.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";


// Language is part of the URL: / is English, /am/ Amharic, /om/ Afaan Oromo.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LocaleRoute locale="en"><Home /></LocaleRoute>} />
          <Route path="/about-us" element={<LocaleRoute locale="en"><AboutUs /></LocaleRoute>} />
          <Route path="/am/*" element={<LocaleRoute locale="am"><Home /></LocaleRoute>} />
          <Route path="/om/*" element={<LocaleRoute locale="oro"><Home /></LocaleRoute>} />
          <Route path="*" element={<LocaleRoute locale="en"><Home /></LocaleRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
