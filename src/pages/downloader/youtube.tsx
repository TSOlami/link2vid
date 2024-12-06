"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type VideoDetails = {
  title: string;
  thumbnail: string;
  duration: string;
  qualities: string[];
};

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchVideo = async () => {
    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/download/youtube', {
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!selectedQuality) {
      setError("Please select a video quality.");
      return;
    }
    setError("");
    alert(`Downloading video in ${selectedQuality} quality.`);
  };

  const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">YouTube Downloader</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter YouTube video URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button className="mt-2" onClick={handleFetchVideo} disabled={loading}>
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
              <img src={videoDetails.thumbnail} alt="Video Thumbnail" className="w-full mb-2" />
              <h3 className="text-xl font-semibold">{videoDetails.title}</h3>
              <p className="text-sm text-muted-foreground">Duration: {videoDetails.duration}</p>
              <div className="mt-4">
                <label className="block mb-2">Select Quality:</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                >
                  <option value="">Select quality</option>
                  {videoDetails.qualities.map((quality: string) => (
                    <option key={quality} value={quality}>
                      {quality}
                    </option>
                  ))}
                </select>
              </div>
              <Button className="mt-4" onClick={handleDownload}>
                Download
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
} 