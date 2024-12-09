"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type VideoDetails = {
  title: string;
  thumbnail: string;
  duration: number;
  downloadUrl: string;
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return [mins, secs]
    .map((v) => v < 10 ? `0${v}` : v)
    .join(":");
}

export default function TikTokDownloader() {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchVideo = async () => {
    if (!isValidTikTokUrl(url)) {
      setError("Please enter a valid TikTok URL.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/tiktok-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video details');
      }

      const data = await response.json();
      setVideoDetails(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoDetails) {
      setError("No video details available.");
      return;
    }
    setError("");

    const link = document.createElement('a');
    link.href = videoDetails.downloadUrl;
    link.download = `${videoDetails.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isValidTikTokUrl = (url: string) => {
    const regex = /^(https?\:\/\/)?(www\.tiktok\.com|vm\.tiktok\.com)\/.+$/;
    return regex.test(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <Card className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">TikTok Downloader</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter TikTok video URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              className="mt-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={handleFetchVideo}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch Video'}
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {videoDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <img src={videoDetails.thumbnail} alt="Video Thumbnail" className="w-full mb-2 rounded-lg" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{videoDetails.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Duration: {formatDuration(videoDetails.duration)}</p>
              <Button
                className="mt-4 w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                onClick={handleDownload}
              >
                Download
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
} 