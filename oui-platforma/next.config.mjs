/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.platform.zenzonemedia.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.platform.zenzonemedia.com",
        port: "",
        pathname: "/platform/media/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/platform/media/:path*',
        destination: 'https://zenzonemedia.com/platform/media/:path*',
      },
    ];
  },
};

export default nextConfig;
