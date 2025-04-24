/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiOutlineChevronRight } from 'react-icons/hi';

export default function Profile() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white min-h-screen flex items-center justify-center">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -left-32 -top-32 w-[400px] h-[400px] bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl md:px-14 px-4 py-10 relative z-10"
      >
        {/* Atas: Identitas dan Foto */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="flex-shrink-0">
            <Image 
              src="/logo.jpeg"
              alt="Logo SMA"
              width={120}
              height={120}
              className="rounded-full shadow-md mx-auto bg-white"
              priority
            />
          </div>
          <div className="text-center md:text-left w-full">
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-2 leading-snug">
              SMA Muhammadiyah Lempangang
            </h2>
            <div className="max-w-xl mx-auto md:mx-0">
              <p className="text-lg md:text-xl text-gray-700 mb-1">
                Mendidik generasi Islami yang berprestasi dan berakhlak mulia dalam suasana sekolah yang nyaman, akrab, dan inovatif. 
                Sekolah kami mengedepankan nilai kebersamaan, ibadah, dan pengembangan potensi siswa.
              </p>
            </div>
          </div>
        </div>

        {/* Info Visi Misi: Highlight Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="bg-blue-50 border-l-8 border-blue-400 rounded-2xl p-7 shadow-lg flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">Visi</h3>
            <p className="text-gray-700 text-base md:text-lg">
              Mewujudkan generasi islami yang unggul, inovaatif, dan berdaya saing global sebagai implementasi merdeka berlajar.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5 }}
            className="bg-green-50 border-l-8 border-green-400 rounded-2xl p-7 shadow-lg flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Misi</h3>
            <ul className="list-disc list-inside text-gray-700 text-base md:text-lg space-y-1">
              <li>Menanamkan nilai-nilai keimanan dan ketaqwaan kepada Allah SWT.</li>
              <li>Membentuk generasi yang kreatif, berdedikasi penuh karya dan memiliki keterampilan.</li>
              <li>Meningkatkan kreativitas dan inovasi.</li>
              <li>Menerapkan disiplin dan menghargai waktu.</li>
              <li>Menciptakan lingkungan sekolah yang sehat sebagai pembentukan akhlak dan tempat berkreasi.</li>
            </ul>
          </motion.div>
        </div>

        {/* Optional Info Kepala Sekolah */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-md rounded-xl p-6 shadow w-full max-w-md">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Sambutan Kepala Sekolah</h4>
            <p className="text-gray-800 italic mb-1">
              "SMA Muhammadiyah Lempangang tidak hanya mendidik secara akademik, tapi juga memberi perhatian besar pada pembiasaan ibadah, kejujuran, dan kebersamaan. Siswa-siswi kami diarahkan menjadi insan yang berilmu, santun, dan siap menghadapi era digital dengan nilai Islami."
            </p>
            <span className="text-sm font-semibold text-blue-700 block mt-3">- Drs. Ahmad, S.Pd (Kepala Sekolah)</span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-2">
          <a
            href="/berita"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-700 text-white text-lg font-semibold rounded-2xl drop-shadow-md hover:to-green-700 hover:from-blue-700 transition-colors"
          >
            <span>Lihat Berita Terbaru</span>
            <HiOutlineChevronRight className="ml-2 text-2xl" />
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 hover:bg-blue-100 text-blue-700 text-lg font-semibold rounded-2xl transition-colors"
          >
            Kembali ke Beranda
          </a>
        </div>
      </motion.div>
    </section>
  );
}
