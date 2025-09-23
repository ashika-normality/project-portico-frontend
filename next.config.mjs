import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'], // allow Google profile pictures
  },
  webpack: (config) => {
    config.resolve.alias['clsx/dist/clsx.m.js'] = path.resolve(__dirname, 'node_modules/clsx/dist/clsx.mjs');
    return config;
  },
};

export default nextConfig;
