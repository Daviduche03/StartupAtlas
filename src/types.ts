export interface Startup {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  founded: number;
  location: string;
  website: string;
  funding?: string;
  employees?: string;
  founders?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
  highlights?: string[];
  valuation?: string;
  investors?: string[];
}

export type SortOption = 'newest' | 'oldest' | 'funding-high' | 'funding-low' | 'valuation-high' | 'valuation-low';

export type ViewMode = 'grid' | 'list';