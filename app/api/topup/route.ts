import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const balanceSchema = z.object({
  userId: z.number().min(1, "Invalid userId"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId, amount } = balanceSchema.parse(body);

    // check if user exists
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { balance: null, message: "User not found" },
        { status: 404 }
      );
    }

    const balance = await prisma.balance.findFirst({
      where: { userId: userId },
      select: { balance: true, id: true },
    });

    if (!balance) {
      // create the balance
      await prisma.balance.create({
        data: { userId: userId, balance: amount },
      });
      return NextResponse.json(
        { balance: amount, message: "Balance created successfully" },
        { status: 201 }
      );
    }

    // update the balance
    await prisma.balance.update({
      where: { id: balance.id },
      data: { balance: balance.balance + amount },
    });

    return NextResponse.json(
      {
        balance: balance.balance + amount,
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
