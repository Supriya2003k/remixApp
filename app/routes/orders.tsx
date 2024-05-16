import { useEffect, useState } from "react";
import { LinksFunction } from "@remix-run/react";
import { FaTrash, FaEdit } from "react-icons/fa";

// Link to your Tailwind CSS file
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/styles/tailwind.css" }
];

// Importing your Tailwind CSS file directly
import "../../styles/tailwind.css"; 

interface Order {
  id: number;
  shipper: string;
  product: string;
  status: string;
  awbNumber: string;
  shippedVia: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch orders from the database
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders...");
        const response = await fetch("/api/orders"); // Assuming Remix routes are set up to handle this path

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.success) {
          setOrders(data.data);
        } else {
          console.error("Failed to fetch orders:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = async () => {
    const newOrder: Omit<Order, 'id'> = {
      shipper: 'New Shipper',
      product: 'New Product',
      status: 'New Status',
      awbNumber: 'New AWB',
      shippedVia: 'New Shipper'
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setOrders([...orders, data.data]);
      } else {
        console.error("Failed to add order:", data.message);
      }
    } catch (error) {
      console.error("Failed to add order:", error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setOrders(orders.filter(order => order.id !== id));
      } else {
        console.error("Failed to delete order:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const editOrder = async (id: number) => {
    const updatedOrder: Partial<Order> = {
      product: 'Updated Product',
    };

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(order => (order.id === id ? { ...order, ...updatedOrder } : order)));
      } else {
        console.error("Failed to edit order:", data.message);
      }
    } catch (error) {
      console.error("Failed to edit order:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">ORDER MANAGEMENT SYSTEM</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">ORDERS</h2>
        <button
          onClick={addOrder}
          className="text-lg bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add
        </button>
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
              <button
                onClick={() => deleteOrder(order.id)}
                className="text-red-500 flex items-center"
              >
                <FaTrash className="mr-1" /> DELETE
              </button>
              <button
                onClick={() => editOrder(order.id)}
                className="text-blue-500 flex items-center"
              >
                <FaEdit className="mr-1" /> EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
