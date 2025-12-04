"use client";

import { clsx } from "@/libs/clsx";
import { useState, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className={"fixed inset-0 z-[1000] flex items-center justify-center"}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className={clsx(
          "bg-white rounded-md p-6 w-full max-w-md shadow-lg relative z-10",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
