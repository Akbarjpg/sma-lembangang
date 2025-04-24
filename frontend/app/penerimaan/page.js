import React from "react";

export default function PenerimaanPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-3 text-green-700">Penerimaan Siswa Baru</h1>
        <hr className="border-t-2 border-gray-200 mb-6" />
        <p className="text-lg text-gray-800 mb-10">
          Saat ini, pendaftaran siswa baru belum dibuka.<br />
          Silakan cek kembali secara berkala untuk informasi penerimaan selanjutnya.
        </p>
        {/* Optionally, add an image or icon */}
        <div className="flex justify-center mb-4">
          <svg width="60" height="60" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#e5e7eb"/>
            <path d="M12 8v4l3 2" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="inline-block text-base text-gray-500">Penerimaan Akan Datang</span>
      </div>
    </main>
  );
}