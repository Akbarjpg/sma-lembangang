'use client';
import { motion } from 'framer-motion';
import { HiOutlinePhone } from 'react-icons/hi';

export default function InformasiLengkap() {
  return (
    <section className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
        >
          Informasi Lengkap
        </motion.h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Tentang Program Akademik</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Halaman ini berisi detail penting seputar kegiatan akademik di SMA Muhammadiyah Lempangang,
            termasuk info proses belajar, keunggulan, jadwal penting, dan kontak yang bisa dihubungi untuk pertanyaan lebih lanjut.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Waktu pelajaran berlangsung: Senin - Sabtu, mulai 07.30 s/d 13.30</li>
            <li>Kurikulum nasional dan materi Muhammadiyah</li>
            <li>Pembelajaran berbasis kelompok</li>
            <li>Pengenalan teknologi komputer untuk seluruh siswa</li>
            <li>Bimbingan belajar dan konseling untuk siswa</li>
            <li>Berbagai kegiatan ekstrakurikuler</li>
          </ul>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 mb-2">Kontak & Pertanyaan</h3>
          <p className="mb-2 text-gray-700">
            Jika ada yang ingin ditanyakan seputar program, pendaftaran, atau kurikulum, silakan hubungi:
          </p>
          <div className="bg-blue-100 rounded-lg p-4 mb-2 flex items-center gap-2">
            <HiOutlinePhone className="text-blue-900 text-xl" />
            <span className="font-semibold text-blue-900">Ibu Siti (Guru BK):</span>
            <span className="tracking-wide font-bold text-base sm:text-lg text-blue-900 ml-1">0812-3456-7890</span>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 flex items-center gap-2">
            <HiOutlinePhone className="text-blue-900 text-xl" />
            <span className="font-semibold text-blue-900">Kantor Tata Usaha:</span>
            <span className="tracking-wide font-bold text-base sm:text-lg text-blue-900 ml-1">0411-123456</span>
          </div>
        </div>
      </div>
    </section>
  );
}
