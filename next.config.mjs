/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: false,
    images: {
        domains: ['luminoushousingltd.com', 'localhost', 'zoraithost.com'],
    },
    transpilePackages: ['swiper', 'lucide-react']
};

export default nextConfig;
