'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsDetailPage({ params }) {
  const { slug } = params;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example: fetch from backend API by slug (adjust URL as needed)
  useEffect(() => {
    if (!slug) return;
    async function fetchNews() {
      setLoading(true);
      try {
        // TODO: Ganti URL berikut sesuai endpoint backend API
        const res = await fetch(`/api/news/${slug}`);
        if (!res.ok) throw new Error('Berita tidak ditemukan');
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setNews(null);
      }
      setLoading(false);
    }
    fetchNews();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!news) return <div className="p-8 text-center">Berita tidak ditemukan.</div>;

  return (
    <main className="max-w-3xl mx-auto py-14 px-4">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{news.date}</p>
      {news.image && (
        <img src={news.image} alt={news.title} className="mb-6 rounded-xl w-full object-cover" />
      )}
      <article className="prose max-w-none text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: news.content }} />
      <div className="mt-10">
        <button
          onClick={() => window.history.back()}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Kembali
        </button>
      </div>
    </main>
  );
}

// Catatan untuk developer:
// - Dynamic route [slug] memungkinkan URL seperti /news/penerimaan-siswa-baru-2024
// - data berita bisa diambil via API dari backend dengan fetch
// - Endpoint `/api/news/[slug]` dapat diubah sesuai struktur backend-mu
// - Frontend ini hanya template, belum connect ke backend asli