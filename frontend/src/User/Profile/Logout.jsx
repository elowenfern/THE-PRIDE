import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from '../../Redux/actions/userAction'

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user data and tokens from Redux store
    localStorage.removeItem('token'); // Clear token from local storage if used
    navigate('/login'); // Redirect to login page or another page
  };

  return (
    <button
      className="w-full text-left py-2 px-4 rounded bg-red-500 hover:bg-red-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
