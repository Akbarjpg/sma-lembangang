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

const fetchEkstrakurikuler = async (token) => {
  const res = await fetch('http://localhost:5000/api/admin/ekstrakulikuler', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal ambil data ekstrakurikuler');
  return await res.json();
};

export default function AdminEkstrakurikulerPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nama: '', deskripsi: '', jadwal: '' });
  const [file, setFile] = useState(null);

  // Token admin (login) dari localStorage
  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("admin_token") || "");
    }
  }, []);
  // Fetch data setelah token ready
  useEffect(() => {
    if (token) refresh();
  }, [token]);

  const refresh = async () => {
    try {
      setLoading(true);
      setErr('');
      const data = await fetchEkstrakurikuler(token);
      setItems(data);
    } catch (e) {
      setErr(e.message || 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  // Form handler
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.nama.trim() === "" ||
      form.deskripsi.trim() === "" ||
      form.jadwal.trim() === "" ||
      (!editing && !file) // Wajib pilih gambar jika tambah baru
    ) {
      setErr("Semua field & gambar wajib diisi!");
      return;
    }
    try {
      setLoading(true);
      setErr('');
      const isEdit = !!editing;
      // HERE IS THE MAIN FIX:
      const url = isEdit
        ? `http://localhost:5000/api/admin/ekstrakulikuler/${editing._id}`
        : 'http://localhost:5000/api/admin/ekstrakulikuler';
      const method = isEdit ? 'PUT' : 'POST';

      const formData = new FormData();
      formData.append('nama', form.nama);
      formData.append('deskripsi', form.deskripsi);
      formData.append('jadwal', form.jadwal);
      if (file) formData.append('image', file);

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      setShowForm(false);
      setEditing(null);
      setForm({ nama: '', deskripsi: '', jadwal: '' });
      setFile(null);
      await refresh();
    } catch (e) {
      setErr(e.message || 'Error saat simpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data ekstrakurikuler ini?')) return;
    try {
      setLoading(true);
      setErr('');
      await fetch(`http://localhost:5000/api/admin/ekstrakulikuler/${id}`, {
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

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      nama: item.nama,
      deskripsi: item.deskripsi,
      jadwal: item.jadwal,
    });
    setFile(null);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ nama: '', deskripsi: '', jadwal: '' });
    setFile(null);
    setShowForm(true);
  };

  return (
    <main className="max-w-5xl mx-auto pt-24 pb-10 px-4 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-800 text-center tracking-tight drop-shadow-lg">
        Admin - Kelola Ekstrakurikuler
      </h1>
      {err && (
        <div className="mb-4 px-4 py-2 bg-red-100 border-l-4 border-red-600 text-red-800 rounded animate-shake">
          {err}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center py-14">
          <svg className="animate-spin h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
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
              Tambah Ekstrakurikuler
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-blue-200 rounded-2xl shadow-lg flex flex-col justify-between p-6 relative hover:shadow-2xl transition group"
              >
                {/* Gambar Ekskul */}
                {item.imageUrl && (
                  <div className="w-full flex justify-center mb-4">
                    <img
                      src={item.imageUrl.startsWith('/uploads/') ?
                        `http://localhost:5000${item.imageUrl}` : item.imageUrl}
                      alt={item.nama}
                      className="rounded-xl max-h-40 object-contain border bg-slate-50"
                      loading="lazy"
                      style={{ maxWidth: 320, width: '100%' }}
                    />
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="font-bold text-lg text-blue-900">{item.nama}</h2>
                  <p className="text-gray-700 mb-2 whitespace-pre-line">{item.deskripsi}</p>
                  {item.jadwal && (
                    <span className="inline-block bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">{item.jadwal}</span>
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
              <div className="col-span-full text-gray-400 text-center py-12 text-xl">Belum ada data ekstrakurikuler.</div>
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
              {editing ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler'}
            </h2>
            <div className="space-y-3">
              <label className="block">
                <span className="font-semibold text-blue-800">Nama Ekstrakurikuler</span>
                <input
                  type="text"
                  name="nama"
                  required
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  value={form.nama}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="font-semibold text-blue-800">Deskripsi</span>
                <textarea
                  name="deskripsi"
                  required
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  value={form.deskripsi}
                  onChange={handleChange}
                  rows={4}
                />
              </label>
              <label className="block">
                <span className="font-semibold text-blue-800">Jadwal Kegiatan</span>
                <input
                  type="text"
                  name="jadwal"
                  required
                  className="w-full border-2 border-blue-200 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  value={form.jadwal}
                  onChange={handleChange}
                  placeholder="Hari, jam, atau info lain"
                />
              </label>
              <label className="block">
                <span className="font-semibold text-blue-800">Gambar (JPG/PNG)</span>
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