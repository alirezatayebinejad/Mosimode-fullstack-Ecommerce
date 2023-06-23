import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { userId } = req.query;

    try {
        if (userId) {
            const orders = await prisma.order.findMany({
                where: {
                    userId,
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            res.status(200).json(orders);
        }
        else {
            const orders = await prisma.order.findMany({
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
            res.status(200).json(orders);
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
}
