import React from 'react'
import herop from '../../Asset/herop.jpg';
import laptop from '../../Asset/laptop.jpg';
import herol from '../../Asset/herol.jpg';
import { useState,useEffect } from 'react';
function Hero() {
  // Define the images and titles
  const ImageList = [
    {
      id: 1,
      img: herop,
      title: 'Get Educated Online From Your Home',
    },
    {
      id: 2,
      img: herol,
      title: 'Start Learning New Language Today ',
    },
    {
      id: 3,
      img: laptop,
      title: 'Explore tomorrow’s skills today.',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle image change
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ImageList.length);
  };

  // Effect to change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ImageList.length);
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div
    className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gradient-to-r from-primary to-secondary flex justify-center items-center dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 duration-200"
  >
    {/* Background Pattern */}
    <div className="h-[900px] w-[900px] bg-secondary/20 absolute -top-1/2 right-0 rounded-3xl transform rotate-45 z-0"></div>
  
    {/* Hero Section */}
    <div className="container mx-auto pb-8 sm:pb-0 px-4 sm:px-8 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 sm:gap-8">
        {/* Title and Overlay */}
        <div className="relative z-10 bg-opacity-50 p-6 rounded-lg bg-white/60 dark:bg-black/60 shadow-lg">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-center text-primary dark:text-secondary">
          {ImageList[currentImageIndex].title}
        </h3>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Discover the most engaging courses that elevate your learning experience.
          </p>
        </div>
  
        {/* Image */}
        <div
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] cursor-pointer overflow-hidden rounded-lg shadow-2xl"
          onClick={handleImageClick}
        >
          <img
            src={ImageList[currentImageIndex].img}
            alt={`Slide ${ImageList[currentImageIndex].id}`}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Hero;
