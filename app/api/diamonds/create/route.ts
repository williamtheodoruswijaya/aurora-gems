import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const diamondSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.string().min(1, "Type is required").max(100),
  weight: z.number().positive("Weight must be positive"),
  price: z.number().positive("Price must be positive"),
  listedById: z.number().int("ListedById must be an integer"),
});

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  // step 0: check if user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // step 1: change listedById with session.user.id
  try {
    const body = await req.json();
    const { name, type, weight, price, listedById } = diamondSchema.parse(body);

    // Check if user that listed the diamond exists
    const userExists = await prisma.user.findUnique({
      where: { id: listedById },
    });
    if (!userExists) {
      return NextResponse.json(
        { message: "User not found", diamond: null },
        { status: 404 }
      );
    }

    // Check if user already have balance
    const userBalance = await prisma.balance.findFirst({
      where: { userId: listedById },
    });
    // if user doesn't have balance, create one
    if (!userBalance) {
      await prisma.balance.create({
        data: {
          userId: listedById,
          balance: 0,
        },
      });
    }

    // small validation if user is trying to spam the system
    const userDiamonds = await prisma.diamond.findMany({
      where: { listedById },
    });
    if (userDiamonds.length >= 10) {
      return NextResponse.json(
        { message: "You can only list up to 3 diamonds", diamond: null },
        { status: 400 }
      );
    }

    // step 2: create the diamond
    const newDiamond = await prisma.diamond.create({
      data: {
        name,
        type,
        weight,
        price,
        listedById,
      },
    });

    return NextResponse.json(
      {
        diamond: newDiamond,
        message: "Diamond created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { diamond: null, message: "Internal server error", error },
      { status: 500 }
    );
  }
};
