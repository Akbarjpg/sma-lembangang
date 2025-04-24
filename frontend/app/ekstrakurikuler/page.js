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
        const response = await fetch('http://localhost:5000/api/admin/ekstrakulikuler');
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
    <section className="py-20 bg-white relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-100 rounded-full opacity-30"></div>
      </div>

      {/* Div pembungkus untuk konten */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Ekstrakurikuler</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-24" />
        </div>

        {/* Handle loading/error/empty states */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Memuat data ekstrakurikuler...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        ) : ekstrakurikuler.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada data ekstrakurikuler tersedia.</p>
          </div>
        ) : (
          /* Daftar Ekstrakurikuler */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {ekstrakurikuler.map((ekskul, idx) => (
              <motion.div
                key={ekskul._id || ekskul.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white shadow-2xl rounded-2xl p-6 pb-5 text-left relative flex flex-col"
              >
                {/* Gambar Ekskul di atas */}
                {ekskul.imageUrl && (
                  <div className="w-full flex justify-center mb-4">
                    <img
                      src={
                        ekskul.imageUrl.startsWith('/uploads/')
                          ? `http://localhost:5000${ekskul.imageUrl}`
                          : ekskul.imageUrl
                      }
                      alt={ekskul.nama}
                      className="rounded-xl max-h-48 object-contain border bg-slate-50"
                      loading="lazy"
                      style={{ maxWidth: 320, width: '100%' }}
                    />
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{ekskul.nama}</h3>
                <p className="text-gray-700 mb-4">{ekskul.deskripsi}</p>
                {ekskul.jadwal && (
                  <div className="inline-block bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                    {ekskul.jadwal}
                  </div>
                )}
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
