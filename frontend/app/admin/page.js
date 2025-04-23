'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Tidak dapat memuat data');
        return res.json();
      })
      .then(json => setDashboardData(json))
      .catch(() => router.replace('/admin/login'));
  }, []);

  if (!dashboardData) return <p>Loading...</p>;
  
  return (
    <main className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-10 text-center text-blue-800">Admin Dashboard</h1>
        <div className="space-y-6">
          <AdminMenuItem
            title="Kelola Pengumuman"
            description="Buat, edit, dan hapus pengumuman yang tampil di website."
            href="/admin/pengumuman"
          />
          <AdminMenuItem
            title="Kelola Ekstrakurikuler"
            description="Tambah, edit, dan hapus data ekstrakurikuler."
            href="/admin/ekstrakurikuler"
          />
          {/* Tambahkan menu lain di sini jika perlu */}
        </div>
      </div>
    </main>
  );
}

function AdminMenuItem({ title, description, href }) {
  return (
    <Link href={href} className="block group">
      <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 group-hover:bg-blue-100 transition cursor-pointer">
        <h2 className="text-lg font-bold mb-1 text-blue-700">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}