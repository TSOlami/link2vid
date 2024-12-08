import type { NextApiRequest, NextApiResponse } from 'next';
import youtubedl from 'youtube-dl-exec';

type VideoFormat = {
  format_id: string;
  format_note: string;
  filesize: number;
  url: string;
  acodec: string;
  audio_ext: string;
};

type TikTokDLResponse = {
  title: string;
  thumbnail: string;
  duration: number;
  formats: VideoFormat[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!isValidTikTokUrl(url)) {
      return res.status(400).json({ error: 'Invalid TikTok URL' });
    }

    try {
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
      }) as TikTokDLResponse;

      const videoDetails = {
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration.toString(),
        formats: info.formats
          .filter((format) => format.url && format.filesize)
          .map((format) => ({
            format_id: format.format_id,
            format_note: format.format_note,
            filesize: format.filesize,
            url: format.url,
            acodec: format.acodec,
            audio_ext: format.audio_ext
          }))
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