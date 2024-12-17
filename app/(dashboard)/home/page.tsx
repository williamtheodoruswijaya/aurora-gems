"use client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = getServerSession(authOptions);
  console.log(session);
  return <div>Home</div>;
};

export default Home;
