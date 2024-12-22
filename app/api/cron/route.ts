import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const diamonds = await prisma.diamond.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        weight: true,
        price: true,
        listedById: true,
        listedBy: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
        createdAt: true,
      },
    });
    if (diamonds.length === 0) {
      return NextResponse.json(
        { messsage: "No diamonds found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Success", data: diamonds },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { diamonds: null, message: "Internal server error", error },
      { status: 500 }
    );
  }
};
