import React from 'react';
import Sub from '../../Asset/Sub.jpg';

function Subscribe() {
  const BannerImg = {
    backgroundImage: `url(${Sub})`, // Use the renamed variable
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
  };

  return (
    <div
  data-aos="zoom-in"
  className="mb-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
>
  <div className="container backdrop-blur-md py-10">
    <div className="space-y-6 max-w-xl mx-auto text-center">
      <h1
        className="text-3xl sm:text-4xl font-semibold leading-tight"
      >
        Get Notified About New Courses
      </h1>
      <input
        data-aos="fade-up"
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  </div>
</div>

  );
}

export default Subscribe;
