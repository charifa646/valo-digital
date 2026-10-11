/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // WebP only: the first request for each size is encoded on the spot, and AVIF took 2.6 s and more for it (0.2 s in WebP):
    // visitors who came first saw empty boxes (8 October 2026)
    formats: ["image/webp"],
  },
};

export default nextConfig;
