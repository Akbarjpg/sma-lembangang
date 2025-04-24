'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper untuk format tanggal ke Indonesia
function displayTanggal(tanggal) {
  if (!tanggal) return '-';
  const d = new Date(tanggal);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function JadwalUjian() {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch data from backend API
        const res = await fetch('http://localhost:5000/api/admin/jadwal');
        if (!res.ok) throw new Error('Gagal mengambil data jadwal ujian');
        const data = await res.json();
        setJadwal(Array.isArray(data) ? data : []);
        setError('');
      } catch (e) {
        console.error('Error fetching jadwal ujian:', e);
        setError(e.message || 'Gagal mengambil data');
        setJadwal([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-100 rounded-full opacity-30"></div>
        <div className="absolute left-1/2 top-1/3 w-64 h-64 bg-pink-100 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Jadwal Ujian</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Informasi terbaru mengenai jadwal ujian yang akan dilaksanakan</p>
          <hr className="border-t-2 border-gray-300 mx-auto w-24 mt-6" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto backdrop-blur-sm bg-white/90"
        >
          {loading ? (
            <div className="text-center py-16 flex flex-col items-center">
              <span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></span>
              <p className="text-blue-700 font-semibold text-lg">Memuat data jadwal ujian...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-600 font-semibold text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : jadwal.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-semibold text-lg">Belum ada data jadwal ujian.</p>
            </div>
          ) : (
            <table className="w-full text-left rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-blue-100 to-purple-100">
                  <th className="py-4 px-6 text-gray-700 font-semibold">Tanggal</th>
                  <th className="py-4 px-6 text-gray-700 font-semibold">Mata Pelajaran</th>
                  <th className="py-4 px-6 text-gray-700 font-semibold">Kelas</th>
                  <th className="py-4 px-6 text-gray-700 font-semibold">Waktu</th>
                  <th className="py-4 px-6 text-gray-700 font-semibold">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {jadwal.map((ujian, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    key={ujian._id || idx}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-900 font-medium">{displayTanggal(ujian.tanggal)}</td>
                    <td className="py-4 px-6 text-gray-900">{ujian.mataPelajaran}</td>
                    <td className="py-4 px-6 text-gray-900">{ujian.kelas || '-'}</td>
                    <td className="py-4 px-6 text-gray-900">
                      {(ujian.jamMulai && ujian.jamSelesai)
                        ? `${ujian.jamMulai} - ${ujian.jamSelesai}`
                        : '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{ujian.keterangan || '-'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Jadwal dapat berubah sewaktu-waktu. Silakan periksa secara berkala.</p>
        </div>
      </div>
    </section>
  );
}