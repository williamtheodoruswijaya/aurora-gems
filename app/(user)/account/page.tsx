"use client";
import Image from "next/image";
import BackgroundGif from "@/public/assets/background-gif.gif";
import axios from "axios";
import { useEffect, useState } from "react";
import { Balance } from "@/types/types";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const balanceSchema = z.object({
  balance: z.number().int("Amount must be an integer"),
});

export default function Account() {
  const { toast } = useToast();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("/api/balance");
        setBalance(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, []);

  const handleTopUp = async (values: z.infer<typeof balanceSchema>) => {
    if (isNaN(values.balance)) {
      return toast({
        title: "Balance must be a number",
        variant: "destructive",
      });
    }

    const parsedData = balanceSchema.parse({
      balance: Number(values.balance),
    });
    
    if (parseInt(topUpAmount) <= 0) {
      alert("Please enter a valid top-up amount.");
      return;
    }

    try {
      const response = await axios.post("/api/topup", {
        balance: parsedData.balance,
      });

      console.log(response);

    } catch (error) {
      console.error(error);
      alert("Failed to top up balance. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen items-center justify-center flex">

      <form className="form-content mt-10 min-w-[50vh] max-w-[50vh] rounded-md items-center justify-center bg-slate-900">
        <div>
          <Image src={BackgroundGif} alt="" className="w-full rounded-t-md" />
        </div>
        <div className="font-nunito text-xl pb-5 w-full text-center p-5 font-semibold">
          Add Payment Method
        </div>
        <div className="flex justify-center space-x-3">
          <div className="justify-center w-11/12 rounded-md h-5 p-5 flex items-center bg-slate-950">Current Balance: ${balance?.balance}</div>
        </div>
        <div className="flex justify-center space-x-5">
        <div className="justify-center w-11/12 rounded-md h-5 p-5 flex items-center bg-slate-950 space-x-4">
        <div className="block font-medium text-white">Add Balance:</div>
              <input
                type="number"
                name="balance"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-40 border rounded bg-white text-black"
                required
              />
            </div>
        </div>
        <div className="flex justify-center space-x-5">
          <div className="justify-center w-11/12 rounded-md h-5 p-5 flex items-center bg-slate-950">
          <button className="bg-slate-800 text-white rounded-md p-1 w-80" onClick={() => handleTopUp({ balance: parseInt(topUpAmount) })}>
            Top up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
