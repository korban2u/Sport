/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com'],
  },
  // Enable PWA in production
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
