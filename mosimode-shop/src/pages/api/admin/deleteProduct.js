import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const productId = +req.query.id;
    console.log(req.body);
    try {
        await prisma.product.delete({
            where: { id: productId },
        });
        res.status(200).end();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
}