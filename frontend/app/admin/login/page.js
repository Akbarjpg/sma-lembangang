'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { testAPI, testHealthCheck } from '../../utils/api';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState('');
  const router = useRouter();

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setDebug(`API URL: ${apiUrl || 'Not set'}`);
        
        // Test health check
        await testHealthCheck();
        setDebug(prev => prev + ' | Health check: OK');
      } catch (err) {
        setDebug(prev => prev + ` | Health check failed: ${err.message}`);
      }
    };

    testConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use environment variable for API URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/auth/login` : '/api/auth/login';
      
      console.log('Attempting login to:', endpoint);
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);

      if (!res.ok) {
        let errorMessage = 'Login gagal';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = await res.text() || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log('Login response:', data);
      
      if (!data.token) throw new Error('Token tidak ditemukan di response!');

      localStorage.setItem('admin_token', data.token);
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Gagal login. Periksa koneksi internet Anda.');
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
        {debug && (
          <div className="bg-blue-50 p-2 rounded text-blue-600 text-xs text-center">
            Debug: {debug}
          </div>
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