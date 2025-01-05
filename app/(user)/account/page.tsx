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
    const parsedData = balanceSchema.safeParse({
      balance: Number(values.balance),
    });

    if (!parsedData.success) {
      return toast({
        title: "Balance must be a valid number",
        variant: "destructive",
        description: parsedData.error.issues[0].message,
      });
    }

    try {
      const response = await axios.post("/api/topup", {
        userId: balance?.userId,
        amount: values.balance,
      });
      setBalance(response.data.data);
      toast({
        title: "Top-up successful",
        description: "Your balance has been updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to top-up",
        variant: "destructive",
        description: "An unknown error occurred.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (parseInt(topUpAmount) <= 0) {
      toast({
        title: "Invalid amount",
        variant: "destructive",
        description: "Please enter a valid top-up amount greater than 0.",
      });
      return;
    }
    handleTopUp({ balance: parseInt(topUpAmount) });
  };

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <form
        onSubmit={handleSubmit}
        className="form-content mt-10 min-w-[50vh] max-w-[50vh] rounded-md items-center justify-center bg-slate-900"
      >
        <div>
          <Image src={BackgroundGif} alt="" className="w-full rounded-t-md" />
        </div>
        <div className="font-nunito text-xl w-full text-center pt-5 font-semibold">
          Add Payment Method
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-5">
          <div className=" flex-col justify-center w-11/12 rounded-md h-5 p-5 flex bg-slate-950">
            Current Balance: ${balance?.balance}
          </div>
          <input
            type="number"
            name="balance"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            className="flex-col justify-center w-11/12 rounded-md h-5 p-5 flex items-center bg-slate-950"
            required
            placeholder="Top-up Amount"
          />
          <button
            type="submit" // Use "submit" to tie it to the form
            className="flex-col justify-center w-11/12 rounded-md p-2 flex items-center bg-slate-800"
          >
            Top up
          </button>
        </div>
      </form>
    </div>
  );
}
