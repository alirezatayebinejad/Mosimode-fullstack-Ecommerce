import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const productId = +req.query.id;
    console.log(req.body);
    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.productOptions.deleteMany({
                where: { ProductId: productId },
            });
            await prisma.category.deleteMany({
                where: { products: { some: { id: productId } } },
            });

            await prisma.tags.deleteMany({
                where: { products: { some: { id: productId } } },
            });

            await prisma.cartItem.deleteMany({
                where: { productId },
            });

            await prisma.orderItem.deleteMany({
                where: { productId },
            });

            // Delete the product
            await prisma.product.delete({
                where: { id: productId },
            });
        });
        res.status(200).end();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
}