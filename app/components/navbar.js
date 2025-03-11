'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/AboutUs' },
    { name: 'Akademik', href: '/akademik' },
    { name: 'Informasi', href: '#' }, // Informasi akan memiliki submenu
    { name: 'Kontak', href: '/kontak' }
  ];

  const subMenuItems = [
    { name: 'Pengumuman', href: '/Pengumuman' },
    { name: 'Jadwal Ujian', href: '/jadwal-ujian' },
    { name: 'Ekstrakurikuler', href: '/ekstrakurikuler' }
  ];

  return (
    <>
      {/* Navbar Utama */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-50 bg-transparent">
        <div className="flex items-center space-x-3">
          <img src="/logo.jpeg" alt="Logo" className="h-16 ml-7" />
        </div>
        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
          {menuItems.map((menu, index) => (
            <li key={index} className="relative group cursor-pointer">
              {menu.name === 'Informasi' ? (
                <button 
                  onClick={() => setSubMenuOpen(!subMenuOpen)} 
                  className="flex items-center font-bold focus:outline-none"
                >
                  {menu.name}
                  <motion.span
                    animate={{ rotate: subMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline text-sm ml-1"
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>
              ) : (
                <Link href={menu.href} className="block font-bold">
                  {menu.name}
                </Link>
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
              
              {menu.name === 'Informasi' && subMenuOpen && (
                <ul 
                  ref={menuRef} 
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden"
                >
                  {subMenuItems.map((submenu, index) => (
                    <li key={index}>
                      <Link href={submenu.href} className="block px-4 py-2 hover:bg-gray-100">
                        {submenu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
