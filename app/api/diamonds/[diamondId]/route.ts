import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// The handler for the GET request
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ diamondId: string }> } // Destructuring params from context
) {
  try {
    const { diamondId } = await params;

    // Validate the diamondId by converting it to an integer
    const id = parseInt(diamondId, 10);

    // Check if the diamondId is valid
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid diamond id" },
        { status: 400 }
      );
    }

    // Query the database to find the diamond by id
    const diamond = await prisma.diamond.findUnique({
      where: { id },
    });

    // If the diamond is not found, return 404
    if (!diamond) {
      return NextResponse.json(
        { message: "Diamond not found" },
        { status: 404 }
      );
    }

    // Return the found diamond as JSON
    return NextResponse.json(
      { message: "Success", data: diamond },
      { status: 200 }
    );
  } catch (error) {
    // Catch any errors and return a 500 response
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
