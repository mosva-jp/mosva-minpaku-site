/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 's3.us-west-2.amazonaws.com'],
    unoptimized: false,
  },
}

module.exports = nextConfig
