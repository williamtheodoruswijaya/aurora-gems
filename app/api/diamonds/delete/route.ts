import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return NextResponse.json(
      { diamond: null, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const { id } = body;
    const deletedDiamond = await prisma.diamond.delete({
      where: { id },
    });
    if (!deletedDiamond) {
      return NextResponse.json(
        { diamond: null, message: "Diamond not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        diamond: deletedDiamond,
        message: "Diamond deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { diamond: null, message: "Internal server error", error },
      { status: 500 }
    );
  }
};
