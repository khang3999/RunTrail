/** @type {import('next').NextConfig} */

const nextConfig = {
	// output: 'export',
	transpilePackages: ['@components/*', '@styles/*', '@assets/*'],
	images: { unoptimized: true },
	reactStrictMode: false,
	i18n: {
		locales:['en-US', 'vi-VN'],
		defaultLocale: 'en-US',
	},

};

export default nextConfig;
