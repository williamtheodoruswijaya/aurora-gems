import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const randomUsername = `user_${Date.now()}`;
    const randomEmail = `user${Date.now()}@gmail.com`;
    const randomPassword = `password_${Math.random().toString(36).slice(-8)}`;

    const newUser = await prisma.user.create({
      data: {
        username: randomUsername,
        email: randomEmail,
        password: randomPassword,
        role: "BUYER",
      },
    });
    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        user: null,
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};
