import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//POST, PUT, PATCH, DELETE

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case 'POST':
      return handlePostRequest(request);
    case 'PUT':
      return handlePutRequest(request);
    case 'PATCH':
      return handlePatchRequest(request);
    case 'DELETE':
      return handleDeleteRequest(request);
    default:
      return { status: 405, error: 'Unsupported request method' };
  }
}

async function handlePostRequest(request: Request) {
  try {
    const body = await request.json();
    const createdOrder = await prisma.orders.create({
      data: {
        status: body.status,
        orderID: body.orderID,
        shipper: body.shipper,
        product: body.product,
        AWBNumber: body.AWBNumber,
        shippedVia: body.shippedVia,
        shipmentDate: body.shipmentDate,
        expectedDelivery: body.expectedDelivery,
        actualDelivery: body.actualDelivery,
        actions: body.actions,
      },
    });
    return json({ data: createdOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handlePutRequest(request: Request) {
  try {
    const body = await request.json();
    const orderId = parseInt(request.params.orderId);
    const updatedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: {
        status: body.status,
        orderID: body.orderID,
        shipper: body.shipper,
        product: body.product,
        AWBNumber: body.AWBNumber,
        shippedVia: body.shippedVia,
        shipmentDate: body.shipmentDate,
        expectedDelivery: body.expectedDelivery,
        actualDelivery: body.actualDelivery,
        actions: body.actions,
      },
    });
    return json({ data: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handlePatchRequest(request: Request) {
  try {
    const body = await request.json();
    const orderId = parseInt(request.params.orderId);
    const patchedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: body,
    });
    return json({ data: patchedOrder });
  } catch (error) {
    console.error('Error patching order:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleDeleteRequest(request: Request) {
  try {
    const orderId = parseInt(request.params.orderId);
    await prisma.orders.delete({ where: { id: orderId } });
    return redirect('/api/orders', { status: 303 });
  } catch (error) {
    console.error('Error deleting order:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
