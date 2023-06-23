import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { userId } = req.query;

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                    username: true,
                    password: false,
                },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else if (req.method === "PUT") {
        const { userId } = req.query;
        const { name, email, phoneNumber, username } = req.body;
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    email,
                    phoneNumber,
                    username,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                    username: true,
                },
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
