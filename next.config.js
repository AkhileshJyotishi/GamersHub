/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdnb.artstation.com",
      },
      {
        protocol: "https",
        hostname: "f003.backblazeb2.com",
      },
    ],
  },
}

module.exports = nextConfig
