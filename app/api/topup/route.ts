import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const balanceSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
});

export const POST = async (req: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });

  // step 0: check if user is authenticated
  if (!session || !session.user) {
    if (!session || !session.user) {
      return NextResponse.json(
        { diamond: null, message: "Unauthorized" },
        { status: 401 }
      );
    }
  }
  const userId = parseInt(session.user.id, 10);

  try {
    // ini input-nya dari client
    const body = await req.json();
    const { amount } = balanceSchema.parse(body);

    // step 1: check if balance exists
    const balance = await prisma.balance.findFirst({
      where: { id: userId },
      select: { balance: true, id: true },
    });

    if (!balance) {
      // step 2: create balance if it doesn't exist
      await prisma.balance.create({
        data: { userId: userId, balance: amount },
      });
      return NextResponse.json(
        { balance: amount, message: "Balance created successfully" },
        { status: 201 }
      );
    } else {
      // step 3: update balance if it exists
      await prisma.balance.update({
        where: { id: userId },
        data: { balance: balance.balance + amount },
      });
    }

    return NextResponse.json(
      {
        balance: balance?.balance + amount,
        message: "Balance updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { balance: null, message: error },
      { status: 500 }
    );
  }
};
