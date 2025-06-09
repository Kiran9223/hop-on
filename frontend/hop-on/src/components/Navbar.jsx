import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
            <div>
            <a href="/" className="px-4 hover:underline">Rider</a>
            <a href="/driver" className="px-4 hover:underline">Driver</a>
            </div>
        </div>
    </nav>
  )
}

export default Navbar