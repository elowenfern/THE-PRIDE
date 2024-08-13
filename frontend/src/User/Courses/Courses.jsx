import React from 'react'
import Python from '../../Asset/Courses/Python.jpg'
import Js from '../../Asset/Courses/Js.jpg'
import Html from '../../Asset/Courses/Html.jpg'
import { FaStar } from 'react-icons/fa'
function Courses() {
    const CoursesData=[
        {
            id:1,
            img:Python,
            title:'Python Django',
            teacher:'Hareesh',
            rating:'4.0',
            aosDelay:'0',
        },
        {
            id:2,
            img:Js,
            title:'JavaScript',
            teacher:'Hareesh',
            rating:'5.8',
            aosDelay:'200',
        },
        {
            id:3,
            img:Html,
            title:'Html',
            teacher:'Hareesh',
            rating:'3.8',
            aosDelay:'400',
        },
        {
            id:4,
            img:Python,
            title:'Python Django',
            teacher:'Hareesh',
            rating:'4.0',
            aosDelay:'0',
        },
        {
            id:5,
            img:Js,
            title:'JavaScript',
            teacher:'Hareesh',
            rating:'5.8',
            aosDelay:'200',
        },
    ]
  return (
    <div className="mt-14 mb-12">
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-10 max-w-[600px] mx-auto">
        <p
          data-aos="fade-up"
          className="text-sm text-primary font-medium tracking-wide"
        >
          Top Courses For You
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
          In order to create an engaging learning experience, the role of
          instructor is optional, but the role of learner is essential.
        </p>
      </div>
      {/* Body Section */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {/* Card Section */}
          {CoursesData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-xs transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={data.img}
                alt={data.title}
                className="h-[220px] w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  {data.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {data.teacher}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {data.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Courses
