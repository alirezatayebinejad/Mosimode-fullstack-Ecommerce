import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const userId = req.query.id;

    try {
        await prisma.user.delete({
            where: { id: userId },
            include: {
                cart: true,
                orders: true,
            },
        });

        res.status(200).end();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
}
