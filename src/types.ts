import { ReactNode, CSSProperties } from 'react';

export type CaptchaDifficulty = 'easy' | 'medium' | 'hard';

export interface HideMeProps {
  children: ReactNode;
  blurAmount?: number;
  className?: string;
  style?: CSSProperties;
  mode?: 'blur' | 'captcha' | 'age-verification';
  captchaDifficulty?: CaptchaDifficulty;
  blackOut?: boolean;
  minimumAge?: number;
}
