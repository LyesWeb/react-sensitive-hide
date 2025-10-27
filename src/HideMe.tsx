import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { HideMeProps } from './types';
import './styles.css';

export const HideMe: React.FC<HideMeProps> = ({
  children,
  blurAmount = 5,
  className = '',
  style = {},
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isRevealed) return;
      handleReveal();
    }
  }, [isRevealed, handleReveal]);

  // Don't render anything if no children
  if (!children) {
    return null;
  }

  // If revealed, just show the content
  if (isRevealed) {
    return (
      <span 
        className={classNames('hide-me', 'hide-me--revealed', className)} 
        style={style}
      >
        {children}
      </span>
    );
  }

  // Build CSS classes using classNames
  const classes = classNames('hide-me', 'hide-me--blur', className);

  // Build inline styles
  const inlineStyles = {
    ...style,
    '--hide-me-blur-amount': `${blurAmount}px`,
  };

  return (
    <button
      type="button"
      className={classes}
      style={inlineStyles}
      onClick={handleReveal}
      onKeyDown={handleKeyDown}
      aria-label="Hidden content. Click to reveal."
      aria-expanded={isRevealed}
      tabIndex={0}
    >
      <span className="sr-only">
        Hidden content. Click to reveal.
      </span>
      {children}
    </button>
  );
};
