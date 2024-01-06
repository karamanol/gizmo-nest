import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import SpinnerCircle from "./SpinnerCircle";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded shadow-lg max-w-[90%]">
            {/* close button */}
            <button
              aria-label="Close modal"
              className="absolute z-50 top-4 right-4 text-gray-100  hover:text-gray-500 transition-colors"
              onClick={() => setIsOpen(false)}>
              <span className="text-8xl ">&times;</span>
            </button>

            {/* modal content */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
