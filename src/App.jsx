import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import LocaleRoute from "./components/LocaleRoute";
import Home from "./pages/Home";

// Language is part of the URL: / is English, /am/ Amharic, /om/ Afaan Oromo.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LocaleRoute locale="en"><Home /></LocaleRoute>} />
          <Route path="/am/*" element={<LocaleRoute locale="am"><Home /></LocaleRoute>} />
          <Route path="/om/*" element={<LocaleRoute locale="oro"><Home /></LocaleRoute>} />
          <Route path="*" element={<LocaleRoute locale="en"><Home /></LocaleRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
