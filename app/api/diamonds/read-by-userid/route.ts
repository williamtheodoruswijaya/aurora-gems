import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  // step 0: check if user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id, 10);
  try {
    const diamonds = await prisma.diamond.findMany({
      where: {
        listedById: userId,
      },
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
