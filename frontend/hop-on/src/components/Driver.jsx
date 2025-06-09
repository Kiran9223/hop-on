import React from 'react'

const Driver = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <span className='text-center mb-6'>
            <h3 className='text-2xl font-bold mb-4'>Available Rides</h3>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-4">
                Check for Trips  
            </button>
        </span>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-4">
            Accept Ride
        </button>   
    </div>
  )
}

export default Driver