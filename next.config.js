/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Vercel optimization
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for GitHub Pages fallback
  trailingSlash: true,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
}

module.exports = nextConfig