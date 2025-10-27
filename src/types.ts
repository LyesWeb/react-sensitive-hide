import { ReactNode, CSSProperties } from 'react';

export type CaptchaDifficulty = 'easy' | 'medium' | 'hard';

export interface HideMeProps {
  children: ReactNode;
  blurAmount?: number;
  className?: string;
  style?: CSSProperties;
  mode?: 'blur' | 'captcha';
  captchaDifficulty?: CaptchaDifficulty;
  blackOut?: boolean;
}
