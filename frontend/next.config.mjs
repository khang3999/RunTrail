/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  trailingSlash: true,
};

export default nextConfig;
