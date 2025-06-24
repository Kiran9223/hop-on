'use client';

import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Car, MapPin, Clock, UserCheck, Satellite, Power } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useAuthRedirect } from '../lib/useAuthRedirect';
import Spinner from '../components/Spinner';

interface RideNotification {
  rideId: number;
  pickupLocation: string;
  dropLocation: string;
}

export default function DriverDashboard() {
  // const loading = useAuthRedirect(); // Ensure user is authenticated and redirected if not
  // if (loading) return <Spinner />; // Show spinner while redirecting
  useAuthRedirect();

  const [rides, setRides] = useState<RideNotification[]>([]);
  const [userName, setUserName] = useState('');
  const [driverId, setDriverId] = useState('');
  const [online, setOnline] = useState(false);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stompClientRef = useRef<Client | null>(null);

  // Initial setup: name, id, socket
  useEffect(() => {
    const name = localStorage.getItem('name') ?? '';
    const id = localStorage.getItem('userId') ?? '';
    setUserName(name);
    setDriverId(id);

    if (!id) return;

    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log('[STOMP]', msg),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/driver/${id}`, (message) => {
          // console.log('[Ride Notification]', message.body);
          // // const ride = JSON.parse(message.body);
          // const data = JSON.parse(message.body);
          // const ride: RideNotification = {
          //   rideId: data.id,
          //   pickupLocation: data.pickupLocation,
          //   dropLocation: data.dropLocation,
          // };
          // console.log('[Parsed]', ride);
          // // const ride: RideNotification = JSON.parse(message.body);
          // setRides((prev) => [...prev, ride]);
          const data = JSON.parse(message.body);
          const rideId = data.id;

          setRides((prev) => {
            const exists = prev.some((r) => r.rideId === rideId);
            if (exists) return prev;

            const ride: RideNotification = {
              rideId: rideId,
              pickupLocation: data.pickupLocation,
              dropLocation: data.dropLocation,
            };
            return [...prev, ride];
          });
        });
      },
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, []);

  // Toggle location updates
  useEffect(() => {
    if (!online || !driverId) {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
      return;
    }

    const sendLocation = () => {
      if (!navigator.geolocation) {
        console.warn('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const token = localStorage.getItem('token');
          const { latitude, longitude } = position.coords;

          fetch(`http://localhost:8080/api/drivers/${driverId}/location`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };

    // send first time immediately
    sendLocation();
    locationIntervalRef.current = setInterval(sendLocation, 10000);

    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, [online, driverId]);

  const acceptRide = async (rideId: number) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/api/rides/${rideId}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ driverId: parseInt(driverId ?? '0') }),
    });

    if (res.ok) {
      alert(`You accepted Ride #${rideId}`);
      setRides((prev) => prev.filter((r) => r.rideId !== rideId));
    } else {
      alert('Failed to accept ride');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <TopBar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4">
            <Car className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {userName || 'Driver'} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">You're {online ? 'online' : 'offline'} and ready to drive</p>
        </div>

        {/* Toggle Online */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setOnline((prev) => !prev)}
            className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full shadow transition-all ${
              online
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {online ? <Satellite className="w-4 h-4 mr-2" /> : <Power className="w-4 h-4 mr-2" />}
            {online ? 'Online - Broadcasting Location' : 'Go Online'}
          </button>
        </div>

        {/* Ride Requests */}
        <div className="grid gap-6 max-w-3xl mx-auto">
          {rides.length === 0 ? (
            <p className="text-center text-gray-500">
              No ride requests yet. Waiting for nearby riders...
            </p>
          ) : (
            rides.map((ride) => (
              <div key={ride.rideId} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold text-lg">Ride Request</span>
                  </div>
                  <span className="font-mono text-sm opacity-90">#{ride.rideId}</span>
                </div>

                <div className="px-6 py-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-blue-600 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pickup Location</p>
                      <p className="text-base text-gray-800">{ride.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="text-green-600 w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Drop Location</p>
                      <p className="text-base text-gray-800">{ride.dropLocation}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => acceptRide(ride.rideId)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>Accept Ride</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
