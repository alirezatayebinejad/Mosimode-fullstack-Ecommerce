import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addProducts = async (req, res) => {
    try {
        const { title, image, price, description, options, tags, categories, productCounts } = req.body;

        const product = await prisma.product.create({
            data: {
                title,
                image,
                price,
                description,
                options: { create: options.map((option) => ({ name: option })) },
                tags: { create: tags.map((tag) => ({ name: tag })) },
                category: { create: categories.map((category) => ({ name: category })) },
                productCounts
            },
            include: {
                options: true,
                tags: true,
                category: true,
            },
        });

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default addProducts;
