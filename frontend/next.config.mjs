/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
	transpilePackages:["@components/*","@styles/*","@assets/*"],
	output: 'export',
	images: { unoptimized: true },
	reactStrictMode: false,
};

export default nextConfig;

