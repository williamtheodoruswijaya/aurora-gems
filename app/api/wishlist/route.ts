import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  // If the user is not authenticated, return a 401 status
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id, 10);
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        diamondId: true,
        createdAt: true,
      },
    });
    if (wishlist.length === 0) {
      return NextResponse.json(
        { message: "No wishlist found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Success", data: wishlist },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { wishlist: null, message: "Internal server error", error },
      { status: 500 }
    );
  }
};
