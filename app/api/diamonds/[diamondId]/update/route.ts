import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const diamondSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    type: z.string().min(1, "Type is required").max(100),
    weight: z.number().positive("Weight must be positive"),
    price: z.number().positive("Price must be positive"),
    listedById: z.number().int("ListedById must be an integer"),
});

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ diamondId: string }> }) => {
    const session = await getServerSession(authOptions);

    // step 0: check if user is authenticated
    if(!session){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    try{
        const { diamondId } = await params;
        const id = parseInt(diamondId, 10);
        const body = await req.json();
        const { name, type, weight, price, listedById } = diamondSchema.parse(body);

        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid diamond id" },
                { status: 400 }
            );
        }

        // Check if user that listed the diamond is the same user
        const userId = parseInt(session.user.id, 10);
        if (userId !== listedById) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const diamond = await prisma.diamond.update({
            where: { id },
            data: {
                name,
                type,
                weight,
                price,
                listedById,
            },
        })

        return NextResponse.json(
            {
                diamond,
                message: "Diamond updated successfully",
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { diamond: null, message: "Internal server error", error },
            { status: 500 }
        );
    }
}