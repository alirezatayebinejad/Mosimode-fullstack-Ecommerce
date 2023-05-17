import { signIn } from 'next-auth/react';

export default async function signin(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    const result = await signIn('Credentials', {
        email,
        password,
        redirect: false,
    });
    if (result.error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    return res.status(200).json({ message: 'Sign in successful' });

}
