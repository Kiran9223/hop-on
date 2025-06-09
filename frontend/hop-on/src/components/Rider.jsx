import React from 'react'

const Rider = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <span className='text-center mb-6'>
        <h3 className='text-2xl font-bold mb-4'>Your Location</h3>
        <input
          type="text"
          placeholder="Enter your location"
          className="mt-2 p-2 border border-gray-300 rounded-md w-64" />
      </span>

      <span className='text-center mb-6'>
        <h3 className='text-2xl font-bold mb-4'>Destination</h3>
        <input
          type="text"
          placeholder="Enter your destination"
          className="mt-2 p-2 border border-gray-300 rounded-md w-64" />
      </span>

      <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
        Find Ride
      </button>
        
    </div>
  )
}

export default Rider