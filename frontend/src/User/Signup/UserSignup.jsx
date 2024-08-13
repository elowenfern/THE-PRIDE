import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SETUSER } from "../../Redux/ActionType";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to handle redirection

  const password = watch("password"); // Watch the password field for validation

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);  // Ensure this field is correctly named
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('user_type', data.user_type);
      if (data.profile_picture && data.profile_picture[0]) {
        formData.append('profile_picture', data.profile_picture[0]);
      }
      console.log("Sending data:", formData); 
  
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      if (response.status === 201) {
        dispatch({ type: SETUSER, users: data });
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        const errors = error.response.data;
        let errorMessages = "Registration failed. Please try again.";
        
        if (typeof errors === 'object') {
          errorMessages = Object.keys(errors)
            .map(key => {
              // Check if the value is an array
              const message = errors[key];
              return Array.isArray(message) ? message.join(', ') : message;
            })
            .join(', ');
        }
  
        console.error("Error response:", {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });
  
        alert(`Registration failed: ${errorMessages}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Registration failed: No response from server. Please try again.");
      } else {
        console.error("Error message:", error.message);
        alert("Registration failed: An unexpected error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
        </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                {...register("profile_picture")}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Register as
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  {...register("user_type", {
                    required: "Please select a role",
                  })}
                  className="mr-2"
                />
                <span className="text-gray-700">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="teacher"
                  {...register("user_type", {
                    required: "Please select a role",
                  })}
                  className="mr-2"
                />
                <span className="text-gray-700">Teacher</span>
              </label>
            </div>
            {errors.user_type && (
              <p className="text-red-500 text-xs">{errors.user_type.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:text-indigo-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
