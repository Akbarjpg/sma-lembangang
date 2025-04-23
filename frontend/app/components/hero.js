'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <>
      {/* MOBILE SECTION: Text overlay on image */}
      <div className="relative md:hidden min-h-[340px] w-full flex items-center justify-center">
        {/* Image */}
        <Image
          src="/contoh1.jpeg"
          width={700}
          height={700}
          alt="Hero Image"
          className="w-full h-[340px] object-cover brightness-75"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md text-center mb-2"
          >
            SMA Muhammadiyah Lempangang
          </motion.h1>
          <p className="text-base xs:text-lg text-white drop-shadow-md text-center mb-4">
            SMA Muhammadiyah Lempangang adalah sekolah yang berada di Makassar, Kabupaten Gowa.
          </p>
          <Link href="/akademik" passHref legacyBehavior>
            <button className="w-full max-w-xs px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      
      {/* DESKTOP SECTION: Two-column layout */}
      <div className="hidden md:flex min-h-screen flex-row items-center relative bg-white">
        {/* Left Section (Text) */}
        <div className="w-1/2 px-16 md:px-24 text-left">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
            SMA Muhammadiyah Lempangang
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            SMA Muhammadiyah Lempangang adalah sekolah yang berada di Makassar, Kabupaten Gowa.
          </p>
          <Link href="/akademik" passHref legacyBehavior>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
        
        {/* Right Section (Image) */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-1/2 h-screen flex justify-end"
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
    </>
  );
}
