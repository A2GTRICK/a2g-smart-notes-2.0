'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4 max-w-md">
        <label className="block">
          <span>Email</span>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full" />
        </label>
        <label className="block mt-2">
          <span>Password</span>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full" />
        </label>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2">Sign in</button>
      </form>
    </main>
  )
}
