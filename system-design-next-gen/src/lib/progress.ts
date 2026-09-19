import type { Progress } from '../types';

const STORAGE_KEY = 'system-design-progress-v1';
const PINNED_KEY = 'system-design-pinned-v1';
const HERO_COLLAPSED_KEY = 'system-design-hero-collapsed-v1';

export function readProgress(): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as Progress : {};
  } catch {
    return {};
  }
}

export function setTopicRead(slug: string, read: boolean): Progress {
  const progress = readProgress();
  progress[slug] = { read, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export function clearProgress(): Progress {
  localStorage.removeItem(STORAGE_KEY);
  return {};
}

export function readPinnedTopics(): string[] {
  try {
    const saved = localStorage.getItem(PINNED_KEY);
    return saved ? JSON.parse(saved) as string[] : [];
  } catch {
    return [];
  }
}

export function togglePinnedTopic(slug: string): string[] {
  const pinned = readPinnedTopics();
  const next = pinned.includes(slug) ? pinned.filter((item) => item !== slug) : [slug, ...pinned];
  localStorage.setItem(PINNED_KEY, JSON.stringify(next));
  return next;
}

export function readHeroCollapsed(): boolean {
  return localStorage.getItem(HERO_COLLAPSED_KEY) === 'true';
}

export function setHeroCollapsed(collapsed: boolean): void {
  localStorage.setItem(HERO_COLLAPSED_KEY, String(collapsed));
}
