import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ADMINLOGIN } from '../Redux/ActionType';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const admintoken = useSelector(state => state.admintoken);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (admintoken) {
            navigate('/dashboard');
        }
    }, [admintoken, navigate]);

    const onSubmit = async (data) => {
        setError(null);
        const { email, password } = data;

        try {
            const response = await fetch('http://127.0.0.1:8000/adminn/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An error occurred. Please try again.');
                return;
            }
    
            const result = await response.json();
            dispatch({
                type: ADMINLOGIN,
                token: result.token,
            });
            navigate('adminn/dashboard');
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                    </div>

                    {error && <div className="text-sm text-red-500">{error}</div>}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
