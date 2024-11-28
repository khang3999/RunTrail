/** @type {import('next').NextConfig} */

const nextConfig = {

	// distDir: "build",
	transpilePackages:["@components/*","@styles/*","@assets/*"],
	output: 'export',
	images: { unoptimized: true },
	reactStrictMode: false,
};

export default nextConfig;

