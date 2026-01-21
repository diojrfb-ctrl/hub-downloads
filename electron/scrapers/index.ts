import { IScraper, ScraperResult } from './types'

class ScraperManager {
  private scrapers: IScraper[] = []

  constructor() {
    // Futuras instâncias de scrapers serão adicionadas aqui
    // Ex: this.scrapers.push(new YoutubeScraper())
  }

  async run(url: string): Promise<ScraperResult> {
    try {
      const scraper = this.scrapers.find(s => s.check(url))

      if (!scraper) {
        return {
          success: false,
          error: 'Este site ainda não é suportado pelo Hub.'
        }
      }

      return await scraper.run(url)
    } catch (error: unknown) {
      let message = 'Erro interno ao processar o scraper'
      if (error instanceof Error) message = error.message
      
      return {
        success: false,
        error: message
      }
    }
  }
}

export const scraperManager = new ScraperManager()