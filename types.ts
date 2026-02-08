// Global type augmentations have been moved to `src/types.ts` to resolve compilation issues.

export enum Page {
  QUESTION = 'QUESTION',
  FIREWORKS = 'FIREWORKS',
  CELEBRATION = 'CELEBRATION',
  GIFT = 'GIFT',
  BOUQUET = 'BOUQUET',
  LETTER = 'LETTER',
}

export interface Position {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface PageProps {
  onNextPage: (page: Page) => void;
  onRestart?: () => void;
}