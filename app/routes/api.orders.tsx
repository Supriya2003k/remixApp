import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {  getOrders, createOrder } from "~/data/order";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('request method :', request.method);
  const order = await getOrders();
  return json({ success: true, data: order})
  return json({ success: true, data: "data"})
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("request method :", request.method)
  const payload = await request.json();

  switch(request.method) {
    case "POST":
      try {
        const order = await createOrder(payload?.status, payload?.orderID, payload?.shipper, payload?.product, payload?.AWBNumber, payload?.shippedVia, payload?.shipmentDate, payload?.expectedDelivery, payload?.actions);
        return json({ success:true, data: order});
      }catch (error){
        console.log('error :', error)
      }
    break

    default:
      return new Response("Mthod Not Allowed", { status: 405 });

  }
  
}

