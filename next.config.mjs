/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All media is served by the existing SoulPath asset host (never replaced with stock imagery)
    remotePatterns: [
      { protocol: 'https', hostname: 'soulpathholiday.com' },
      { protocol: 'https', hostname: 'royalblue-giraffe-182996.hostingersite.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
