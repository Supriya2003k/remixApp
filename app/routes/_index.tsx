import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Order Management App</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to the Order Management App! Manage your orders with ease.</p>
        <Link to="/orders" className="text-blue-500 flex items-center justify-center">
          <FaBoxOpen className="mr-2" /> View Orders
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
