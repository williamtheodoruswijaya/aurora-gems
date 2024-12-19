"use client";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { Wishlist } from "@/types/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function WishlistPage() {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<Wishlist | null>(null);
  const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/api/wishlist");
        setWishlistItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, []);

  const handleViewDetails = (item: Wishlist) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleBuyNow = async (id: number) => {
    try {
      const response = await axios.post(`/api/diamonds/${id}/purchase`);
      if (response.status === 200) {
        toast({
          title: "Diamond purchased successfully",
          description: "Thank you for shopping with us!",
          variant: "default",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error purchasing diamond",
          description:
            error.response?.data.message ||
            "An error occurred. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error purchasing diamond",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const removeWishlist = async (id: number) => {
    try {
      const response = await axios.post("/api/wishlist/delete", { id });
      if (response.status === 200) {
        toast({
          title: "Item removed from wishlist",
          description: "You can always add it back later.",
          variant: "default",
        });
      }
      const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
      setWishlistItems(updatedWishlist);
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="ml-64 overflow-y-auto p-8 min-h-screen">
      {/* Title Section */}
      <div className="mb-6 mt-12">
        {wishlistItems.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            Your wishlist is empty...
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Your Wishlist</h1>
            <p className="mt-2">Here are the items you have saved for later.</p>
          </>
        )}
      </div>
      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            name={item.diamond.name}
            price={item.diamond.price.toLocaleString()}
            description={item.diamond.type}
            onClick={() => handleViewDetails(item)}
          />
        ))}
      </div>
      {showModal && selectedItem && (
        <Modal onClose={handleCloseModal}>
          <h2 className="dark:text-black text-white text-3xl font-bold mb-1">
            {selectedItem.diamond.name}
          </h2>
          <p className="dark:text-black text-white text-base">
            {selectedItem.diamond.type} - owned by{" "}
            {selectedItem.diamond.listedBy.username}
          </p>
          <p className="dark:text-black text-white text-sm">
            Weight: {selectedItem.diamond.weight} gram
          </p>
          <p className=" text-2xl mt-10 font-semibold text-purple-600">
            ${selectedItem.diamond.price.toLocaleString()}
          </p>
          <div className="flex space-x-4 mt-2">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 min-w-32"
              onClick={() => handleBuyNow(selectedItem.diamond.id)}
            >
              Buy
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 min-w-32"
              onClick={() => removeWishlist(selectedItem.id)}
            >
              Remove
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
