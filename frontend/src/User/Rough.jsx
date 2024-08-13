// src/components/SomeComponent.js
import React from 'react';
import { useSelector } from 'react-redux';

const SomeComponent = () => {
  // Get the current user from Redux store
  const user = useSelector((state) => state.user);
  console.log('Current user:', user);
  // Check if user is logged in and has a userType
  const userType = user?.userType;

  return (
    <div>
      {user ? (
        <p>Current user type: {user}</p>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default SomeComponent;
