// Ganti URL sesuai lokasi backend kamu
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    throw new Error('Login gagal: ' + res.statusText);
  }
  const data = await res.json();
  // selanjutnya simpan token/sesuaikan logic login-mu