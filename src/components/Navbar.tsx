"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">Link2Vid</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`md:flex items-center ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <li className="relative group">
              <button className="flex items-center space-x-1 text-white">
                <span>Downloader</span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.div>
              </button>
              <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md hidden group-hover:block">
                <li>
                  <Link href="/downloader/youtube" className="block px-4 py-2 hover:bg-gray-100">
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link href="/downloader/tiktok" className="block px-4 py-2 hover:bg-gray-100">
                    TikTok
                  </Link>
                </li>
              </ul>
            </li>
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