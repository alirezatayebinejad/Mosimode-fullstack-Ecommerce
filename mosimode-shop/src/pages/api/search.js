import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { keyword } = req.query;
    console.log("inside apissssss", keyword);

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: keyword } },
                    { description: { contains: keyword } },
                ],
            },
            include: {
                category: true,
                tags: true,
            },
        });
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
