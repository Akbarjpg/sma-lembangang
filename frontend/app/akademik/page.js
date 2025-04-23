'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Akademik() {
  return (
    <section className="py-8 md:py-20 bg-white relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        
        {/* Pola Dekoratif di Pojok Kiri dan Kanan */}
        <div className="absolute -left-20 -top-20 w-64 md:w-96 h-64 md:h-96 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-64 md:w-96 h-64 md:h-96 bg-purple-100 rounded-full opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Judul Halaman */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center"
        >
          Program Akademik
        </motion.h1>

        {/* Bagian Hero dengan Gambar dan Deskripsi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <img
                src="/example1.jpeg"
                alt="Ilustrasi Akademik"
                className="w-full h-auto rounded-lg shadow object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                <span className="font-bold">SMA Muhammadiyah Lempangang</span> hadir sebagai sekolah menengah atas yang menonjolkan keunggulan dalam pembinaan karakter Islami, pembiasaan ibadah, dan juga suasana belajar yang penuh kekeluargaan. 
                Di sekolah ini, setiap siswa didorong untuk berprestasi, ramah, berakhlak mulia, serta aktif dalam kegiatan keagamaan.
              </p>
              <ul className="list-disc list-inside text-base md:text-lg text-gray-700 mb-4">
                <li><span className="font-semibold text-green-700">Pendidikan agama Islam yang kuat</span> dan pembiasaan ibadah harian</li>
                <li>Kegiatan keagamaan: shalat berjamaah, kultum, tilawah, dan peringatan hari besar Islam</li>
                <li>Suasana sekolah yang hangat, guru dekat dengan siswa</li>
                <li>Belajar kelompok IPA & IPS sesuai minat, didampingi guru kompeten</li>
                <li>Pengenalan teknologi & komputer sesuai perkembangan, dipadukan dengan nilai Islami</li>
                <li>Pembentukan karakter: disiplin, jujur, peduli, dan mandiri</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Program Akademik Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {/* Program IPA */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Program IPA</h3>
            <p className="text-gray-700 mb-4">
              Program IPA di sekolah kami tidak hanya menguatkan pengetahuan sains (matematika, fisika, biologi), tapi juga menanamkan adab Islami saat belajar. Siswa dibimbing agar giat bertanya, berpikir kritis, dan selalu berperilaku santun kepada guru serta teman.
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600">
              <li>Pemahaman konsep-konsep dasar sains</li>
              <li>Diskusi aktif dengan penguatan nilai karakter</li>
              <li>Kegiatan praktik sederhana yang menyenangkan</li>
            </ul>
          </div>

          {/* Program IPS */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Program IPS</h3>
            <p className="text-gray-700 mb-4">
              Program IPS menyiapkan siswa memahami lingkungan sosial, budaya, dan ekonomi. Kelas berlangsung santai namun berbobot, didorong untuk mengamalkan nilai-nilai Islam dalam kehidupan sehari-hari seperti kejujuran, solidaritas, dan rasa hormat.
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600">
              <li>Pembelajaran sosial berbasis pengalaman nyata</li>
              <li>Sering diskusi, studi kasus & cerita kehidupan</li>
              <li>Pembinaan karakter Islami: peduli, sopan, rendah hati</li>
            </ul>
          </div>
        </motion.div>

        {/* Tombol Aksi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="/informasi"
            className="inline-flex items-center px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-xl hover:bg-green-800 transition-colors"
          >
            Lihat Informasi Lengkap
          </a>
        </motion.div>
      </div>
    </section>
  );
}
