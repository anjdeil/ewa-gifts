/** @type {import('next').NextConfig} */
import path from 'path';
const __dirname = new URL( '.', import.meta.url ).pathname;

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join( __dirname, 'styles' )],
  },
  images: {
    domains: ['new.ewagifts.pl', 'ewagifts.pl', 'lh3.googleusercontent.com'],
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/homepage',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
