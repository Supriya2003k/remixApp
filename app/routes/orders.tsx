import { FaTrash, FaEdit } from "react-icons/fa";

function OrdersPage() {
  // Dummy data for orders
  const orders = [
    { id: 1, shipper: 'FedEx', product: 'Laptop', status: 'Pending', awbNumber: '1234567890', shippedVia: 'FedEx' },
    { id: 2, shipper: 'UPS', product: 'Smartphone', status: 'Shipped', awbNumber: '9876543210', shippedVia: 'UPS' },
    { id: 3, shipper: 'DHL', product: 'Tablet', status: 'Delivered', awbNumber: '2345678901', shippedVia: 'DHL' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">ORDER MANAGEMENT SYSTEM</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">ORDERS</h2>
        <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded">Add</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-blue-400 rounded-lg p-4 bg-white">
            <p className="font-semibold">ORDER ID: {order.id}</p>
            <p>SHIPPER: {order.shipper}</p>
            <p>PRODUCT: {order.product}</p>
            <p>STATUS: {order.status}</p>
            <p>AWB NUMBER: {order.awbNumber}</p>
            <p>SHIPPED VIA: {order.shippedVia}</p>
            <div className="flex justify-between mt-4">
              <button className="text-red-500 flex items-center">
                <FaTrash className="mr-1" /> DELETE
              </button>
              <button className="text-blue-500 flex items-center">
                <FaEdit className="mr-1" /> EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
