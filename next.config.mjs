/** @type {import('next').NextConfig} */
import path from 'path';
const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
