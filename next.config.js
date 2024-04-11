const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.tailgrids.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "prog-ace-cdn.azureedge.net",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/post/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/sign_in",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/signup",
        permanent: true,
      },
      {
        source: "/sign_up",
        destination: "/signup",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contactus",
        permanent: true,
      },
      {
        source: "/contact_us",
        destination: "/contactus",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacypolicy",
        permanent: true,
      },
      {
        source: "/privacy_policy",
        destination: "/privacypolicy",
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
