"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <div className="ml-72 mt-20">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(status)}</pre>
    </div>
  );
}
