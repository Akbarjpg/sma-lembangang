import dotenv from 'dotenv';

dotenv.config(); // load .env.local etc

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL
          ? `${process.env.API_URL}/api/:path*`
          : '/api/:path*' // default fallback
      }
    ];
  },
};

export default nextConfig;