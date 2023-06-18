import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleCart(req, res) {
    const { method, body, query } = req;
    const { userId, anonymousUserUuid, productId, action } = body;

    if (method === "GET") {
        try {
            let cart;

            if (query.userId) {
                const user = await prisma.user.findUnique({
                    where: { id: query.userId },
                    include: {
                        cart: {
                            include: {
                                cartItems: {
                                    include: {
                                        Product: true,
                                    },
                                },
                            },
                        },
                    },
                });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                cart = user.cart?.cartItems;
            } else if (query.anonymousUserUuid) {
                const anonymousUser = await prisma.anonymousUser.findUnique({
                    where: { id: query.anonymousUserUuid },
                    include: {
                        cart: {
                            include: {
                                cartItems: {
                                    include: {
                                        Product: true,
                                    },
                                },
                            },
                        },
                    },
                });
                if (!anonymousUser) {
                    return res.status(404).json({ message: "Anonymous user not found" });
                }
                cart = anonymousUser.cart?.cartItems;
            }

            if (!cart) {
                cart = [];
                return res.status(200).json({ cart });
            }

            return res.status(200).json({ cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    if (method == "POST") {
        try {
            let cart;
            let user;

            if (userId) {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: { cart: { include: { cartItems: true } } },
                });

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                cart = user.cart;
            } else if (anonymousUserUuid) {
                const anonymousUser = await prisma.anonymousUser.findUnique({
                    where: { id: anonymousUserUuid },
                    include: { cart: { include: { cartItems: true } } },
                });
                if (!anonymousUser) {
                    return res.status(404).json({ message: "Anonymous user not found" });
                }
                cart = anonymousUser.cart;
            }
            if (!cart) {
                await prisma.cart.create({
                    data: {
                        user: userId ? { connect: { id: userId } } : undefined,
                        anonymousUser: userId ? undefined : { connect: { id: anonymousUserUuid } },
                    },
                });
                if (userId) {
                    const user = await prisma.user.findUnique({
                        where: { id: userId },
                        include: { cart: { include: { cartItems: true } } },
                    });
                    cart = user.cart;
                } else if (anonymousUserUuid) {
                    const anonymousUser = await prisma.anonymousUser.findUnique({
                        where: { id: anonymousUserUuid },
                        include: { cart: { include: { cartItems: true } } },
                    });
                    cart = anonymousUser.cart;
                }

            }

            const cartItemId = cart.cartItems.find((item) => item.productId === productId)?.id;
            if (action === "add") {
                if (cartItemId) {
                    const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } })
                    if (cartItem) {
                        const newQuantity = cartItem.quantity + 1;

                        await prisma.cartItem.update({
                            where: { id: cartItemId },
                            data: { quantity: newQuantity },
                        });
                    }
                } else {
                    await prisma.cartItem.create({
                        data: {
                            Product: { connect: { id: productId } },
                            Cart: { connect: { id: cart.id } },
                        },
                    });
                }
            } else if (action === "remove") {
                if (cartItemId) {
                    await prisma.cartItem.delete({ where: { id: cartItemId } });
                }
            } else if (action === "increase") {
                if (cartItemId) {
                    const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } })
                    if (cartItem) {
                        const newQuantity = cartItem.quantity + 1;

                        await prisma.cartItem.update({
                            where: { id: cartItemId },
                            data: { quantity: newQuantity },
                        });
                    }
                }
            } else if (action === "decrease") {
                if (cartItemId) {
                    const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
                    if (cartItem && cartItem.quantity > 1) {
                        const newQuantity = cartItem.quantity - 1;
                        await prisma.cartItem.update({
                            where: { id: cartItemId },
                            data: { quantity: newQuantity },
                        });
                    }
                }
            } else {
                return res.status(400).json({ message: "Invalid action" });
            }

            return res.status(200).json({ message: "Cart updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    return res.status(405).json({ message: "Method Not Allowed" });
}