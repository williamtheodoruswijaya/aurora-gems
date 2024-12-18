import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession({ req, ...authOptions });

  // step 1: check if user is authenticated
  if (!session) {
    return NextResponse.json(
      { wishlist: null, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // step 2: get the body of the request
  try {
    // body ini nerima id dari wishlist yang mau dihapus
    const body = await req.json();
    const { id } = body;
    const deletedWishlist = await prisma.wishlist.delete({
      where: { id },
    });
    if (!deletedWishlist) {
      return NextResponse.json(
        { wishlist: null, message: "Wishlist not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        wishlist: deletedWishlist,
        message: "Wishlist deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { wishlist: null, message: "Internal server error", error },
      { status: 500 }
    );
  }
};
