'use client';

import AuthForm from '@/app/components/AuthForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({
    name,
    phone,
    password,
    role,
  }: {
    name: string;
    phone: string;
    password: string;
    role?: string;
  }) => {
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        password,
        role, 
      }),
    });

    if (res.ok) {
      alert('Registration successful');
      router.push('/auth/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <AuthForm type="register" onSubmit={handleRegister} onToggleMode={() => router.push('/auth/login')}/>
    </div>
  );
}
