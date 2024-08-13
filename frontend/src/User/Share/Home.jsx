import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Subscribe from '../Subscribe/Subscribe'
import Testimonal from '../Testimonal/Testimonal'
import Courses from '../Courses/Courses'
import TopCourses from '../TopCourses/TopCourses'
import Developer from '../Develop/Develop'
function Home() {
  return (
    <div>
    <Navbar />
    <Outlet /> 
    <Courses/>
    <Developer/>
    <TopCourses/>
    <Subscribe/>
    <Testimonal/>
    <Footer/>{/* This will render the nested routes */}
  </div>
  )
}

export default Home
