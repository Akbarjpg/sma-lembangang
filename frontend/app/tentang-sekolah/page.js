/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function visiSekolah() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-purple-900 mb-6 text-center"
        >
          Tentang SMA Muhammadiyah Lempangang
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-7">
          <Image
            src="/example1.jpeg"
            alt="Foto SMA"
            width={240}
            height={140}
            className="rounded-2xl shadow-xl object-cover"
            priority
          />
          <div className="text-base md:text-lg text-gray-800 text-justify">
            <p className="mb-4">
              <span className="font-bold">SMA Muhammadiyah Lempangang</span> merupakan sekolah menengah atas yang hadir di tengah masyarakat dengan membawa semangat pendidikan Islami, kekeluargaan, dan pembinaan karakter.
            </p>
            <p className="mb-4">
              Walaupun berukuran kecil, sekolah kami menjadi tempat tumbuhnya generasi berakhlak, disiplin, dan penuh prestasi, baik di bidang akademik maupun keagamaan. Kami dikenal lingkungan yang ramah, gotong-royong, dan menanamkan pembiasaan ibadah sejak dini.
            </p>
            <p>
              Setiap siswa dibina untuk selalu berbuat jujur, saling menghargai, serta aktif mengikuti kegiatan sekolah maupun keagamaan. Inilah yang menjadi keunggulan utama SMA Muhammadiyah Lempangang untuk mencetak lulusan yang unggul dalam iman, ilmu, dan akhlak mulia.
            </p>
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl shadow p-6 mt-4 text-center">
          <h2 className="text-lg md:text-xl font-bold text-purple-800 mb-2">Keunggulan Kami</h2>
          <ul className="list-disc list-inside text-gray-900 text-left max-w-xl mx-auto mx">
            <li>BTQ (Baca Tulis AL-Qur'an)</li>
            <li>Shalat Dhuha</li>
            <li>Garasi (Gerakan Literasi Numerasi)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}