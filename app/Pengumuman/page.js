'use client';
import { motion } from 'framer-motion';

export default function Pengumuman() {
  // Data contoh pengumuman
  const announcements = [
    {
      id: 1,
      title: "Penerimaan Siswa Baru 2024",
      description: "Pendaftaran siswa baru untuk tahun ajaran 2024 telah dibuka. Segera daftarkan diri Anda!",
      date: "15 Oktober 2023",
    },
    {
      id: 2,
      title: "Jadwal Ujian Semester Ganjil",
      description: "Jadwal ujian semester ganjil telah dirilis. Silakan cek jadwal Anda di portal siswa.",
      date: "20 Oktober 2023",
    },
    {
      id: 3,
      title: "Kegiatan Ekstrakurikuler",
      description: "Daftar kegiatan ekstrakurikuler telah diperbarui. Ayo bergabung dan kembangkan bakat Anda!",
      date: "25 Oktober 2023",
    },
    {
      id: 4,
      title: "Libur Hari Guru Nasional",
      description: "Sekolah akan libur pada tanggal 25 November 2023 dalam rangka memperingati Hari Guru Nasional.",
      date: "10 November 2023",
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
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Pengumuman</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-24" />
        </div>

        {/* Daftar Pengumuman */}
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: announcement.id * 0.1 }}
              className="bg-white shadow-2xl rounded-2xl p-6 text-left"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
              <p className="text-gray-700 mb-4">{announcement.description}</p>
              <p className="text-sm text-gray-500">Tanggal: {announcement.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}