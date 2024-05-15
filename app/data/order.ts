import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrders = async () => {
    try {
        const orders = await prisma.orders.findMany();
        return orders;
    } catch (error) {
        console.log('error:', error?.toString());
        return null;
    }
};

export const getOrdersById = async (id: string) => {
    try {
        const order = await prisma.orders.findFirst({ where: { id } });
        return order;
    } catch (error) {
        console.log('error:', error?.toString());
        return null;
    }
};

export const createOrder = async (status: string, orderID: string, shipper: string, product: string, AWBNumber: number, shippedVia: string, shipmentDate: Date, expectedDelivery: Date, actions: string) => {
    try {
        const order = await prisma.orders.create({ data: { status, orderID, shipper, product, AWBNumber, shippedVia, shipmentDate, expectedDelivery, actions } });
        return order;
    } catch (error) {
        console.log('error:', error?.toString());
        return null;
    }
};

export const updateOrderById = async (id: string, status: string, orderID: string, shipper: string, product: string, AWBNumber: number, shippedVia: string, shipmentDate: Date, expectedDelivery: Date, actions: string) => {
    try {
        const updatedOrder = await prisma.orders.update({
            where: { id },
            data: { status, orderID, shipper, product, AWBNumber, shippedVia, shipmentDate, expectedDelivery, actions },
        });
        return updatedOrder;
    } catch (error) {
        console.log('error :', error?.toString());
        return null;
    }
};

export const deleteUserById = async (id: string) => {
    try {
        const order = await prisma.orders.delete({ where: { id } });
        return order;
    } catch (error) {
        console.log('error:', error?.toString());
        return null;
    }
};
