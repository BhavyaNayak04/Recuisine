import { AlignJustifyIcon, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [toggle, setToggle] = useState("close");

  return (
    <>
      <nav className="hidden sm:flex flex-row justify-between items-center p-5 bg-orange-700 text-white fixed w-full z-10 font-bold">
        <div>
          <a href="/">
            <span className="text-2xl">R</span>ecuisine
          </a>
        </div>
        <div className="space-x-9">
          <a
            href="/search"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Search
          </a>
          <a
            href="/donate"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Donate
          </a>
          <a
            href="/about"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            About
          </a>
          <a
            href="/profile"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Profile
          </a>
        </div>
      </nav>
      <div
        className={`fixed right-0 top-0 h-screen w-3/5 bg-orange-700 z-20 transition-transform duration-500 ease-in-out ${
          toggle === "open" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-3 right-3"
          onClick={() => setToggle("close")}
        >
          <X color="white" />
        </button>
        <nav className="flex flex-col justify-center items-center h-full text-white font-extrabold">
          <a
            href="/"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Home
          </a>
          <a
            href="/search"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Search
          </a>
          <a
            href="/donate"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Donate
          </a>
          <a
            href="/about"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            About
          </a>
          <a
            href="/profile"
            className="hover:bg-orange-500 p-2 rounded-lg transition-all"
          >
            Profile
          </a>
        </nav>
      </div>
      <nav className="flex p-3 justify-between sm:hidden bg-orange-600 backdrop-opacity-65 fixed w-full z-10">
        <a className="text-white text-extrabold" href="/">
          Recuisine
        </a>
        <button onClick={() => setToggle("open")}>
          <AlignJustifyIcon color="white" />
        </button>
      </nav>
    </>
  );
}
