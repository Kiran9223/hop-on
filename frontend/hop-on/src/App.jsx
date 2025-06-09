import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Rider from './components/Rider'
import Navbar from './components/Navbar'
import Driver from './components/Driver'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <header className='w-full bg-blue-500 text-white p-4 text-center'>
          <h1 className='text-3xl font-bold'>Hop-On Ride Sharing</h1>
          <p className='text-sm mt-2'>Find a ride to your destination</p>
        </header>
        <BrowserRouter>
          <nav className="w-full bg-blue-500 text-white p-4 flex justify-center border-2 border-white shadow-md">
            <Link to="/" className="px-4 hover:underline">Rider</Link>
            <Link to="/driver" className="px-4 hover:underline">Driver</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Rider />} />
            <Route path="/driver" element={<Driver/>} />
          </Routes>
        </BrowserRouter>
      </div>
  </>
  )
}

export default App
