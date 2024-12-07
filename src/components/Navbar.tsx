"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("youtube");

  const tabs = [
    { id: "youtube", name: "YouTube", href: "/downloader/youtube" },
    { id: "tiktok", name: "TikTok", href: "/downloader/tiktok" },
    { id: "instagram", name: "Instagram", href: "/downloader/instagram" },
    { id: "facebook", name: "Facebook", href: "/downloader/facebook" },
    { id: "twitter", name: "Twitter", href: "/downloader/twitter" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/">Link2Vid</Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <Link key={tab.id} href={tab.href}>
              <motion.div
                className={`px-3 py-2 rounded-lg cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-900 dark:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.name}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
} 