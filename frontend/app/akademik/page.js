'use client';
import { motion } from 'framer-motion';

export default function Akademik() {
  return (
    <section className="py-20 bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        
        {/* Pola Dekoratif di Pojok Kiri dan Kanan */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-100 rounded-full opacity-30"></div>
      </div>

      {/* Card Utama */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl mx-4 relative z-10 text-center"
      >
        {/* Judul */}
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Program Akademik</h2>
        
        {/* Garis Pemisah */}
        <hr className="border-t-2 border-gray-300 mb-8" />

        {/* Deskripsi Program Akademik */}
        <p className="text-xl text-gray-700 mb-6">
          SMA Muhammadiyah Lempangang menawarkan berbagai program akademik yang dirancang untuk mengembangkan potensi siswa secara holistik. Kami menyediakan kurikulum yang komprehensif dan fasilitas pendukung yang lengkap.
        </p>

        {/* Informasi Program Akademik */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Program IPA */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Program IPA</h3>
            <p className="text-gray-700">
              Program IPA dirancang untuk siswa yang memiliki minat dan bakat di bidang sains dan teknologi. Fokus pada penguasaan konsep-konsep fisika, kimia, dan biologi.
            </p>
          </div>

          {/* Program IPS */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Program IPS</h3>
            <p className="text-gray-700">
              Program IPS dirancang untuk siswa yang tertarik pada bidang sosial, ekonomi, dan humaniora. Fokus pada pengembangan pemahaman tentang masyarakat dan lingkungan.
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8">
          <a
            href="/informasi" // Ganti dengan link yang sesuai
            className="inline-flex items-center px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-2xl hover:bg-green-800 transition-colors"
          >
            Lihat Informasi Lengkap
          </a>
        </div>
      </motion.div>
    </section>
  );
}