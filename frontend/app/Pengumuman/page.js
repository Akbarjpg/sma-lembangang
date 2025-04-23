'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Pengumuman() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pengumuman dari backend API
  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true);
      try {
        const res = await fetch('/api/pengumuman');
        if (!res.ok) throw new Error('Gagal mengambil data pengumuman');
        const data = await res.json();
        setAnnouncements(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Gagal memuat pengumuman. Silakan coba lagi nanti.');
        // Fallback to empty array if fetch fails
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnnouncements();
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        
        {/* Pola Dekoratif di Pojok Kiri dan Kanan */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-100 rounded-full opacity-30"></div>
      </div>

      {/* Div pembungkus untuk konten */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Pengumuman</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-24" />
        </div>

        {/* Daftar Pengumuman dengan Loading dan Error States */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Mengambil data pengumuman...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada pengumuman tersedia.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-2xl rounded-2xl p-6 text-left"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-700 mb-4">{announcement.description}</p>
                <p className="text-sm text-gray-500">Tanggal: {announcement.date}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
