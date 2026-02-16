import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "cdnjs.cloudflare.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://firebasestorage.googleapis.com https://images.unsplash.com https://*.tile.openstreetmap.org https://unpkg.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://api.emailjs.com https://api.cloudinary.com https://va.vercel-scripts.com wss://*.firebaseio.com",
              "frame-src 'self' https://*.firebaseapp.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
