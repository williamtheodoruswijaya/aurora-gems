"use client";
import { CardProps } from "@/types/types";
import { FC } from "react";

const Card: FC<CardProps> = ({ name, price, description, onClick }) => {
  return (
    <div className="dark:bg-white bg-black shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold dark:text-gray-800 text-white">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="ml-4">
        <span className="text-xl font-bold text-purple-500">${price}</span>
      </div>
      <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200" onClick={onClick}>
        View Details
      </button>
    </div>
  );
};

export default Card;
