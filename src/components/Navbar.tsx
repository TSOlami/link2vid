"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "";

  const tabs = [
    { id: "youtube", name: "YouTube", href: "/downloader/youtube" },
    { id: "tiktok", name: "TikTok", href: "/downloader/tiktok" },
    { id: "instagram", name: "Instagram", href: "/downloader/instagram" },
    { id: "facebook", name: "Facebook", href: "/downloader/facebook" },
    { id: "twitter", name: "Twitter", href: "/downloader/twitter" },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/">Link2Vid</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6 text-gray-900 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-900 dark:text-white" />}
          </button>
        </div>

        {/* Tabs */}
        <div className={`md:flex items-center ${menuOpen ? "block" : "hidden"} transition-all duration-300 ease-in-out`}>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            {tabs.map((tab) => (
              <li key={tab.id} className="relative">
                <Link href={tab.href}>
                  <motion.div
                    className={`px-3 py-2 cursor-pointer text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.name}
                  </motion.div>
                </Link>
                {pathname.includes(tab.id) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                    layoutId="underline"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <div className="mt-4 md:mt-0 md:ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 