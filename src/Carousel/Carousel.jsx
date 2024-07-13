import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";

export default function Carousel({ children }) {
  const currentIndex = useRef(0);
  const timerId = useRef(null);
  const carouselRef = useRef(null);
  const itemCount = 5;

  function move(prvs, isButtonClick = false) {
    let to;
    if (prvs) {
      to = (currentIndex.current + itemCount - 1) % itemCount;
    } else {
      to = (currentIndex.current + 1) % itemCount;
    }
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = carouselRef.current?.clientWidth * to;
    }
    currentIndex.current = to;
    if (isButtonClick) {
      clearInterval(timerId.current);
      timerId.current = setInterval(() => {
        move(prvs, false);
      }, 3000);
    }
  }

  useEffect(() => {
    timerId.current = setInterval(() => {
      move(false);
    }, 3000);

    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <div className="relative w-full h-screen max-h-screen overflow-x-hidden">
      <div
        ref={carouselRef}
        className="flex w-screen h-full overflow-hidden scroll-smooth snap-mandatory snap-x no-scrollbar relative pointer-events-none"
      >
        {children}
      </div>
      <button
        className="rounded-full p-3 aspect-square  bg-primary-700/95 transition-colors duration-300 hover:bg-primary-600/90 cursor-pointer absolute top-1/2 left-4 z-10 -translate-y-full md:-translate-y-1/2 md:scale-100 scale-75"
        onClick={() => move(true, true)}
      >
        <ChevronLeft size={32} className="text-primary-50" color="white" />
      </button>

      <button
        className=" rounded-full p-3 aspect-square  bg-primary-700/95 transition-colors duration-300 hover:bg-primary-600/90 cursor-pointer absolute top-1/2 right-4 z-10 -translate-y-full md:-translate-y-1/2 md:scale-100 scale-75"
        onClick={() => move(false, true)}
      >
        <ChevronRight size={32} className="text-primary-50" color="white" />
      </button>
    </div>
  );
}
