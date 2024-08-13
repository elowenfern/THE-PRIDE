import React from 'react'
import { Link } from 'react-router-dom'
function Course() {
  return (
    <div>
      <h1>Courses</h1>
      <Link to='/' className='underline'>
      Go to Dashboard</Link>
    </div>
  )
}

export default Course
