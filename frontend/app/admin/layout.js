'use client';
import RouteGuard from "../components/RouteGuard";

// Layout ini hanya digunakan oleh semua route di bawah /admin.
// RouteGuard hanya akan memproteksi area /admin dan child-nya (bukan global seluruh web).
export default function AdminLayout({ children }) {
  return <RouteGuard>{children}</RouteGuard>;
}
