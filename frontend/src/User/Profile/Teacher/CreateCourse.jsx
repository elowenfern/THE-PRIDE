// components/CreateCourse.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { createCourse } from '../../../Redux/actions/courseAction';
import Sideeach from './Sideeach';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const { loading, course, error, success } = useSelector(state => state.courseCreate);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Dispatch createCourse action with formData
    dispatch(createCourse(formData));
  };

  // Redirect to teacher courses page on successful course creation
  useEffect(() => {
    if (success) {
      navigate('/teachercourses');
      reset(); // Reset the form after successful submission
    }
  }, [success, navigate, reset]);

  return (
    <div className="flex">
      <Sideeach /> {/* Sidebar on the left */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {course && <p>Course created successfully!</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              {...register('courseName', { required: 'Course name is required' })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              {...register('startDate', { required: 'Start date is required' })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              {...register('endDate', { required: 'End date is required' })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="image">Course Image</label>
            <input
              type="file"
              id="image"
              {...register('image')}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="reset"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

