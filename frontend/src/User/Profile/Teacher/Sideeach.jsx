import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';

const Sideeach = ({ onLogout }) => {
  const navigate = useNavigate(); // Use the useNavigate hook here

  const backHome = () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <aside className="w-64 bg-gradient-to-br from-purple-500 to-blue-500 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="/student" className="block py-2 px-4 rounded hover:bg-gray-700">
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a href="/teachercourses" className="block py-2 px-4 rounded hover:bg-gray-700">
              All Courses
            </a>
          </li>
          <li className="mb-4">
            <a href="/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
              Orders
            </a>
          </li>
          <li className="mb-4">
              <button
                className="w-full text-left py-2 px-4 rounded  hover:bg-green-600"
                onClick={backHome}
              >
                Back Home
              </button>
            </li>
            <li className="mt-4"> {/* Add a top margin to create space */}
              <Logout />
            </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sideeach;
