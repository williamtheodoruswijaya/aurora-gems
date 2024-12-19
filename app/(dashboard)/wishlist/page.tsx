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
      try{
        const response = await axios.get("/api/wishlist");
        setWishlistItems(response.data.data);
      }
      catch(error){
        console.error(error);
      }
    }
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
      if(response.status === 200){
        toast({
          title: "Diamond purchased successfully",
          description: "Thank you for shopping with us!",
          variant: "default",
        })
      }
      else if(response.status === 400){
        toast({
          title: "Insufficient funds",
          description: "Please add more funds to your account.",
          variant: "destructive",
        })
      }
    }
    catch(error){
      console.error(error);
    }
  }

  const removeWishlist = async (id: number) => {
    try{
      const response = await axios.post("/api/wishlist/delete", { id });
      if(response.status === 200){
        toast({
          title: "Item removed from wishlist",
          description: "You can always add it back later.",
          variant: "default",
        })
      }
      const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
      setWishlistItems(updatedWishlist);
    }
    catch(error){
      console.error(error);
    }
  }

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
        {wishlistItems.map((item, index) => (
          <Card
            key={index}
            name={item.diamond.name}
            price={item.diamond.price.toLocaleString()}
            description={item.diamond.type}
            onClick={() => handleViewDetails(item)}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-black text-2xl font-bold mb-4">{selectedItem.diamond.name}</h2>
          <p className="text-black text-lg">{selectedItem.diamond.type}</p>
          <p className="text-black text-lg mt-2">${selectedItem.diamond.price.toLocaleString()}</p>
          <div className="flex space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 min-w-32"
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
