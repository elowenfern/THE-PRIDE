import React from 'react';
import developerImage from '../../Asset/non.jpg'; // Ensure to replace this with the actual path to your image

const Developer = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        {/* Image Section */}
        <div
          className="w-full md:w-1/2"
          data-aos="fade-right"
        >
          <img
            src={developerImage}
            alt="Developer Learning"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2
            className="text-3xl sm:text-4xl font-semibold leading-tight"
            data-aos="fade-left"
          >
            Elevate Your Developer Skills
          </h2>
          <p
            className="text-gray-600 dark:text-gray-400"
            data-aos="fade-left"
          >
            Dive into our developer-focused courses and enhance your coding skills with the latest technologies. Our expert-led courses cover everything from beginner to advanced topics, ensuring you stay ahead in the tech industry.
          </p>
          <a
            href="#"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold transition duration-300"
            data-aos="fade-left"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
