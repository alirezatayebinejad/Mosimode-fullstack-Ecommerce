//import prisma from '../../../prisma/prismaclient';
import { PrismaClient } from '@prisma/client';

export default async function signup(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const prisma = new PrismaClient();
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        res.status(200).json({ message: 'Sign up successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up' });
    }
}
