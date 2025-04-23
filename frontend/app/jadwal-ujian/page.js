'use client';
import { motion } from 'framer-motion';

export default function JadwalUjian() {
  // Data contoh jadwal ujian
  const jadwalUjian = [
    {
      id: 1,
      tanggal: "25 Oktober 2023",
      mataPelajaran: "Matematika",
      waktu: "08:00 - 10:00",
    },
    {
      id: 2,
      tanggal: "26 Oktober 2023",
      mataPelajaran: "Bahasa Indonesia",
      waktu: "08:00 - 10:00",
    },
    {
      id: 3,
      tanggal: "27 Oktober 2023",
      mataPelajaran: "Bahasa Inggris",
      waktu: "08:00 - 10:00",
    },
    {
      id: 4,
      tanggal: "28 Oktober 2023",
      mataPelajaran: "Fisika",
      waktu: "08:00 - 10:00",
    },
    {
      id: 5,
      tanggal: "29 Oktober 2023",
      mataPelajaran: "Kimia",
      waktu: "08:00 - 10:00",
    },
  ];

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
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Jadwal Ujian</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-24" />
        </div>

        {/* Tabel Jadwal Ujian */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-gray-700 font-semibold">Tanggal</th>
                <th className="py-3 px-4 text-gray-700 font-semibold">Mata Pelajaran</th>
                <th className="py-3 px-4 text-gray-700 font-semibold">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {jadwalUjian.map((ujian) => (
                <tr key={ujian.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-700">{ujian.tanggal}</td>
                  <td className="py-3 px-4 text-gray-700">{ujian.mataPelajaran}</td>
                  <td className="py-3 px-4 text-gray-700">{ujian.waktu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}