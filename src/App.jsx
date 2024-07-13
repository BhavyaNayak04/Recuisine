import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Hero/Hero";
import Search from "./Search/Search";
import Inquire from "./Inquire/Inquire";
import Donate from "./Donate/Donate";
import About from "./About/About";
import Profile from "./Profile/Profile";

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
