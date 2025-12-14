/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true, // по-удобно за статичен хостинг: /recipes/slug/
  images: { unoptimized: true }
};

module.exports = nextConfig;
