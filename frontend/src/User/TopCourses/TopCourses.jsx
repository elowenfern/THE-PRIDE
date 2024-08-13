import React, { useState } from 'react';
import Python from '../../Asset/Courses/Python.jpg';
import Js from '../../Asset/Courses/Js.jpg';
import Html from '../../Asset/Courses/Html.jpg';
import { FaStar } from 'react-icons/fa';

function TopCourses() {
  const [zoomed, setZoomed] = useState(null);

  const CourseData = [
    {
      id: 1,
      img: Python,
      title: 'Python Django',
      teacher: 'Hareesh',
      rating: '4.0',
      aosDelay: '0',
    },
    {
      id: 2,
      img: Js,
      title: 'JavaScript',
      teacher: 'Hareesh',
      rating: '5.0',
      aosDelay: '200',
    },
    {
      id: 3,
      img: Html,
      title: 'Html',
      teacher: 'Hareesh',
      rating: '3.8',
      aosDelay: '400',
    },
  ];

  const handleZoom = (id) => {
    setZoomed(zoomed === id ? null : id);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 > 0;
    return (
      <div className='w-full flex items-center justify-center gap-1'>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < filledStars
                ? 'text-yellow-500'
                : index === filledStars && halfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-14 mb-12">
  <div className="container mx-auto px-4">
    {/* Header Section */}
    <div className="text-left mb-10 max-w-[600px]">
      <p
        data-aos="fade-up"
        className="text-sm text-primary font-medium tracking-wide"
      >
        Top Rated Courses For You
      </p>
      <h1
        data-aos="fade-up"
        className="text-4xl font-bold text-gray-900 dark:text-white"
      >
        Courses
      </h1>
      <p
        data-aos="fade-up"
        className="text-base text-gray-600 dark:text-gray-300 mt-2"
      >
        Get professional-level training and earn a credential recognized by
        leading companies.
      </p>
    </div>
    {/* Body Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 place-items-center">
      {CourseData.map((data) => (
        <div
          key={data.id}
          className={`transition-transform duration-300 ease-in-out ${
            zoomed === data.id ? 'scale-110' : 'scale-100'
          } cursor-pointer bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-sm`}
          onClick={() => handleZoom(data.id)}
        >
          {/* Image Section */}
          <div className="relative h-[200px] overflow-hidden">
            <img
              src={data.img}
              alt={data.title}
              className={`transition-transform duration-300 ease-in-out ${
                zoomed === data.id ? 'scale-110' : 'scale-100'
              } w-full h-full object-cover`}
            />
          </div>
          {/* Details Section */}
          <div className="p-4">
            <div className="flex justify-center mb-2">
              {renderStars(parseFloat(data.rating))}
            </div>
            <h1 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
              {data.title}
            </h1>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default TopCourses;
