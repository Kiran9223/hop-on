'use client';

import AuthForm from '@/app/components/AuthForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({ phone, password }: { phone: string; password: string }) => {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      if (data.role === 'DRIVER') {
        router.push('/driver');
      } else if (data.role === 'RIDER') {
        router.push('/rider'); 
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <AuthForm type="login" onSubmit={handleLogin} onToggleMode={() => router.push('/auth/register')}/>
    </div>
  );
}
