'use client';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'; // Import ikon outline

export default function Kontak() {
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
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          {/* Garis Bawah */}
          <hr className="border-t-2 border-gray-300 mx-auto w-24" />
        </div>

        {/* Grid Konten */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Informasi Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informasi Kontak</h3>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <HiOutlineMail className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-gray-700">Email</p>
                  <p className="text-gray-900 font-semibold">info@sma-lempangang.sch.id</p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500 p-3 rounded-full">
                  <HiOutlinePhone className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-gray-700">Telepon</p>
                  <p className="text-gray-900 font-semibold">+62 123 4567 890</p>
                </div>
              </div>

              {/* Alamat */}
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <HiOutlineLocationMarker className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-gray-700">Alamat</p>
                  <p className="text-gray-900 font-semibold">
                    Jl. Pendidikan No. 123, Lempangang, Makassar, Sulawesi Selatan
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulir Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-2xl rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              {/* Nama */}
              <div>
                <label htmlFor="nama" className="block text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="pesan" className="block text-gray-700 mb-1">Pesan</label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan pesan Anda"
                  required
                ></textarea>
              </div>

              {/* Tombol Kirim */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>

        {/* Peta Lokasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.1245369678322!2d119.42882357572117!3d-5.243122452754461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee1c56f7c9fed%3A0x8fa0d059dc79550d!2sSMA%20Muhammadiyah%20Lempangang!5e0!3m2!1sid!2sid!4v1741721348608!5m2!1sid!2sid"
                width="1000"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </motion.div>
      </div>
    </section>
  );
}