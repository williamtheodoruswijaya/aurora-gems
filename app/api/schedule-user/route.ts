import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const randomUsername = `user_${Date.now()}`;
    const randomEmail = `user${Date.now()}@example.com`;
    const randomPassword = `password_${Math.random().toString(36).slice(-8)}`;

    const newUser = await prisma.user.create({
      data: {
        username: randomUsername,
        email: randomEmail,
        password: randomPassword,
        role: "BUYER",
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

export default handler;
