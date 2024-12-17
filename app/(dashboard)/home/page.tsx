import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);

  console.log(session); // This will log the session on the server

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Home;
