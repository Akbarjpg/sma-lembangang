'use client';
import Link from 'next/link';

export default function AdminDashboard() {

  
  
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