'use client';
import { useEffect, useState } from 'react';

// UTIL: Helper fetch wrapper
const fetchPengumuman = async (token) => {
  const res = await fetch('/api/admin/pengumuman', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal ambil data');
  return await res.json();
};

export default function AdminPengumumanPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '' });
  // TODO: ganti dengan mekanisme login-admin (localStorage/cookie dsb)
  const token = ""; // <-- GANTI: simpan token login admin di sini!

  // Ambil data pada load / perubahan
  const refresh = async () => {
    try {
      setLoading(true);
      setErr('');
      const data = await fetchPengumuman(token);
      setItems(data);
    } catch (e) {
      setErr(e.message || 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  // Handler form:
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr('');
      // Untuk create/edit: POST atau PUT
      const isEdit = !!editing;
      const url = isEdit
        ? `/api/admin/pengumuman/${editing._id}`
        : '/api/admin/pengumuman';
      const method = isEdit ? 'PUT' : 'POST';
      const body = JSON.stringify({
        title: form.title,
        content: form.description,
        date: form.date, // optionally, backend could auto-generate date
        imageUrl: form.imageUrl, // opsional, jika ingin upload gambar.
      });
      const r = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      if (!r.ok) throw new Error(await r.text());
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', description: '', date: '' }); // reset
      await refresh();
    } catch (e) {
      setErr(e.message || 'Error saat simpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus pengumuman ini?')) return;
    try {
      setLoading(true);
      setErr('');
      await fetch(`/api/admin/pengumuman/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await refresh();
    } catch (e) {
      setErr('Gagal hapus data.');
    } finally {
      setLoading(false);
    }
  };

  // Untuk edit data:
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.content || item.description,
      date: item.date || '',
      imageUrl: item.imageUrl || '',
    });
    setShowForm(true);
  };

  // Untuk tombol tambah data:
  const handleNew = () => {
    setEditing(null);
    setForm({ title: '', description: '', date: '' });
    setShowForm(true);
  };

  return (
    <main className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-blue-800">Admin - Kelola Pengumuman</h1>
      {err && <p className="mb-4 text-red-600">{err}</p>}
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <>
          <button
            onClick={handleNew}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Tambah Pengumuman
          </button>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-lg border shadow flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{item.content || item.description}</p>
                {item.date && (
                  <div className="text-xs text-gray-500">Tanggal: {item.date}</div>
                )}
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-gray-400 text-center py-10">Belum ada pengumuman.</div>
            )}
          </div>
        </>
      )}

      {/* Modal/Form */}
      {showForm && (
        <div className="fixed left-0 top-0 w-full min-h-screen bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl px-8 py-6 w-full max-w-md shadow-xl flex flex-col gap-4"
          >
            <h2 className="font-bold text-xl mb-2">
              {editing ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
            </h2>
            <label className="block">
              Judul
              <input
                type="text"
                name="title"
                required
                className="w-full border rounded p-2 mt-1"
                value={form.title}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Isi/Deskripsi
              <textarea
                name="description"
                required
                className="w-full border rounded p-2 mt-1"
                value={form.description}
                onChange={handleChange}
                rows={4}
              />
            </label>
            <label className="block">
              Tanggal (opsional)
              <input
                type="text"
                name="date"
                className="w-full border rounded p-2 mt-1"
                value={form.date}
                onChange={handleChange}
                placeholder="cth: 11 November 2023"
              />
            </label>
            {/* <label className="block">
              Gambar (sementara by url/file, bisa diimprove)
              <input
                type="text"
                name="imageUrl"
                className="w-full border rounded p-2 mt-1"
                value={form.imageUrl || ''}
                onChange={handleChange}
                placeholder="URL gambar (optional)"
              />
            </label> */}
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-700 text-white rounded px-4 py-2 hover:bg-blue-800"
                disabled={loading}
              >
                Simpan
              </button>
              <button
                type="button"
                className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
                onClick={() => { setShowForm(false); setEditing(null); }}
                disabled={loading}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

// -- NOTES DEV --
// - Endpoint diarahkan ke `/api/admin/pengumuman` (GET, POST, PUT, DELETE). 
// - Authorization token HARUS diisi (sudah ada auth-middleware di backend!)
// - Untuk demo, login/admin/token disimpan/manual, integrasi login user bisa menyusul.
// - Gambar pengumuman bisa di-improve: sekarang pakai field imageUrl (string) jika diinginkan.
// - Jika backend respon field "content" bukan "description", code handle kedua nama field.
// - Komponen ini siap dikembangkan lebih lanjut, misal drag-n-drop urutan, upload file, dsb.