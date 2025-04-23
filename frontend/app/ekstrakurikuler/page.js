'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Ekstrakurikuler() {
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data ekstrakurikuler dari backend
  useEffect(() => {
    async function fetchEkstrakurikuler() {
      setLoading(true);
      try {
        const response = await fetch('/api/ekstrakurikuler');
        if (!response.ok) {
          throw new Error('Gagal mengambil data ekstrakurikuler');
        }
        const data = await response.json();
        setEkstrakurikuler(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching ekstrakurikuler:', err);
        setError(err.message);
        // Fallback data jika API gagal
        setEkstrakurikuler([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEkstrakurikuler();
  }, []);

  return (
    <section className="py-10 md:py-20 bg-white relative overflow-hidden min-h-screen">
      {/* Background Pattern only on md+ screens */}
      <div className="hidden md:block absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        
        {/* Pola Dekoratif di Pojok Kiri dan Kanan */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-100 rounded-full opacity-30"></div>
      </div>

      {/* Div pembungkus untuk konten */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Judul */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Ekstrakurikuler</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-20 md:w-24" />
        </div>

        {/* Handle loading/error/empty states */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Memuat data ekstrakurikuler...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">Error: {error}</p>
            <p className="mt-2 text-gray-600">Gagal memuat data ekstrakurikuler.</p>
          </div>
        ) : ekstrakurikuler.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Belum ada data ekstrakurikuler tersedia.</p>
          </div>
        ) : (
          /* Daftar Ekstrakurikuler */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {ekstrakurikuler.map((ekskul) => (
              <motion.div
                key={ekskul.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ekskul.id * 0.1 }}
                className="bg-white shadow-xl rounded-xl p-4 md:p-6 text-left"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1 md:mb-2">{ekskul.nama}</h3>
                <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-4">{ekskul.deskripsi}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Jadwal:</span> {ekskul.jadwal}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Note: This component expects the backend API to provide data in the following format:
// [
//   {
//     id: number,
//     nama: string,
//     deskripsi: string,
//     jadwal: string
//   },
//   ...
// ]
