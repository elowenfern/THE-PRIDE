import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Admin/Common/Layout'
import Dashboard from './Admin/Dashboard'
import Course from './Admin/Course';
import AdminLogin from './Admin/AdminLogin';
import Teacher from './Admin/Teacher';
import Courses from './User/Courses/Courses';
import AOS  from 'aos';
import Hero from './User/Hero/Hero';
import Home from './User/Share/Home';
import Navbar from './User/Navbar/Navbar';
import 'aos/dist/aos.css';
import TopCourses from './User/TopCourses/TopCourses';
import Subscribe from './User/Subscribe/Subscribe';

import All from './User/Share/AllCourse';
import About from './User/Share/About';
import Contact from './User/Share/Contact';
import UserLogin from './User/Login/UserLogin';
import UserSignup from './User/Signup/UserSignup';
import StudentProfile from './User/Profile/student/Studentprofile';
import TeacherProfile from './User/Profile/Teacher/TeacherProfile';
import SomeComponent from './User/Rough';
import CreateCourse from './User/Profile/Teacher/CreateCourse';
import TeacherCourses from './User/Profile/Teacher/TeacherCourse';
function App() {
  React.useEffect(()=>{
    AOS.init({
      offset:100,
      duration:800,
      easing:'ease-in-sine',
      delay:100,
    });
    AOS.refresh();
  },[]);
  return (
    <div>
      <Router>
        <Routes>
          {/* admin */}
          <Route path="/adminn" element={<AdminLogin />} />
          <Route path="/" element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="course" element={<Courses />} />
          </Route>
         
          {/* home */}
          <Route path="/" element={<Home />}>
          <Route index element={<Hero />}></Route>
          </Route>
          {/* Courses */}
          <Route path="course" element={<All />}>
          </Route>
          <Route path="about" element={<About />}>
          </Route>
          <Route path="contact" element={<Contact />}>
          </Route>
          <Route path="login" element={<UserLogin />}>
          </Route>
          <Route path="register" element={<UserSignup />}>
          </Route>
          {/* profile */}
          <Route path="student" element={<StudentProfile />}>
          </Route>
          
          <Route path="teacher" element={<TeacherProfile />}>
          </Route>
          <Route path="createcourse" element={<CreateCourse/>}>
          </Route>
          <Route path="teachercourses" element={<TeacherCourses/>}>
          </Route>
          <Route path="rough" element={<SomeComponent/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
