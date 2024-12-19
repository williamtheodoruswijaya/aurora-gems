import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ diamondId: string }> }
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
    const result = await prisma.$transaction(async (tx) => {
      // step 1: get user balance
      const balance = await tx.balance.findFirst({
        where: { userId: userId },
        select: { balance: true, id: true },
      });

      if (!balance) {
        return NextResponse.json(
          { diamond: null, message: "Balance not found" },
          { status: 404 }
        );
      }

      // step 2: get diamond price
      const diamond = await tx.diamond.findUnique({
        where: { id: id },
        select: { price: true, listedById: true },
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
      await tx.balance.update({
        where: { id: balance.id },
        data: { balance: { decrement: diamond.price } },
      });

      // step 5: add diamond price to seller balance
      // - get seller balance
      const sellerBalance = await tx.balance.findFirst({
        where: { userId: diamond.listedById },
        select: { balance: true, id: true },
      });
      if (!sellerBalance) {
        return NextResponse.json(
          { diamond: null, message: "Seller balance not found" },
          { status: 404 }
        );
      }
      // - add diamond price to seller balance
      await tx.balance.update({
        where: { id: sellerBalance.id },
        data: { balance: { increment: diamond.price } },
      });

      // step 5: create purchase record
      await tx.balanceHistory.create({
        data: {
          balanceId: balance.id,
          amount: diamond.price,
          type: "TRANSACTION",
        },
      });
      await tx.transaction.create({
        data: {
          buyerId: userId,
          diamondId: id,
          price: diamond.price,
        },
      });

      // step 6: change diamond's listedbyId to buyer's id
      await tx.diamond.update({
        where: { id: id },
        data: { listedById: userId },
      });
      return NextResponse.json(
        {
          diamond: diamond,
          message: "Diamond purchased successfully",
        },
        { status: 200 }
      );
    });

    return result;
    // step 7: return diamond
  } catch (error) {
    return NextResponse.json(
      { diamond: null, message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
