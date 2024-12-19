"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import Modal from "@/components/modal";
import axios from "axios";
import { Diamond } from "@/types/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [isBuyer, setIsBuyer] = useState(true);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "SELLER") {
      setIsBuyer(false);
    }
  }, [status, session?.user?.role]);

  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const response = await axios.get("/api/diamonds");
        setDiamonds(response.data.data);
        if (response.status === 200) {
          toast({
            title: "Diamonds loaded successfully",
            description: "Happy shopping!",
            variant: "default",
          });
        }
        if (response.status === 404) {
          toast({
            title: "No diamonds found",
            description: "Please check back later.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiamonds();
  }, [diamonds.length, toast]);

  const handleViewDetails = (diamond: Diamond) => {
    setSelectedDiamond(diamond);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDiamond(null);
    setShowModal(false);
  };

  const handleBuyNow = async (id: number) => {
    try {
      const response = await axios.post(`/api/diamonds/${id}/purchase`);
      console.log(response);
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
    } finally {
      handleCloseModal();
    }
  };

  const handleAddToWishlist = async (id: number) => {
    try {
      const response = await axios.post(`/api/diamonds/${id}/create-wishlist`);
      if (response.status === 200) {
        toast({
          title: "Diamond added to wishlist",
          description: "You can view your wishlist in your profile.",
          variant: "default",
        });
      }
      if (response.status === 201) {
        toast({
          title: "Diamond already in wishlist",
          description: "You can view your wishlist in your profile.",
          variant: "default",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error adding diamond to wishlist",
          description:
            error.response?.data.message ||
            "An error occurred. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error adding diamond to wishlist",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="ml-60 p-8 min-h-screen">
      {!isBuyer && <h1 className="text-3xl font-bold">Your Items:</h1>}
      <div className="mb-6 mt-12 ml-2">
        <h1 className="text-3xl font-bold">Welcome to Aurora Gems</h1>
        <p className="mt-2">Discover our finest selection of diamonds.</p>
      </div>
      {diamonds.length === 0 ? (
        <p className="text-xl">No diamonds available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {diamonds.map((diamond) => (
            <Card
              key={diamond.id}
              name={diamond.name}
              price={diamond.price.toLocaleString()}
              description={diamond.type}
              onClick={() => handleViewDetails(diamond)} // Pass diamond data to modal
            />
          ))}
        </div>
      )}

      {showModal && selectedDiamond && (
        <Modal onClose={handleCloseModal}>
          <h2 className="dark:text-black text-white text-3xl font-bold mb-1">
            {selectedDiamond.name}
          </h2>
          <p className="dark:text-black text-white text-base">
            {selectedDiamond.type} - owned by{" "}
            {selectedDiamond.listedBy.username}
          </p>
          <p className="dark:text-black text-white text-sm">
            Weight: {selectedDiamond.weight} gram
          </p>

          <p className=" text-2xl mt-20 font-semibold text-purple-600">
            ${selectedDiamond.price.toLocaleString()}
          </p>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 min-w-32"
              onClick={() => handleBuyNow(selectedDiamond.id)}
            >
              Buy
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 min-w-32"
              onClick={() => handleAddToWishlist(selectedDiamond.id)}
            >
              Add to wishlist
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
