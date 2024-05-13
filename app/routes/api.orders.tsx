import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.method === 'GET') {
    return handleGetRequest();
  } else {
    return { status: 405, error: 'Unsupported request method' };
  }
}

async function handleGetRequest() {
  try {
    const orders = await prisma.orders.findMany();
    return json({ data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case 'POST':
      return json({ success: true, message: "response from POST request"});
    case 'PUT':
      return json({ success: true, message: "response from PUT request"});
    case 'PATCH':
      return json({ success: true, message: "response from PATCH request"});
    case 'DELETE':
      return json({ success: true, message: "response from DELETE request"});
    default:
      return new Response("Method Not Allowed", { status: 405});
  }
}

