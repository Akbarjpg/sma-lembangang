'use client';
import { motion } from 'framer-motion';

export default function Ekstrakurikuler() {
  // Data contoh ekstrakurikuler
  const ekstrakurikuler = [
    {
      id: 1,
      nama: "Pramuka",
      deskripsi: "Kegiatan pramuka bertujuan untuk melatih kedisiplinan, kepemimpinan, dan keterampilan hidup.",
      jadwal: "Setiap Sabtu, 13:00 - 15:00",
    },
    {
      id: 2,
      nama: "Basket",
      deskripsi: "Ekstrakurikuler basket untuk mengembangkan bakat olahraga dan kerja sama tim.",
      jadwal: "Setiap Senin & Kamis, 15:00 - 17:00",
    },
    {
      id: 3,
      nama: "Paduan Suara",
      deskripsi: "Kegiatan paduan suara untuk mengasah bakat musik dan vokal siswa.",
      jadwal: "Setiap Rabu, 14:00 - 16:00",
    },
    {
      id: 4,
      nama: "Robotik",
      deskripsi: "Ekstrakurikuler robotik untuk mengembangkan keterampilan teknologi dan inovasi.",
      jadwal: "Setiap Jumat, 13:00 - 15:00",
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
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Ekstrakurikuler</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-24" />
        </div>

        {/* Daftar Ekstrakurikuler */}
        <div className="grid md:grid-cols-2 gap-6">
          {ekstrakurikuler.map((ekskul) => (
            <motion.div
              key={ekskul.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ekskul.id * 0.1 }}
              className="bg-white shadow-2xl rounded-2xl p-6 text-left"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{ekskul.nama}</h3>
              <p className="text-gray-700 mb-4">{ekskul.deskripsi}</p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Jadwal:</span> {ekskul.jadwal}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}