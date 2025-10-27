import React, { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { HideMeProps } from './types';
import { generateMathProblem } from './utils/captcha';
import './styles.css';

export const HideMe: React.FC<HideMeProps> = ({
  children,
  blurAmount = 5,
  className = '',
  style = {},
  mode = 'blur',
  captchaDifficulty = 'easy',
  blackOut = false,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [problemKey, setProblemKey] = useState(0);

  // Generate math problem using useMemo
  const mathProblem = useMemo(() => {
    if (mode === 'captcha') {
      return generateMathProblem(captchaDifficulty);
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, captchaDifficulty, problemKey]);

  const handleReveal = useCallback(() => {
    if (mode === 'captcha') {
      setShowCaptcha(true);
    } else {
      setIsRevealed(true);
    }
  }, [mode]);

  const handleCaptchaSubmit = useCallback(() => {
    if (mathProblem && parseInt(userAnswer) === mathProblem.answer) {
      setIsRevealed(true);
      setShowCaptcha(false);
    } else {
      // Wrong answer, generate new problem
      setProblemKey(prev => prev + 1);
      setUserAnswer('');
    }
  }, [mathProblem, userAnswer]);

  const handleCaptchaCancel = useCallback(() => {
    setShowCaptcha(false);
    setUserAnswer('');
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

  // Show CAPTCHA modal
  if (showCaptcha && mathProblem) {
    return (
      <div className="hide-me-captcha-overlay">
        <div className="hide-me-captcha-modal">
          <div className="hide-me-captcha-content">
            <h3>Solve this math problem to reveal content:</h3>
            <div className="hide-me-captcha-question">
              What is {mathProblem.question}?
            </div>
            <div className="hide-me-captcha-input-group">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer"
                className="hide-me-captcha-input"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCaptchaSubmit();
                  }
                }}
              />
              <div className="hide-me-captcha-buttons">
                <button
                  type="button"
                  onClick={handleCaptchaSubmit}
                  className="hide-me-captcha-submit"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCaptchaCancel}
                  className="hide-me-captcha-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Build CSS classes using classNames
  const classes = classNames(
    'hide-me', 
    blackOut ? 'hide-me--blackout' : (mode === 'blur' ? 'hide-me--blur' : 'hide-me--captcha'),
    className
  );

  // Build inline styles
  const inlineStyles = {
    ...style,
    '--hide-me-blur-amount': `${blurAmount}px`,
  };

  const ariaLabel = blackOut 
    ? 'Blacked out content. Click to reveal.'
    : mode === 'captcha' 
    ? 'Hidden content. Click to solve CAPTCHA and reveal.'
    : 'Hidden content. Click to reveal.';

  return (
    <button
      type="button"
      className={classes}
      style={inlineStyles}
      onClick={handleReveal}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-expanded={isRevealed}
      tabIndex={0}
    >
      <span className="sr-only">
        {ariaLabel}
      </span>
      {blackOut ? '████████' : (mode === 'captcha' ? '••••••••' : children)}
    </button>
  );
};
