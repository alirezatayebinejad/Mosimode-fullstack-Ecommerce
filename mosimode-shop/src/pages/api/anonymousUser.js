import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function anonyousUser(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" })
    }
    const { action } = req.body;
    if (action === "create") {
        try {
            const createdUser = await prisma.AnonymousUser.create({
                data: {}
            });
            return res.status(200).json({ anonymousUser: createdUser, message: "the anonymous user created successfuly" })
        }
        catch (error) {
            console.error("Error createing anonymous user", error);
            return res.status(500).json({ message: 'Internal server error' })
        } finally {
            await prisma.$disconnect();
        }
    }
}