/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: false,
    images: {
        domains: ['bestinbd.com', 'cms.tropicalhomesltd.com'],
    },
};

export default nextConfig;
