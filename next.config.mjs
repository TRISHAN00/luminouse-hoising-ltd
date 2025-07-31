/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "", // optional, if you're not using a specific port
        pathname: "/lum-dashboard/admin/uploads/**", // allows anything under that path
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
  transpilePackages: ["swiper", "lucide-react"],
};

export default nextConfig;
