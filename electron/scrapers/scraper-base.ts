export interface ScrapeResult {
  title: string;
  url: string;
  thumbnail?: string;
  qualityOptions: string[];
}

export abstract class BaseScraper {
  abstract name: string;
  abstract canHandle(url: string): boolean;
  abstract scrape(url: string): Promise<ScrapeResult>;
}