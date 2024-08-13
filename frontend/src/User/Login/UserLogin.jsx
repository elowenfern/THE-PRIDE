// src/components/LoginForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login,setUser } from '../../Redux/actions/userAction'; // Ensure this path is correct
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const response = await axios.post('http://localhost:8000/api/login/', { email, password });
            console.log('API Response:', response.data);
            if (response.status === 200) {
                const { token, user } = response.data;
          
                // Log token and user to ensure they are not undefined
                console.log('Token:', token);
                console.log('User:', user);
          
                if (user) {
                  dispatch(setUser(user));  // This should pass the user object
                }
                dispatch(login(token));  // This sets the token
          
                localStorage.setItem('token', token);
                navigate('/');
              }
        } catch (error) {
            if (error.response) {
                alert(`Login failed: ${error.response.data.error}`);
            } else if (error.request) {
                alert('Login failed: No response from server. Please try again.');
            } else {
                alert('Login failed: An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Log In
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Don't have an account?</p>
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-indigo-700"
                        >
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
