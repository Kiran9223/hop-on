'use client';

import { useEffect, useState } from 'react';
import { MapPin, Car, Clock, RefreshCw } from 'lucide-react';
import { useAuthRedirect } from '../lib/useAuthRedirect';
import TopBar from '../components/TopBar';
import Spinner from '../components/Spinner';

export default function RiderDashboard() {
//   const loading = useAuthRedirect();
//   if (loading) return <Spinner />;
    useAuthRedirect();

  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [rideId, setRideId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const requestRide = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:8080/api/rides/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pickupLocation: pickup,
        dropLocation: drop,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setRideId(data.rideId);
      setStatus('Requested');
    } else {
      alert('Failed to request ride');
    }
  };

  const checkStatus = async () => {
    const token = localStorage.getItem('token');
    if (!rideId) return;

    const res = await fetch(`http://localhost:8080/api/rides/${rideId}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const currentStatus = await res.text();
      setStatus(currentStatus);
    } else {
      alert('Failed to fetch ride status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Requested':
        return 'text-blue-600 bg-blue-50';
      case 'Driver Assigned':
        return 'text-orange-600 bg-orange-50';
      case 'Driver Arriving':
        return 'text-yellow-600 bg-yellow-50';
      case 'In Progress':
        return 'text-green-600 bg-green-50';
      case 'Completed':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <TopBar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-3 sm:mb-4">
            <Car className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Rider Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Request your ride in just a few clicks</p>
        </div>

        {/* Main Card */}
        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Book Your Ride</h2>
              <p className="text-blue-100 mt-1 text-sm sm:text-base">Enter your pickup and destination</p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              {/* Pickup */}
              <div className="space-y-2">
                <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup address..."
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full px-3 sm:px-4 text-gray-600 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Drop */}
              <div className="space-y-2">
                <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />
                  Drop Location
                </label>
                <input
                  type="text"
                  placeholder="Enter destination address..."
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-600 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Button */}
              <button
                onClick={requestRide}
                disabled={!pickup || !drop}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium sm:font-semibold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl"
              >
                <div className="flex items-center justify-center">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Request Ride
                </div>
              </button>
            </div>
          </div>

          {/* Ride Status Card */}
          {rideId && (
            <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Ride Details
                </h3>
              </div>

              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Ride ID</p>
                    <p className="text-sm sm:text-base lg:text-lg font-mono text-gray-800 font-bold break-all">
                      {rideId}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Status</p>
                    <span
                      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                        status ?? ''
                      )}`}
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current mr-1.5 sm:mr-2"></div>
                      {status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={checkStatus}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 hover:text-blue-700 font-medium sm:font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                    Refresh Status
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
