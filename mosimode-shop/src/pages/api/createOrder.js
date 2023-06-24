import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createOrder(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    const { name, phoneNumber, address, state, city, postalCode, message, cartItems, totalPrice, userId, anonymousUserUuid } = req.body;

    try {
        const createdOrder = await prisma.order.create({
            data: {
                totalAmount: totalPrice,
                name,
                phonenumber: phoneNumber,
                address,
                state,
                city,
                postalcode: postalCode,
                message,
                deliveryMethod: "POST",
                paymentStatus: "PENDING",
                user: userId ? { connect: { id: userId } } : undefined,
                anonymouseUser: anonymousUserUuid ? { connect: { id: anonymousUserUuid } } : undefined,
                items: {
                    create: cartItems.map((item) => ({
                        quantity: item.count,
                        price: item.product.price,
                        product: { connect: { id: item.product.id } },
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        return res.status(200).json(createdOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
