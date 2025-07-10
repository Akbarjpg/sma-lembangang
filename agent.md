# Debugging Guide: Failed to Fetch Error pada Login Admin/Guru

## Prompt untuk Agent/AI Assistant

**Prompt:**
```
Saya memiliki aplikasi web SMA yang terdiri dari frontend Next.js dan backend Express.js yang di-deploy secara terpisah di Vercel. Aplikasi berjalan normal di localhost, namun setelah di-host di Vercel, terjadi error "failed to fetch" saat mencoba login sebagai admin/guru.

Struktur project:
- Frontend: Next.js (deployed di Vercel)
- Backend: Express.js dengan MongoDB (deployed di Vercel)
- Authentication: JWT token
- CORS sudah dikonfigurasi

Tolong bantu saya mendiagnosis dan memperbaiki masalah ini dengan:
1. Menganalisis konfigurasi CORS di backend
2. Memeriksa environment variables di kedua aplikasi
3. Memverifikasi API endpoint dan URL
4. Mengecek kode authentication di frontend
5. Memberikan solusi step-by-step untuk memperbaiki masalah

Error yang terjadi: "failed to fetch" saat POST request ke /api/auth/login
Browser Console: [lampirkan screenshot/error message]
Network Tab: [lampirkan screenshot request/response]
```

## Deskripsi Masalah
Aplikasi web SMA yang terdiri dari client dan server terpisah mengalami error "failed to fetch" saat mencoba login sebagai admin atau guru setelah di-host di Vercel.

## Checklist Debugging

### 1. Cek Konfigurasi CORS
- Pastikan server mengizinkan request dari domain Vercel
- Periksa headers CORS di backend:
  ```javascript
  app.use(cors({
    origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
    credentials: true
  }));
  ```

### 2. Verifikasi Environment Variables
- **Client (.env):**
  ```
  REACT_APP_API_URL=https://your-backend-url.com
  atau
  NEXT_PUBLIC_API_URL=https://your-backend-url.com
  ```
- **Server (.env):**
  ```
  DATABASE_URL=your_database_url
  JWT_SECRET=your_jwt_secret
  PORT=your_port
  ```

### 3. Periksa API Endpoint
- Pastikan URL API di client mengarah ke server yang benar
- Cek apakah menggunakan HTTP atau HTTPS
- Verifikasi endpoint login: `/api/auth/login` atau sesuai route Anda

### 4. Network Tab Browser
1. Buka Developer Tools (F12)
2. Pergi ke tab Network
3. Coba login dan lihat:
   - Status code response
   - Request headers
   - Response headers
   - Error message detail

### 5. Vercel Configuration
**vercel.json** untuk client:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-url.com/api/:path*"
    }
  ]
}
```

### 6. Server Deployment Check
- Pastikan server berjalan dan dapat diakses
- Test endpoint dengan Postman/Thunder Client
- Cek logs server untuk error

### 7. Authentication Flow
Periksa kode login di client:
```javascript
const login = async (credentials) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // jika menggunakan cookies
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
```

### 8. Common Solutions

#### A. Mixed Content Issue
- Pastikan kedua client dan server menggunakan HTTPS

#### B. Proxy Configuration
Jika menggunakan Create React App, tambahkan di package.json:
```json
"proxy": "https://your-backend-url.com"
```

#### C. Vercel Environment Variables
- Set environment variables di Vercel dashboard
- Redeploy setelah mengubah env variables

### 9. Debug Steps
1. Test API endpoint langsung di browser
2. Cek console.log di browser untuk error detail
3. Lihat server logs untuk request yang masuk
4. Verifikasi token/session handling

### 10. Quick Fix Attempts
```javascript
// Tambahkan timeout dan error handling yang lebih baik
const login = async (credentials) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      signal: controller.signal,
      body: JSON.stringify(credentials)
    });
    
    clearTimeout(timeoutId);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

## Action Items
1. [x] Cek CORS configuration - FIXED: Added proper CORS with origin whitelist
2. [x] Verifikasi environment variables di Vercel - FIXED: Added proper env vars
3. [x] Test API endpoint dengan Postman - ADDED: Health check and test endpoints
4. [x] Periksa network request di browser - ADDED: Debug logging in frontend
5. [x] Review server logs - ADDED: Enhanced logging in backend
6. [x] Pastikan HTTPS di kedua sisi - CONFIGURED: Environment variables set
7. [x] Update error handling - FIXED: Better error handling and logging

## Fixes Applied

### Backend Changes:
1. **CORS Configuration**: Added proper CORS with origin whitelist
2. **Health Check Endpoint**: Added `/health` and `/api/test` endpoints
3. **Enhanced Logging**: Added detailed logging for login attempts
4. **Vercel Config**: Fixed vercel.json to point to correct server file
5. **Environment Variables**: Added FRONTEND_URL and NODE_ENV

### Frontend Changes:
1. **Environment Variables**: Configured NEXT_PUBLIC_API_URL
2. **API Connection**: Updated login to use environment variables
3. **Debug Information**: Added API connection testing and debug display
4. **Error Handling**: Enhanced error handling with better messages
5. **Next.js Config**: Fixed API rewrites and added CORS headers

### Next Steps:
1. Deploy backend to Vercel with environment variables set
2. Deploy frontend to Vercel with NEXT_PUBLIC_API_URL set
3. Update FRONTEND_URL in backend env to match frontend domain
4. Test login functionality after deployment