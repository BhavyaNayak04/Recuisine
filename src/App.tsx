import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Search from "./components/Search/Search";
import Inquire from "./components/Inquire/Inquire";
import Donate from "./components/Donate/Donate";
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="relative w-full h-full">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/search" element={<Search />} />
          <Route path="/inquire/:id" element={<Inquire />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
