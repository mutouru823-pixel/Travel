export type ViewState = 'home' | 'macro' | 'micro';

export interface RouteData {
  id: number;
  name: string;
  tags: string[];
  score: number;
  duration: string;
  description: string;
  matchReason: string; // "Why this matches you"
  features: {
    space: string;
    time: string;
    ugc: string;
    behavior: string;
    multimedia: string;
  };
}

export interface POIData {
  id: number;
  name: string;
  x: number; // Percent position for map simulation
  y: number;
  type: string;
  image?: string;
  tags: POITag[]; // The clustered info points
  insights: {
    topic: string;
    consensus: number; // 0-1 (Agreement score)
    importance: number; // 0-100 (Frequency/Importance)
    summary: string; // LLM generated summary
    polarity: 'positive' | 'negative' | 'neutral';
  }[];
}

export interface POITag {
  text: string;
  weight: number; // 1-5 for size in tag cloud
  category: 'experience' | 'warning' | 'tip';
}
