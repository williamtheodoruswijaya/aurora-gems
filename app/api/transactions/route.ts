import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                buyerId: userId
            },
            select: {
                id: true,
                buyerId: true,
                buyer: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true
                    }
                },
                diamondId: true,
                diamond: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        weight: true,
                        price: true,
                        listedById: true,
                        listedBy: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                role: true
                            }
                        },
                        createdAt: true
                    }
                },
                price: true,
                transactionAt: true
            }
        })

        // validate if transactions is empty
        if(transactions.length === 0) {
            return NextResponse.json({ message: "No transactions found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Success", data: transactions }, { status: 200 });
    }
    catch(error){
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}