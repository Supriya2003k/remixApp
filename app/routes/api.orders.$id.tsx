import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getOrdersById, updateOrderById, deleteUserById } from "~/data/order";

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log('request method :', request.method);
  const order = await getOrdersById(params?.id ?? '');
  return json({ success: true, data: order})
}

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("request method :", request.method)

  switch (request.method) {
    case 'PUT':
      try {
        const payload = await request.json();
        const updatedOrder = await updateOrderById(
          params.id ?? '',
          payload.status,
          payload.orderID,
          payload.shipper,
          payload.product,
          payload.AWBNumber,
          payload.shippedVia,
          new Date(payload.shipmentDate),
          new Date(payload.expectedDelivery),
          payload.actions
        );
        return json({ success: true, data: updatedOrder });
      } catch (error) {
        console.log('error :', error);
        return json({ success: false, message: 'Failed to update order', error: error.toString() });
      }
    break

    case 'DELETE':
      try{
        const deletedOrder = await deleteUserById(params.id ?? '');
        return json({ success: true, data: deletedOrder});
      }catch (error){
        console.log('error :',error)
      }
    break

    default:
      return json({ success: false, message: "method not allowed"});
  }
}

