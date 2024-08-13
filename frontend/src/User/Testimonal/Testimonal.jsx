import React from 'react';
import person1 from '../../Asset/Testimonial/person1.jpg';
import person2 from '../../Asset/Testimonial/person2.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonal() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const TestimonalData = [
    {
      id: 1,
      name: 'Victor',
      text: 'eNyota has been great to work with, delivers high quality, and has great project management/communication. We will work once again together soon.',
      img: person1,
    },
    {
      id: 2,
      name: 'Jane',
      text: 'eNyota has been great to work with, delivers high quality, and has great project management/communication. We will work once again together soon.',
      img: person2,
    },
    // Add more testimonials as needed
  ];

  return (
    <div className='py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4'>
        {/* Header section */}
        <div className='text-center mb-12'>
          <p data-aos='fade-up' className='text-sm text-primary uppercase tracking-wide'>
            What Our Students Are Saying
          </p>
          <h1 data-aos='fade-up' className='text-3xl font-bold mt-2 mb-4'>
            Testimonials
          </h1>
          <p data-aos='fade-up' className='text-base text-gray-500 dark:text-gray-300 max-w-2xl mx-auto'>
            "In order to create an engaging learning experience, the role of instructor is optional, but the role of learner is essential."
          </p>
        </div>
        {/* Testimonial Slider */}
        <div className='relative'>
          <Slider {...settings}>
            {TestimonalData.map((data) => (
              <div key={data.id} className='px-4'>
                <div className='flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-xs mx-auto'>
                  <div className='mb-4'>
                    <img
                      src={data.img}
                      alt={data.name}
                      className='rounded-full w-16 h-16 border-2 border-primary'
                    />
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-300 italic text-center'>
                    "{data.text}"
                  </p>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mt-4'>
                    {data.name}
                  </h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Testimonal;
