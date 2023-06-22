import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        if (id) {
            // Retrieve a specific product by ID
            const product = await prisma.product.findUnique({
                where: { id: parseInt(id) },
            });

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.status(200).json(product);
        } else {
            // Retrieve all products
            const products = await prisma.product.findMany({
                include: {
                    options: true,
                    tags: true,
                    category: true,
                },
            });
            res.status(200).json(products);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}
