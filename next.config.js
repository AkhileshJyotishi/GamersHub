/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: true,
})

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
      {
        protocol: "https",
        hostname: "gch-dev-public.s3.eu-central-003.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "www.freepik.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
