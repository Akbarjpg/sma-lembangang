'use client';
import { motion } from 'framer-motion';

export default function Profile() {
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
        <h2 className="text-5xl font-bold text-gray-900 mb-6">SMA Muhammadiyah Lempangang</h2>
        
        {/* Garis Pemisah */}
        <hr className="border-t-2 border-gray-300 mb-8" />

        {/* Deskripsi Sekolah */}
        <p className="text-xl text-gray-700 mb-6">
          SMA Muhammadiyah Lempangang adalah sekolah unggulan yang berkomitmen untuk mencetak generasi muda yang berprestasi, berakhlak mulia, dan berwawasan luas. Kami menyediakan lingkungan belajar yang nyaman dan mendukung untuk mengembangkan potensi siswa.
        </p>

        {/* Informasi Tambahan */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Visi */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Visi</h3>
            <p className="text-gray-700">
              Menjadi sekolah terdepan dalam mencetak generasi unggul yang beriman, berilmu, dan berakhlak mulia.
            </p>
          </div>

          {/* Misi */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Misi</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Menyelenggarakan pendidikan berkualitas.</li>
              <li>Mengembangkan potensi siswa secara holistik.</li>
              <li>Menanamkan nilai-nilai keislaman dan kebangsaan.</li>
            </ul>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8">
          <a
            href="/berita" // Ganti dengan link yang sesuai
            className="inline-flex items-center px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-2xl hover:bg-green-800 transition-colors"
          >
            Lihat Berita Terbaru
          </a>
        </div>
      </motion.div>
    </section>
  );
}