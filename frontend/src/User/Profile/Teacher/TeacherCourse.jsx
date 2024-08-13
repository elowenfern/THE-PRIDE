// components/AllCourses.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../Redux/actions/courseAction'; // Action to fetch courses
import Sideeach from './Sideeach';

const TeacherCourses = () => {
  const dispatch = useDispatch();

  // Fetch courses when the component mounts
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const { loading, courses, error } = useSelector((state) => state.courseList);

  return (
    <div className="flex">
      <Sideeach /> {/* Sidebar on the left */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">All Courses</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses && courses.map((course) => (
            <div key={course.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <p className="text-sm text-gray-600">
                Category: {course.category}
              </p>
              <p className="text-sm text-gray-600">
                Start Date: {new Date(course.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                End Date: {new Date(course.endDate).toLocaleDateString()}
              </p>
              {course.image && (
                <img
                  src={course.image}
                  alt={course.courseName}
                  className="w-full h-32 object-cover rounded mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCourses;
