'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from './components/Spinner'; 

export default function HomeRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'RIDER') {
        router.replace('/rider');
      } else if (role === 'DRIVER') {
        router.replace('/driver');
      } else {
        localStorage.clear();
        router.replace('/auth/login');
      }
    } else {
      router.replace('/auth/login');
    }

    setTimeout(() => setLoading(false), 1500); // slight delay for smoother UX
  }, [router]);

  return loading ? <Spinner /> : null;
}
