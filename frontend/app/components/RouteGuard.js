'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Allow public routes here
const PUBLIC_ROUTES = [
  '/admin/login',
  '/', // landing page or other public page
  // Tambahkan path public lain jika diperlukan
];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const isPublic = PUBLIC_ROUTES.includes(pathname);
    if (!isPublic) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      if (!token) {
        router.replace('/admin/login');
        return;
      }
      // Optional: Here you can add JWT validation using expiry or even call backend to verify token is still valid
    }
    setIsChecked(true);
  }, [pathname, router]);

  if (!isChecked && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Mengecek autentikasi...
      </div>
    );
  }

  return children;
}