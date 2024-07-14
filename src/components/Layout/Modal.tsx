import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Prop {
  children: React.ReactNode;
}
const Modal = ({ children }: Prop) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);
      return () => {
        if (modalRoot && elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
      };
    }
  }, []);

  return createPortal(
    <div className="h-screen w-screen bg-transparent absolute backdrop-filter backdrop-blur-xl z-10">
      <div className="absolute top-1/2 left-1/2  bg-orange-50 z-10 -translate-y-1/2 -translate-x-1/2  shadow-black shadow-lg flex items-center justify-center">
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
