/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiOutlineChevronRight } from 'react-icons/hi';

export default function KepalaSekolahPage() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -left-32 -top-32 w-[380px] h-[380px] bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -right-32 -bottom-32 w-[350px] h-[350px] bg-purple-100 rounded-full opacity-20 blur-xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl md:px-10 px-4 py-10 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <Image 
            src="/foto_kepsek.jpg" // ganti ke foto kepala sekolah yang ada di /public
            alt="Foto Kepala Sekolah"
            width={120}
            height={120}
            className="rounded-full shadow-xl mb-4 bg-blue-100 object-cover"
            priority
          />
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-900 mb-2">Drs. Ibu Kepala sekolah, S.Pd</h2>
          <span className="block text-base md:text-lg text-gray-700 mb-1">Kepala Sekolah</span>
        </div>

        <div className="mb-7">
          <h3 className="text-lg font-bold text-blue-700 mb-2">Sambutan Kepala Sekolah</h3>
          <p className="text-gray-800 leading-relaxed italic">
            "Assalamu'alaikum Warahmatullahi Wabarakatuh.  
            Dengan izin Allah, kami bertekad membimbing siswa-siswi menjadi generasi Islami yang unggul, cerdas, dan berakhlak mulia.  
            Di SMA Muhammadiyah Lempangang, kami yakin setiap anak punya potensi. Mari bersama membangun masa depan yang lebih baik dengan semangat disiplin, kejujuran, dan kebersamaan."
          </p>
          <span className="block mt-3 text-sm text-gray-600 font-semibold">- Drs. Ibu kepala sekolah, S.Pd</span>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 mb-5 shadow text-left">
          <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2">Profil Singkat</h4>
          <ul className="list-disc list-inside text-blue-900 text-sm md:text-base space-y-1">
            <li>Berlatar belakang pendidikan S1 Pendidikan</li>
            <li>Berkiprah lebih dari 15 tahun di dunia pendidikan</li>
            <li>Peduli pembinaan karakter dan pembiasaan ibadah</li>
            <li>Aktif dalam kegiatan sosial dan kemasyarakatan</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/AboutUs"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-700 text-white text-lg font-semibold rounded-2xl drop-shadow-md hover:to-green-700 hover:from-blue-700 transition-colors"
          >
            <span>Kembali ke Profil Sekolah</span>
            <HiOutlineChevronRight className="ml-2 text-2xl" />
          </a>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-slate-100 hover:bg-blue-100 text-blue-700 text-lg font-semibold rounded-2xl transition-colors"
          >
            Beranda
          </a>
        </div>
      </motion.div>
    </section>
  );
}