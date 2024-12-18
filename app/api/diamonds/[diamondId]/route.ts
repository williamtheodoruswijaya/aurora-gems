import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { diamondId: string } }
) => {
  const diamondId = parseInt(params.diamondId);

  // step 1: check if diamondId is valid
  if (!diamondId || isNaN(diamondId)) {
    return NextResponse.json(
      { message: "Invalid diamond id" },
      { status: 400 }
    );
  }

  // step 2: check if diamond exists
  try {
    const diamond = await prisma.diamond.findUnique({
      where: { id: diamondId },
    });

    // step 3: if diamond does not exist, return 404
    if (!diamond) {
      return NextResponse.json(
        { message: "Diamond not found" },
        { status: 404 }
      );
    }

    // step 4: return diamond
    return NextResponse.json(
      { message: "Success", data: diamond },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
