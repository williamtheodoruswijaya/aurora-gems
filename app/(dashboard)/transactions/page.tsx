"use client";
import TransactionCard from "@/components/transactionCard";
import { Transaction } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get("/api/transactions");
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransaction();
  }, []);

  return (
    <div className="flex h-screen text-white ml-64 mt-16 w-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-6 space-y-4 w-full">
          {transactions.length === 0 && (
            <div className="text-lg font-semibold text-gray-600">
              No Transaction yet.
            </div>
          )}
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
