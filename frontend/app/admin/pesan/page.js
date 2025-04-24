'use client';
import { useEffect, useState } from "react";

/**
 * Halaman admin untuk menampilkan daftar pesan dari pengguna
 */
export default function PesanAdminPage() {
  const [pesanList, setPesanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPesan = async () => {
      setLoading(true);
      setError('');
      try {
        // Pastikan backend endpoint sesuai alamat & port backend Express kamu
        const res = await fetch('http://localhost:5000/api/kontak', {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) throw new Error('Gagal mendapatkan data');
        const data = await res.json();
        setPesanList(Array.isArray(data) ? data : (data.data || []));
      } catch (err) {
        setError('Gagal mengambil pesan. Pastikan backend berjalan dan endpoint benar.');
      } finally {
        setLoading(false);
      }
    };
    fetchPesan();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Daftar Pesan Masuk</h1>
      {loading && <div>Memuat...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        pesanList.length === 0 ? (
          <div className="text-gray-600">Belum ada pesan masuk.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Nama</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Pesan</th>
                  <th className="px-4 py-2 border-b">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {pesanList.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.pesan}</td>
                    <td className="px-4 py-2 text-nowrap">{new Date(item.createdAt).toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </main>
  );
}