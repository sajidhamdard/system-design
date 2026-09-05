export type Topic = {
  slug: string;
  title: string;
  phase: string;
  source: string;
  htmlPath: string;
  estimatedMinutes: number;
  wordCount: number;
  isCore: boolean;
  pdfs: string[];
};

export type Catalog = {
  generatedAt: string;
  topics: Topic[];
  pdfs: string[];
};

export type Progress = Record<string, { read: boolean; updatedAt: string }>;
