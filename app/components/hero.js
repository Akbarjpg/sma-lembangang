'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center relative bg-white">
      {/* Left Section (Text) */}
      <div className="md:w-1/2 px-16 md:px-24 text-center md:text-left">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
          SMA Muhammadiyah Lempangang
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          SMA Muhammadiyah Lempangang adalah sekolah yang berada di Makassar, Kabupaten Gowa.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700">
          Get Started
        </button>
      </div>
      
      {/* Right Section (Image) */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 h-screen flex justify-end"
      >
        <Image 
          src="/contoh1.jpeg" 
          width={700} 
          height={700} 
          alt="Hero Image" 
          className="w-full h-full object-cover shadow-2xl shadow-gray-500/50"
        />
      </motion.div>
    </div>
  );
}
