/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Generates static HTML/CSS/JS files
  distDir: 'dist',   // Changes the build output directory to 'dist'
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable experimental features from latest Next.js
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

module.exports = nextConfig;