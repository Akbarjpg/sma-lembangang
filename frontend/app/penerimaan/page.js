import React from "react";

export default function PenerimaanPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white/80 shadow-xl rounded-xl p-6 sm:p-10 flex flex-col items-center max-w-2xl w-full border border-green-200">
        <img
          src="/penerimaan.jpeg"
          alt="Pengumuman Penerimaan Siswa Baru"
          className="rounded-lg shadow-md mb-6 max-w-full w-auto"
          style={{ maxHeight: "420px", objectFit: "contain" }}
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-3 drop-shadow-sm">
          Penerimaan Siswa Baru <span className="text-green-600">Telah Dibuka!</span>
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Segera daftarkan diri Anda untuk mengikuti proses seleksi peserta didik baru. Untuk informasi lebih lanjut, silakan hubungi salah satu nomor WhatsApp berikut:
        </p>

        <div className="flex flex-col gap-3 mb-2 w-full max-w-xs mx-auto">
          <a
            href="https://wa.me/6281355144966"
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 hover:bg-green-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#25D366"/>
              <path d="M17 15.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.3.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.1-1.4-.8-.8-1.4-2-.6-2.2.2-.1.4-.3.5-.5.1-.1.1-.3.2-.5 0-.2 0-.4 0-.6 0-.1 0-.3-.2-.5-.2-.2-.4-.5-.6-.7-.3-.3-.5-.3-.7-.3-.2 0-.4 0-.6.1-.7.3-1.3 1.1-1.4 2-.2 1.4.5 2.8 2.2 4.5 2.2 2.2 4.4 2.3 5.9 2.2.9-.1 1.7-.7 2-1.4.1-.2.2-.4.1-.6 0-.2-.1-.4-.3-.7-.2-.1-.5-.2-.7-.2z" fill="#fff" />
            </svg>
            +62 813-5514-4966
          </a>
          <a
            href="https://wa.me/6285395222205"
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 hover:bg-green-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#25D366"/>
              <path d="M17 15.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.3.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.1-1.4-.8-.8-1.4-2-.6-2.2.2-.1.4-.3.5-.5.1-.1.1-.3.2-.5 0-.2 0-.4 0-.6 0-.1 0-.3-.2-.5-.2-.2-.4-.5-.6-.7-.3-.3-.5-.3-.7-.3-.2 0-.4 0-.6.1-.7.3-1.3 1.1-1.4 2-.2 1.4.5 2.8 2.2 4.5 2.2 2.2 4.4 2.3 5.9 2.2.9-.1 1.7-.7 2-1.4.1-.2.2-.4.1-.6 0-.2-.1-.4-.3-.7-.2-.1-.5-.2-.7-.2z" fill="#fff" />
            </svg>
            +62 853-9522-2205
          </a>
          <a
            href="https://wa.me/6282346511133"
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 hover:bg-green-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#25D366"/>
              <path d="M17 15.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.3.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.1-1.4-.8-.8-1.4-2-.6-2.2.2-.1.4-.3.5-.5.1-.1.1-.3.2-.5 0-.2 0-.4 0-.6 0-.1 0-.3-.2-.5-.2-.2-.4-.5-.6-.7-.3-.3-.5-.3-.7-.3-.2 0-.4 0-.6.1-.7.3-1.3 1.1-1.4 2-.2 1.4.5 2.8 2.2 4.5 2.2 2.2 4.4 2.3 5.9 2.2.9-.1 1.7-.7 2-1.4.1-.2.2-.4.1-.6 0-.2-.1-.4-.3-.7-.2-.1-.5-.2-.7-.2z" fill="#fff" />
            </svg>
            +62 823-4651-1133
          </a>
        </div>
      </div>
    </main>
  );
}
