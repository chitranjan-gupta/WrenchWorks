/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.unsplash.com",
      port: ""
    },{
      protocol:"https",
      hostname:"tailwindui.com",
      port:""
    }]
  }
}

module.exports = nextConfig
