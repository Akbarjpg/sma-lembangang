'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Karena backend Express-mu di port 5000, ganti fetch jadi absolute URL
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      localStorage.setItem('admin_token', data.token);
      router.push('/admin');    // setelah login sukses, ke dashboard
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">Login Admin/Guru</h1>
        {error && (
          <div className="bg-red-50 p-2 rounded text-red-600 text-sm text-center">{error}</div>
        )}
        <div>
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            autoFocus
            className="border rounded w-full px-3 py-2 text-black"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="border rounded w-full px-3 py-2 text-black"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          Gunakan akun guru yang telah didaftarkan oleh admin.
        </p>
      </form>
    </main>
  );
}