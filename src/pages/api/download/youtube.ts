import type { NextApiRequest, NextApiResponse } from 'next';
import youtubedl from 'youtube-dl-exec';

type VideoDetails = {
  title: string;
  thumbnail: string;
  duration: string;
  qualities: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    // Validate the YouTube URL
    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
      // Use youtube-dl-exec to fetch video details
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
      });

      const videoDetails: VideoDetails = {
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration,
        qualities: info.formats.map((format: any) => format.format_id),
      };

      res.status(200).json(videoDetails);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch video details' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function isValidYouTubeUrl(url: string): boolean {
  const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
} 