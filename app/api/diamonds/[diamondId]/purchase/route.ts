import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ diamondId: string }> } // Destructuring params from context
) {
  const { diamondId } = await params;
  const id = parseInt(diamondId, 10);
  const session = await getServerSession({ req, ...authOptions });

  // step 0: check if user is authenticated
  if (!session || !session.user) {
    return NextResponse.json(
      { diamond: null, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userId = parseInt(session.user.id, 10);

  try {
    // step 1: get user balance
    const balance = await prisma.balance.findFirst({
      where: { id: userId },
      select: { balance: true, id: true },
    });

    if (!balance) {
      return NextResponse.json(
        { diamond: null, message: "Balance not found" },
        { status: 404 }
      );
    }

    // step 2: get diamond price
    const diamond = await prisma.diamond.findUnique({
      where: { id: id },
      select: { price: true },
    });
    if (!diamond) {
      return NextResponse.json(
        { diamond: null, message: "Diamond not found" },
        { status: 404 }
      );
    }

    // step 3: check if user has enough balance
    if (balance.balance < diamond.price) {
      return NextResponse.json(
        { diamond: null, message: "Insufficient balance" },
        { status: 400 }
      );
    }

    // step 4: deduct diamond price from user balance
    await prisma.balance.update({
      where: { id: balance.id },
      data: { balance: { decrement: diamond.price } },
    });

    // step 5: create purchase record
    await prisma.balanceHistory.create({
      data: {
        balanceId: balance.id,
        amount: diamond.price,
        type: "TRANSACTION",
      },
    });
    await prisma.transaction.create({
      data: {
        buyerId: userId,
        diamondId: id,
        price: diamond.price,
      },
    });

    // step 6: change diamond's listedbyId to buyer's id
    await prisma.diamond.update({
      where: { id: id },
      data: { listedById: userId },
    });

    // step 7: return diamond
    return NextResponse.json(
      { diamond: diamond, message: "Diamond purchased successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { diamond: null, message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
