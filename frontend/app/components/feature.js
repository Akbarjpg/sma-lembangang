'use client';
import { motion } from 'framer-motion'

import { HiOutlineMail, HiOutlinePencilAlt, HiOutlineQuestionMarkCircle, HiOutlineNewspaper, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi'; // Import ikon outline
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Google Maps
import Link from 'next/link';

// Komponen Peta
const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -5.147665, // Latitude lokasi SMA
    lng: 119.432732, // Longitude lokasi SMA
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> 
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15} 
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default function Features() {
  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden">
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
          <div className="text-left">
            <h2 className="text-5xl font-bold text-gray-900 mb-2">SMAN MUHAMMADIYAH</h2>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">LEMPANGANG</h2>
          </div>
          
          {/* Garis Pemisah */}
          <hr className="border-t-2 border-gray-300 mb-8" />

          {/* Deskripsi */}
          <div className="text-left">
            <p className="text-xl text-gray-700 mb-2">Mencetak Generasi Unggul dalam Prestasi,</p>
            <p className="text-xl text-gray-700 mb-14">Imtaq dan Imtek</p>
          </div>
          
          {/* Grid Card */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Visi Misi */}
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] relative z-10">
              <div className="relative w-16 h-16">
                {/* Kotak kedua (shadow) */}
                <div className="absolute bg-red-200 w-full h-full p-4 rounded-2xl shadow-md transform translate-x-[9px] translate-y-[9px] bg-opacity-30"></div>
                {/* Kotak utama */}
                <div className="bg-red-500 w-full h-full p-4 rounded-2xl shadow-md relative">
                  <HiOutlineMail className="text-white text-3xl" /> {/* Ikon outline */}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-7">Visi Misi</h3>
              <Link href="/AboutUs" passHref legacyBehavior>
                <button className="mt-4 px-6 py-2 bg-green-700 text-white text-sm font-semibold rounded-2xl hover:bg-green-800 transition-colors">
                  Selengkapnya
                </button>
              </Link>
            </motion.div>

            {/* Kepala Sekolah */}
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] relative z-10">
              <div className="relative w-16 h-16">
                {/* Kotak kedua (shadow) */}
                <div className="absolute bg-blue-200 w-full h-full p-4 rounded-2xl shadow-md transform translate-x-[9px] translate-y-[9px] bg-opacity-30"></div>
                {/* Kotak utama */}
                <div className="bg-blue-500 w-full h-full p-4 rounded-2xl shadow-md relative">
                  <HiOutlinePencilAlt className="text-white text-3xl" /> {/* Ikon outline */}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-7">Kepala Sekolah</h3>
              <Link href="/kepala-sekolah" passHref legacyBehavior>
                <button className="mt-4 px-6 py-2 bg-green-700 text-white text-sm font-semibold rounded-2xl hover:bg-green-800 transition-colors">
                  Selengkapnya
                </button>
              </Link>
            </motion.div>

            {/* Tentang Sekolah */}
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] relative z-10">
              <div className="relative w-16 h-16">
                {/* Kotak kedua (shadow) */}
                <div className="absolute bg-green-200 w-full h-full p-4 rounded-2xl shadow-md transform translate-x-[9px] translate-y-[9px] bg-opacity-30"></div>
                {/* Kotak utama */}
                <div className="bg-green-500 w-full h-full p-4 rounded-2xl shadow-md relative">
                  <HiOutlineQuestionMarkCircle className="text-white text-3xl" /> {/* Ikon outline */}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-7">Tentang Sekolah</h3>
              <Link href="/tentang-sekolah" passHref legacyBehavior>
                <button className="mt-4 px-6 py-2 bg-green-700 text-white text-sm font-semibold rounded-2xl hover:bg-green-800 transition-colors">
                  Selengkapnya
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bagian News */}
      <section className="py-20 bg-white relative overflow-hidden">
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
          <div className="text-left">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Berita Terbaru</h2>
            {/* Garis Bawah */}
            <hr className="border-t-2 border-gray-300 mb-8" />
          </div>
          
          {/* Grid Card (Vertikal) */}
          <div className="flex flex-col gap-6 mb-12">
            {/* Berita 1 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-start">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 p-4 rounded-2xl shadow-md">
                  <HiOutlineNewspaper className="text-white text-3xl" /> {/* Ikon outline */}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Penerimaan Siswa Baru 2025</h3>
              </div>
              <p className="text-gray-700 mt-4">Pendaftaran siswa baru untuk tahun ajaran 2025 telah dibuka. Segera daftarkan diri Anda!</p>
              <Link href="/penerimaan" passHref legacyBehavior>
                <button className="mt-4 px-6 py-2 bg-green-700 text-white text-sm font-semibold rounded-2xl hover:bg-green-800 transition-colors">
                  Baca Selengkapnya
                </button>
              </Link>
            </motion.div>

            {/* Berita 2 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-start">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500 p-4 rounded-2xl shadow-md">
                  <HiOutlineCalendar className="text-white text-3xl" /> {/* Ikon outline */}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Jadwal Ujian Semester</h3>
              </div>
              <p className="text-gray-700 mt-4">Jadwal ujian semester ganjil telah dirilis. Silakan cek jadwal Anda!</p>
              <Link href="/jadwal-ujian" passHref legacyBehavior>
                <button className="mt-4 px-6 py-2 bg-green-700 text-white text-sm font-semibold rounded-2xl hover:bg-green-800 transition-colors">
                  Baca Selengkapnya
                </button>
              </Link>
            </motion.div>

            {/* Berita 3 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-start">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-4 rounded-2xl shadow-md">
                  <HiOutlineUser className="text-white text-3xl" /> {/* Ikon outline */}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Kegiatan Ekstrakurikuler</h3>
              </div>
              <p className="text-gray-700 mt-4">Daftar kegiatan ekstrakurikuler telah diperbarui. Ayo bergabung dan kembangkan bakat Anda!</p>
              <Link href="/ekstrakurikuler" passHref legacyBehavior>
                <button className="mt-4 px-6 py-2 bg-green-700 text-white text-sm font-semibold rounded-2xl hover:bg-green-800 transition-colors">
                  Baca Selengkapnya
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Peta */}
          <div className="w-full flex justify-center">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.1245369678322!2d119.42882357572117!3d-5.243122452754461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee1c56f7c9fed%3A0x8fa0d059dc79550d!2sSMA%20Muhammadiyah%20Lempangang!5e0!3m2!1sid!2sid!4v1741721348608!5m2!1sid!2sid"
                width="1000"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
