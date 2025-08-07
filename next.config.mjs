import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias['clsx/dist/clsx.m.js'] = path.resolve(__dirname, 'node_modules/clsx/dist/clsx.mjs');
    return config;
  },
};

export default nextConfig;

