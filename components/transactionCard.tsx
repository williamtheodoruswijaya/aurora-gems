"use client"
import { Transaction } from "@/types/types";

const TransactionCard: React.FC<Transaction> = ({
  buyer,
  diamond,
  price,
  transactionAt,
}) => {
    return (
      <div className="bg-white border border-gray-300 text-black p-4 rounded-lg shadow-md flex justify-between items-center">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-semibold">{buyer.username}</h3>
          <p className="text-sm text-gray-400">{transactionAt}</p>
          <p className="text-sm">
            <span className="font-bold">Diamond:</span> {diamond.type} ({diamond.weight} gram)
          </p>
          <p className="text-sm">
            <span className="font-bold">Price:</span> {price}
          </p>
        </div>
      </div>
    );
  };
  
  export default TransactionCard;
  