/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["cdn.zabbet.com"], // Add the external hostname here
	},
};

export default nextConfig;
