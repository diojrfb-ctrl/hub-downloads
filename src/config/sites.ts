export interface SiteConfig {
  id: string;
  name: string;
  url: string;
  icon: string;
  status: 'active' | 'development';
}

export const SUPPORTED_SITES: SiteConfig[] = [
  {
    id: 'tnaflix',
    name: 'TnaFlix',
    url: 'tnaflix.com',
    icon: '🔞',
    status: 'active'
  },
  // Novos sites serão adicionados aqui facilmente
];