"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    <nav className="bg-white dark:bg-slate-900 shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6 text-gray-900 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-900 dark:text-white" />}
          </button>
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/">Link2Vid</Link>
        </div>

        {/* Dark Mode Toggle for Mobile */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        {/* Tabs for Desktop */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-6">
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
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center md:hidden"
          >
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg relative">
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-2 right-2 text-gray-900 dark:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <ul className="flex flex-col space-y-4">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <Link href={tab.href}>
                      <motion.div
                        className={`px-3 py-2 cursor-pointer text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {tab.name}
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 