import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrders = async () => {
    try{
        const orders = await prisma.orders.findMany();
        return orders;
    } catch(error) {
        console.log('error :', error?.toString());
        return null;
    }
}

export const getOrdersById = async (id: string) => {
    try{
        const order = await prisma.orders.findFirst({ where : {id}});
        return order;
    } catch(error) {
        console.log('error :', error?.toString());
        return null;
    }
}

export const createOrder = async (status: string, orderID: string, shipper: string, product: string, ) => {
    try{
        const order = await prisma.orders.findFirst({ where : {id}});
        return order;
    } catch(error) {
        console.log('error :', error?.toString());
        return null;
    }
}

