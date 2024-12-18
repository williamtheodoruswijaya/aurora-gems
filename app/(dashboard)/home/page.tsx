"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import Modal from "@/components/modal";

const diamonds = [
  { name: "Brilliant Cut Diamond", price: "$5,000", description: "0.5 carat, flawless clarity" },
  { name: "Prince Cut Diamond", price: "$8,000", description: "0.75 carat, VVS2 clarity" },
  { name: "Emerald Cut Diamond", price: "$12,000", description: "1 carat, color D" },
  { name: "Oval Cut Diamond", price: "$15,000", description: "1.5 carat, VS1 clarity" },
  { name: "Cushion Cut Diamond", price: "$20,000", description: "2 carat, brilliant shine" },
  { name: "Brilliant Cut Diamond", price: "$5,000", description: "0.5 carat, flawless clarity" },
  { name: "Prince Cut Diamond", price: "$8,000", description: "0.75 carat, VVS2 clarity" },
  { name: "Emerald Cut Diamond", price: "$12,000", description: "1 carat, color D" },
  { name: "Oval Cut Diamond", price: "$15,000", description: "1.5 carat, VS1 clarity" },
  { name: "Cushion Cut Diamond", price: "$20,000", description: "2 carat, brilliant shine" },
];

export default function Home() {
  const { data: session, status } = useSession();
  const [isBuyer, setIsBuyer] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<{ name: string; price: string; description: string } | null>(null); // Track selected diamond
  const [showModal, setShowModal] = useState(false); // Manage modal visibility

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "SELLER") {
      setIsBuyer(false);
    }
  }, [status, session?.user?.role]);

  const handleViewDetails = (diamond: { name: string; price: string; description: string }) => {
    setSelectedDiamond(diamond);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDiamond(null);
    setShowModal(false);
  };

  return (
    <div className="ml-60 p-8 min-h-screen">
      {!isBuyer && <h1 className="text-3xl font-bold">Your Items:</h1>}
      <div className="mb-6 mt-12 ml-2">
        <h1 className="text-3xl font-bold">Welcome to Aurora Gems</h1>
        <p className="mt-2">Discover our finest selection of diamonds.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {diamonds.map((diamond, index) => (
          <Card
            key={index}
            name={diamond.name}
            price={diamond.price}
            description={diamond.description}
            onClick={() => handleViewDetails(diamond)} // Pass diamond data to modal
          />
        ))}
      </div>

      {/* Modal for Viewing Details */}
      {showModal && selectedDiamond && (
        <Modal  onClose={handleCloseModal}>
          <h2 className="text-black text-2xl font-bold mb-4">{selectedDiamond.name}</h2>
          <p className="text-black text-lg">{selectedDiamond.description}</p>
          <p className="text-black text-lg mt-2">{selectedDiamond.price}</p>
          <div className="flex space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => alert("Added to wishlist!")}
            >
              Add to Wishlist
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => alert("Proceeding to buy!")}
            >
              Buy Now
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
