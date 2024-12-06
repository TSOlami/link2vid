"use client";

import { motion } from "framer-motion";
import { PlatformCard } from "@/components/platform-card";
import { ThemeToggle } from "@/components/theme-toggle";

const platforms = [
  {
    id: "youtube",
    name: "YouTube",
    icon: "youtube",
    color: "red-600",
    description: "Download videos from YouTube with ease",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok",
    color: "pink-500",
    description: "Download videos from TikTok effortlessly",
  },
  // Add more platforms here
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-white">Link2Vid</h1>
        <p className="text-xl text-muted-foreground">
          Download videos from your favorite platforms
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </motion.div>
    </div>
  );
}
