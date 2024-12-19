"use client";
import Image from "next/image";
import BackgroundGif from "@/public/assets/background-gif.gif";
import axios from "axios";
import { useEffect, useState } from "react";
import { Balance } from "@/types/types";

export default function Account() {
  const [balance, setBalance] = useState<Balance | null>(null);

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

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      
      <form className="form-content mt-10 min-w-[50vh] max-w-[50vh] rounded-md items-center justify-center bg-slate-900">
        <div>
          <Image src={BackgroundGif} alt="" className="w-full rounded-t-md" />
        </div>
        <div className="font-nunito text-xl pb-5 w-full text-center p-5 font-semibold">
          Add Payment Method
        </div>
        <div className="flex justify-center">
          <div className="justify-center w-11/12 rounded-md h-5 p-5 flex items-center bg-slate-950">Current Balance: ${balance?.balance}</div>
        </div>
      </form>
    </div>
  );
}
