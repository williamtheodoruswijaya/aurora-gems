"use client";

import { ReactNode, MouseEventHandler } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  }
  