"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isBuyer, setIsBuyer] = useState(true);
  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "SELLER") {
      setIsBuyer(false);
    }
  }, [status, session?.user.role]);

  return (
    <div className="ml-72 mt-20">
      {!isBuyer && <h1 className="text-3xl font-bold">Your Items:</h1>}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(status)}</pre>
    </div>
  );
}
