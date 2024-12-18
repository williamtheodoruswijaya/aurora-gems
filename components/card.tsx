"use client";
import { FC } from "react";

interface CardProps {
  name: string;
  price: string;
  description: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ name, price, description, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Placeholder for Image */}
      <div className="h-40 bg-gray-200 flex justify-center items-center">
        <span className="text-gray-500 text-sm">Diamond Image</span>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-3">
          <span className="text-xl font-bold text-purple-500">{price}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-4 border-t border-gray-200" onClick={onClick}>
        <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200">
          View Details
        </button>
      </div>

    </div>
    
  );
};

export default Card;
