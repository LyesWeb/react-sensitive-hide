import { ReactNode, CSSProperties } from 'react';

export interface HideMeProps {
  children: ReactNode;
  blurAmount?: number;
  className?: string;
  style?: CSSProperties;
}
