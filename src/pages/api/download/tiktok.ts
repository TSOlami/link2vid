import type { NextApiRequest, NextApiResponse } from 'next';
import TikTokScraper from 'tiktok-scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!isValidTikTokUrl(url)) {
      return res.status(400).json({ error: 'Invalid TikTok URL' });
    }

    try {
      const videoMeta = await TikTokScraper.getVideoMeta(url);
      const videoDetails = {
        title: videoMeta.collector[0].text,
        thumbnail: videoMeta.collector[0].imageUrl,
        duration: videoMeta.collector[0].videoMeta.duration,
        downloadUrl: videoMeta.collector[0].videoUrl,
      };

      res.status(200).json(videoDetails);
    } catch (error) {
      console.error('Error fetching video details:', error);
      res.status(500).json({ error: 'Failed to fetch video details' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function isValidTikTokUrl(url: string): boolean {
  const regex = /^(https?\:\/\/)?(www\.tiktok\.com)\/.+$/;
  return regex.test(url);
} 