/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'se9uoumdywjwplsa.public.blob.vercel-storage.com',
      },
    ],
  },
}

module.exports = nextConfig
