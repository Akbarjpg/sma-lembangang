import dotenv from 'dotenv';

dotenv.config(); // load .env.local etc

// Prevent double '/api' in API_URL
function stripApiSuffix(url) {
  return url.endsWith('/api') ? url.slice(0, -4) : url;
}

const targetApi = process.env.API_URL ? stripApiSuffix(process.env.API_URL) : '';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!targetApi) {
      console.warn('[next.config.mjs] API_URL environment variable not set.');
    } else {
      console.info('[next.config.mjs] Proxying /api/* to', targetApi + '/api/*');
    }
    return [
      {
        source: '/api/:path*',
        destination: targetApi ? `${targetApi}/api/:path*` : '/api/:path*', // default fallback
      }
    ];
  },
};

export default nextConfig;
