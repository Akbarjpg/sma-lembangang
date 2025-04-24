'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoMobileOpen, setInfoMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/AboutUs' },
    { name: 'Akademik', href: '/akademik' },
    { name: 'Informasi', href: '#', hasSubmenu: true },
    { name: 'Kontak', href: '/kontak' }
  ];

  const subMenuItems = [
    { name: 'Pengumuman', href: '/Pengumuman' },
    { name: 'Jadwal Ujian', href: '/jadwal-ujian' },
    { name: 'Ekstrakurikuler', href: '/ekstrakurikuler' }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.menu-button')
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || mobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.jpeg" alt="Logo" className="h-12 w-auto" />
            <span className="ml-3 text-lg font-bold text-gray-800 hidden sm:block">SMA Negeri</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((menu, index) => (
              <div key={index} className="relative group">
                {menu.hasSubmenu ? (
                  <>
                    <button
                      tabIndex={0}
                      className="flex items-center text-gray-800 hover:text-blue-600 font-medium focus:outline-none"
                      aria-haspopup="true"
                      aria-expanded="false"
                      // Tidak ada onClick! Hanya hover
                    >
                      {menu.name}
                      <motion.span
                        animate={{ rotate: 0 }}
                        className="inline text-sm ml-1"
                      >
                        <FaChevronDown />
                      </motion.span>
                    </button>
                    {/* Hover underline effect */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform" />

                    {/* Submenu: tampil saat hover saja */}
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {subMenuItems.map((submenu, idx) => (
                        <Link
                          key={idx}
                          href={submenu.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          {submenu.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="text-gray-800 hover:text-blue-600 font-medium"
                  >
                    {menu.name}
                  </Link>
                )}
                {!menu.hasSubmenu && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
                )}
              </div>
            ))}
          </div>

          {/* Login Button for Desktop */}
          <div className="hidden md:block">
            <Link
              href="/admin/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              🔑 Login Admin/Guru
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="menu-button text-gray-800 hover:text-blue-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((menu, index) => (
              <div key={index}>
                {menu.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => setInfoMobileOpen(!infoMobileOpen)}
                      className="w-full flex justify-between items-center px-3 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-md"
                    >
                      {menu.name}
                      <FaChevronDown className={`transition-transform duration-300 ${infoMobileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {infoMobileOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {subMenuItems.map((submenu, idx) => (
                          <Link
                            key={idx}
                            href={submenu.href}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {submenu.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="block px-3 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Login Button for Mobile */}
            <Link
              href="/admin/login"
              className="block px-3 py-2 mt-2 text-center bg-blue-600 text-white font-medium rounded-md hover:bg-blue-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔑 Login Admin/Guru
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}