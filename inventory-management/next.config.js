/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"]
  }
}

module.exports = nextConfig