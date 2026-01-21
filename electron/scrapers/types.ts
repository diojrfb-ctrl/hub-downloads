export interface MediaOption {
  quality: string;
  url: string;
  size?: string;
  extension?: string;
}

export interface ScraperResult {
  success: boolean;
  title?: string;
  thumbnail?: string;
  medias?: MediaOption[];
  error?: string;
}

export interface IScraper {
  readonly name: string;
  check(url: string): boolean;
  run(url: string): Promise<ScraperResult>;
}