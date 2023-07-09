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
    },{
      protocol:"https",
      hostname:"avatars.githubusercontent.com",
      port:""
    },{
      protocol:"https",
      hostname:"scontent-ccu1-1.cdninstagram.com",
      port:""
    }]
  }
}

module.exports = nextConfig
