/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';

// SVG ICONS
const PlusIcon = () => (
  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
  </svg>
);
const EditIcon = () => (
  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6M6 19h12"/>
  </svg>
);
const TrashIcon = () => (
  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2h4z"/>
  </svg>
);

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
  const [file, setFile] = useState(null); // State untuk file upload
  // Mengambil token dari localStorage
  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("admin_token") || "");
    }
  }, []);

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
    if (token) {
      refresh();
    }
    // eslint-disable-next-line
  }, [token]);

  // Handler form:
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  // Handler khusus untuk input file
  const handleFileChange = (e) => setFile(e.target.files[0] || null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.title.trim() === "" ||
      form.description.trim() === "" ||
      (!file && !editing)
    ) {
      setErr("Judul, deskripsi, dan gambar wajib diisi!");
      return;
    }
    try {
      setLoading(true);
      setErr('');
      // Untuk create/edit: POST atau PUT
      const isEdit = !!editing;
      const url = isEdit
        ? `/api/admin/pengumuman/${editing._id}`
        : '/api/admin/pengumuman';
      const method = isEdit ? 'PUT' : 'POST';
      
      // Gunakan FormData untuk upload file
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.description);
      if (form.date) formData.append('date', form.date);
      if (file) formData.append('image', file);
      
      const r = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Jangan tambahkan Content-Type, browser akan otomatis set untuk FormData
        },
        body: formData,
      });
      if (!r.ok) throw new Error(await r.text());
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', description: '', date: '' }); // reset
      setFile(null); // reset file
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
    });
    setFile(null); // Reset file saat edit
    setShowForm(true);
  };

  // Untuk tombol tambah data:
  const handleNew = () => {
    setEditing(null);
    setForm({ title: '', description: '', date: '' });
    setFile(null);
    setShowForm(true);
  };

  return (
    <main className="max-w-5xl mx-auto pt-24 pb-10 px-4 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-10 text-blue-800 text-center tracking-tight drop-shadow-lg">
        <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Admin - Kelola Pengumuman
        </span>
      </h1>
      {err && (
        <div className="mb-4 px-4 py-2 bg-red-100 border-l-4 border-red-600 text-red-800 rounded animate-shake">
          {err}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center py-14">
          <svg className="animate-spin h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="ml-3 text-lg text-gray-500">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-7">
            <button
              onClick={handleNew}
              className="flex items-center gap-1 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition duration-200"
            >
              <PlusIcon />
              Tambah Pengumuman
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-blue-200 rounded-2xl shadow-lg flex flex-col justify-between min-h-[190px] p-6 relative hover:shadow-2xl transition group"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📢</span>
                    <h2 className="font-bold text-lg text-blue-900">{item.title}</h2>
                  </div>
                  <p className="text-gray-700 mb-3 whitespace-pre-line">{item.content || item.description}</p>
                  {item.imageUrl && (
                    <div className="w-full flex justify-center py-2">
                      <img
                        src={
                          item.imageUrl.startsWith('/uploads/')
                            ? `http://localhost:5000${item.imageUrl}` // patch untuk URL backend
                            : item.imageUrl
                        }
                        alt="Gambar pengumuman"
                        className="rounded-xl max-h-48 object-contain border"
                        style={{background:'#f8fafc'}}
                      />
                    </div>
                  )}
                  {item.date && (
                    <span className="inline-block bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">{item.date}</span>
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1 rounded-lg transition text-sm shadow border border-blue-100"
                    title="Edit"
                  >
                    <EditIcon />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-lg transition text-sm shadow border border-red-100"
                    title="Hapus"
                  >
                    <TrashIcon />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-gray-400 text-center py-12 text-xl">Belum ada pengumuman.</div>
            )}
          </div>
        </>
      )}

      {/* Modal/Form */}
      {showForm && (
        <div className="fixed left-0 top-0 w-full min-h-screen z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-30 transition-all duration-150">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl px-10 py-8 w-full max-w-lg shadow-2xl flex flex-col gap-6 border border-blue-100"
            encType="multipart/form-data"
          >
            <h2 className="font-bold text-xl mb-2 text-slate-700 flex items-center gap-2">
              {editing ? <EditIcon /> : <PlusIcon />}
              {editing ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
            </h2>
            <div className="space-y-3">
              <label className="block">
                <span className="font-semibold text-blue-800">Judul</span>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  value={form.title}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="font-semibold text-blue-800">Isi/Deskripsi</span>
                <textarea
                  name="description"
                  required
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                />
              </label>
              <label className="block">
                <span className="font-semibold text-blue-800">Gambar</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required={!editing}
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
                  onChange={handleFileChange}
                />
                {file && (
                  <div className="mt-2 text-sm text-gray-500">{file.name}</div>
                )}
              </label>
              <label className="block">
                <span className="font-semibold text-blue-800">Tanggal (opsional)</span>
                <input
                  type="text"
                  name="date"
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="cth: 11 November 2023"
                />
              </label>
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <button
                type="submit"
                className="bg-blue-700 text-white rounded px-6 py-2 font-bold hover:bg-blue-800 active:scale-95 shadow transition focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              >
                Simpan
              </button>
              <button
                type="button"
                className="bg-gray-200 rounded px-6 py-2 font-semibold hover:bg-gray-300 active:scale-95 shadow transition"
                onClick={() => { setShowForm(false); setEditing(null); setFile(null); }}
                disabled={loading}
              >
                Batal
              </button>
            </div>
            {err && <div className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm">{err}</div>}
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
