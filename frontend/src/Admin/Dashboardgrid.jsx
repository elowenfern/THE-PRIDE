import React from 'react'
import {IoBagHandle} from 'react-icons/io5'
import { FaUser } from 'react-icons/fa';
function Dashboardgrid() {
  return (
    <div className='flex gap-4 w-full'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
        <IoBagHandle className='text-2xl text-white'/>
        </div>
        <div>
            <span className='text-sm text-gray-500 font-light'>Total Sales</span>
            <div className='flex items-center'><strong className='text-xl text-gray-700 font-semibold'>5222</strong></div>
        </div>
    </BoxWrapper>

    <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-500'>
        <FaUser className='text-2xl text-white'/>
        </div>
        <div>
            <span className='text-sm text-gray-500 font-light'>Total Students</span>
            <div className='flex items-center'><strong className='text-xl text-gray-700 font-semibold'>100</strong></div>
        </div>
    </BoxWrapper>

    <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500'>
        <FaUser className='text-2xl text-white'/>
        </div>
        <div>
            <span className='text-sm text-gray-500 font-light'>Total Teachers</span>
            <div className='flex items-center'><strong className='text-xl text-gray-700 font-semibold'>15</strong></div>
        </div>
    </BoxWrapper>
      <BoxWrapper>A</BoxWrapper>
    </div>
  )
}

export default Dashboardgrid

function BoxWrapper({children}){
    return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>
}
