import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // PixiJS webpack optimization
    config.module.rules.push({
      test: /\.mjs$/,
      type: 'javascript/auto',
    });
    return config;
  },
};

export default nextConfig;
