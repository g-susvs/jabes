import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SlOptionsVertical } from "react-icons/sl";

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const menu = (
    <div
      ref={menuRef}
      style={{ top: coords.top, left: coords.left }}
      className="absolute z-50 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1">
        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Perfil
        </button>
        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Configuración
        </button>
        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
           <SlOptionsVertical />
      </button>
      {isOpen && createPortal(menu, document.body)}
    </div>
  );
};
