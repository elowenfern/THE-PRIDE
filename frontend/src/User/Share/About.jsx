import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Subscribe from '../Subscribe/Subscribe'
import Testimonal from '../Testimonal/Testimonal'
import Courses from '../Courses/Courses'
import TopCourses from '../TopCourses/TopCourses'
function About() {
  return (
    <div>
    <Navbar />
    <Outlet /> 
    <Testimonal/>
    <Footer/>{/* This will render the nested routes */}
  </div>
  )
}
export default About