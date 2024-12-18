"use client";

import { useState } from "react";
import Card from "@/components/card";
import Modal from "@/components/modal";

const wishlistItems = [
  { name: "Brilliant Cut Diamond", price: "$5,000", description: "0.5 carat, flawless clarity" },
  { name: "Oval Cut Diamond", price: "$15,000", description: "1.5 carat, VS1 clarity" },
];

export default function Wishlist() {
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  interface WishlistItem {
    name: string;
    price: string;
    description: string;
  }

  const handleViewDetails = (item: WishlistItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <div className="ml-60 p-8 min-h-screen">
      {/* Title Section */}
      <div className="mb-6 mt-12 ml-2">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <p className="mt-2">Here are the items you have saved for later.</p>
      </div>
      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistItems.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            onClick={() => handleViewDetails(item)}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
          <p className="text-lg">{selectedItem.description}</p>
          <p className="text-lg font-semibold mt-2">{selectedItem.price}</p>
          <div className="flex space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => alert("Proceeding to buy!")}
            >
              Buy Now
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => alert("Removed from wishlist!")}
            >
              Remove
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
