"use client";

import { ReactNode, MouseEventHandler } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function AddModal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-cover rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="absolute inset-0 bg-black dark:bg-white rounded-lg z-0"></div>
        <div
          className="absolute inset-0 bg-white rounded-lg z-0"
          style={{ filter: "blur(5px)" }}
        ></div>

        <div className="relative z-10">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
