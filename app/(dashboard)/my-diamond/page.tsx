"use client";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import Modal from "@/components/modal";
import AddModal from "@/components/addmodal";
import { Diamond } from "@/types/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { useSession } from "next-auth/react";

const diamondSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.string().min(1, "Type is required").max(100),
  weight: z.number().min(1, "Weight is required"),
  price: z.number().min(1, "Price is required"),
  listedById: z.number().int("ListedById must be an integer"),
});

export default function MyDiamonds() {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<Diamond | null>(null);
  const [myDiamondsItems, setMyDiamondsItems] = useState<Diamond[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDiamondName, setNewDiamondName] = useState("");
  const [newDiamondType, setNewDiamondType] = useState("");
  const [newDiamondWeight, setNewDiamondWeight] = useState("");
  const [newDiamondPrice, setNewDiamondPrice] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const response = await axios.get("/api/diamonds/read-by-userid");
        setMyDiamondsItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiamonds();
  }, []);

  const handleViewDetails = (item: Diamond) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    setShowAddModal(false);
  };

  const handleFormSubmit = async (values: z.infer<typeof diamondSchema>) => {
    try {
      if (isNaN(values.weight) || isNaN(values.price)) {
        return toast({
          title: "Weight and Price must be a number",
          variant: "destructive",
        });
      }

      if (status !== "authenticated") {
        return toast({
          title: "You must be logged in to add a diamond",
          variant: "destructive",
        });
      }

      const parsedData = diamondSchema.parse({
        name: values.name,
        type: values.type,
        weight: Number(values.weight),
        price: Number(values.price),
        listedById: values.listedById,
      });

      const response = await axios.post("/api/diamonds/create", {
        name: parsedData.name,
        type: parsedData.type,
        weight: parsedData.weight,
        price: parsedData.price,
        listedById: parsedData.listedById,
      });

      if (response.status === 200) {
        toast({
          title: "Diamond added successfully",
          variant: "default",
        });
        setShowAddModal(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="ml-64 overflow-y-auto p-8 min-h-screen w-screen">
      {/* Title Section */}
      <div className="mb-6 mt-12">
        {myDiamondsItems.length === 0 ? (
          <div className="flex flex-row items-center justify-between">
            <div className="text-center text-lg font-semibold text-gray-600">
              You don’t own any diamonds...
            </div>
            <div className="ml-auto">
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowAddModal(true)}
              >
                Add Diamond
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Diamond</h1>
              <p className="mt-2">Here are the diamonds you have bought.</p>
            </div>
            <div>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowAddModal(true)}
              >
                Add Diamond
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Diamonds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {myDiamondsItems.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            price={item.price.toLocaleString()}
            description={item.type}
            onClick={() => handleViewDetails(item)}
          />
        ))}
      </div>
      {/* View Details Modal */}
      {showModal && selectedItem && (
        <Modal onClose={handleCloseModal}>
          <h2 className="dark:text-black text-white text-3xl font-bold mb-1">
            {selectedItem.name}
          </h2>
          <p className="dark:text-black text-white text-base">
            {selectedItem.type} - owned by {selectedItem.listedBy.username}
          </p>
          <p className="dark:text-black text-white text-sm">
            Weight: {selectedItem.weight} gram
          </p>
          <p className="text-2xl mt-10 font-semibold text-purple-600">
            ${selectedItem.price.toLocaleString()}
          </p>
        </Modal>
      )}
      {/* Add Diamond Modal */}
      {showAddModal && (
        <AddModal onClose={handleCloseModal}>
          <h2 className="text-2xl font-bold mb-4 text-black">
            Add a New Diamond
          </h2>
          <form className="space-y-4">
            <div>
              <div className="block font-medium text-gray-700">Name</div>
              <input
                type="text"
                name="name"
                value={newDiamondName}
                onChange={(e) => setNewDiamondName(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                required
              />
            </div>
            <div>
              <div className="block font-medium text-gray-700">Type</div>
              <input
                type="text"
                name="type"
                value={newDiamondType}
                onChange={(e) => setNewDiamondType(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                required
              />
            </div>
            <div>
              <div className="block font-medium text-gray-700">
                Weight (gram)
              </div>
              <input
                type="number"
                name="weight"
                value={newDiamondWeight}
                onChange={(e) => setNewDiamondWeight(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                required
              />
            </div>
            <div>
              <div className="block font-medium text-gray-700">Price ($)</div>
              <input
                type="number"
                name="price"
                value={newDiamondPrice}
                onChange={(e) => setNewDiamondPrice(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              {session && session.user && session.user.id ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
                  onClick={() =>
                    handleFormSubmit({
                      name: newDiamondName,
                      type: newDiamondType,
                      weight: parseFloat(newDiamondWeight),
                      price: parseInt(newDiamondPrice, 10),
                      listedById: parseInt(session.user.id, 10),
                    })
                  }
                >
                  Add
                </button>
              ) : null}
            </div>
          </form>
        </AddModal>
      )}
    </div>
  );
}
