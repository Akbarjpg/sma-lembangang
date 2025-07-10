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
      console.warn('[next.config.mjs] API_URL environment variable not set - API calls will be handled by frontend');
      return [];
    } else {
      console.info('[next.config.mjs] Proxying /api/* to', targetApi + '/api/*');
      return [
        {
          source: '/api/:path*',
          destination: `${targetApi}/api/:path*`,
        }
      ];
    }
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

export default nextConfig;
