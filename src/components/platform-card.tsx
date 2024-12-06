"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface PlatformCardProps {
  platform: {
    id: string
    name: string
    icon: string
    color: string
    description: string
  }
}

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link href={`/downloader/${platform.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-lg shadow-lg overflow-hidden"
      >
        <Card className="p-6 cursor-pointer hover:bg-accent">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{platform.name}</h2>
            <p className={`text-${platform.color}`}>{platform.icon}</p>
            <p className="text-sm text-muted-foreground">{platform.description}</p>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
} 