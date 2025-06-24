'use client';

import { useEffect, useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');
    setName(storedName || '');
    setRole(storedRole || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  return (
    <header className="w-full bg-white shadow border-b border-gray-200 px-4 py-3 sm:px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2 text-gray-800 font-semibold">
        <User className="w-5 h-5 text-blue-600" />
        <span>{name} ({role})</span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </header>
  );
}
