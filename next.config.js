/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 's3.us-west-2.amazonaws.com'],
    unoptimized: false,
        formats: ['image/avif', 'image/webp'],
            minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  compiler: {
    removeConsole: false,
  },
  swcMinify: true,
}

module.exports = nextConfig
