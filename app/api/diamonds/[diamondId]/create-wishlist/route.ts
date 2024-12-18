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
    // step 1: create wishlist
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: userId,
        diamondId: id,
      },
    });

    return NextResponse.json(
      { wishlist, message: "Wishlist created" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { wishlist: null, message: error },
      { status: 500 }
    );
  }
}
