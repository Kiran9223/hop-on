// lib/useAuthRedirect.ts
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuthRedirect(): boolean {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      router.replace('/auth/login');
    }

    // Delay to allow for smooth redirect/spinner
    setTimeout(() => setLoading(false), 1000);
  }, [router]);

  return loading;
}
