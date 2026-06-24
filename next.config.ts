import type { NextConfig } from "next";

if (process.env.CI === "1" && !process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY) {
  throw new Error(
    "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY is required for production Docker builds. Generate: openssl rand -base64 32",
  );
}

const nextConfig: NextConfig = {
  output: "standalone",
  serverActions: {
    allowedOrigins: [
      "polinaandnikita.ru",
      "www.polinaandnikita.ru",
      "localhost:11435",
      "localhost:3000",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mp3$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/models/[name].[hash][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
