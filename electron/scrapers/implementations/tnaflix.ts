import { IScraper, ScraperResult } from '../types';
import axios from 'axios';
import * as cheerio from 'cheerio';

export class TnaflixScraper implements IScraper {
  readonly name = 'TnaFlix';

  check(url: string): boolean {
    return url.includes('tnaflix.com');
  }

  async run(url: string): Promise<ScraperResult> {
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const $ = cheerio.load(data);
      
      const title = $('h1').text().trim() || 'Vídeo TnaFlix';
      const thumbnail = $('meta[property="og:image"]').attr('content');

      // Aqui viria a lógica para encontrar a URL do vídeo (geralmente em scripts ou tags video)
      return {
        success: true,
        title,
        thumbnail,
        medias: [
          { quality: 'Original', url: url, extension: 'mp4' }
        ]
      };
    } catch (error) {
      return { success: false, error: 'Falha ao aceder ao TnaFlix.' };
    }
  }
}