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
    const balance = await prisma.balance.findFirst({
      where: { userId: userId },
      select: {
        id: true,
        balance: true,
        userId: true,
      },
    });

    if (!balance) {
      return NextResponse.json(
        { message: "Balance not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Success", data: balance },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { balance: null, message: "Internal server error", error },
      { status: 500 }
    );
  }
};
