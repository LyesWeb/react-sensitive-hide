'use client';

import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import { HideMeProps } from './types';
import { isAgeValid } from './utils/ageValidation';
import { generateMathProblem } from './utils/captcha';

export const HideMe: React.FC<HideMeProps> = ({
  children,
  blurAmount = 5,
  className = '',
  style = {},
  mode = 'blur',
  captchaDifficulty = 'easy',
  blackOut = false,
  minimumAge = 18,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [problemKey, setProblemKey] = useState(0);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ageError, setAgeError] = useState('');

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
    } else if (mode === 'age-verification') {
      setShowAgeModal(true);
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
      setProblemKey((prev) => prev + 1);
      setUserAnswer('');
    }
  }, [mathProblem, userAnswer]);

  const handleCaptchaCancel = useCallback(() => {
    setShowCaptcha(false);
    setUserAnswer('');
  }, []);

  const handleAgeSubmit = useCallback(() => {
    if (!dateOfBirth) {
      setAgeError('Please enter your date of birth');
      return;
    }

    const birthDate = new Date(dateOfBirth);

    // Check if date is valid
    if (isNaN(birthDate.getTime())) {
      setAgeError('Please enter a valid date');
      return;
    }

    // Check if date is in the future
    if (birthDate > new Date()) {
      setAgeError('Date of birth cannot be in the future');
      return;
    }

    if (isAgeValid(birthDate, minimumAge)) {
      setIsRevealed(true);
      setShowAgeModal(false);
      setAgeError('');
      setDateOfBirth('');
    } else {
      setAgeError(`You must be at least ${minimumAge} years old to view this content`);
    }
  }, [dateOfBirth, minimumAge]);

  const handleAgeCancel = useCallback(() => {
    setShowAgeModal(false);
    setDateOfBirth('');
    setAgeError('');
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (isRevealed) return;
        handleReveal();
      }
    },
    [isRevealed, handleReveal]
  );

  // Don't render anything if no children
  if (!children) {
    return null;
  }

  // If revealed, just show the content
  if (isRevealed) {
    return (
      <span className={classNames('hide-me', 'hide-me--revealed', className)} style={style}>
        {children}
      </span>
    );
  }

  // Render CAPTCHA modal using portal (to avoid nesting issues with <p> tags)
  const captchaModal =
    showCaptcha && mathProblem && typeof document !== 'undefined'
      ? createPortal(
          <div className="hide-me-captcha-overlay">
            <div className="hide-me-captcha-modal">
              <div className="hide-me-captcha-content">
                <div className="hide-me-captcha-title">
                  Solve this math problem to reveal content:
                </div>
                <div className="hide-me-captcha-question">What is {mathProblem.question}?</div>
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
          </div>,
          document.body
        )
      : null;

  // Render Age Verification modal using portal
  const ageModal =
    showAgeModal && typeof document !== 'undefined'
      ? createPortal(
          <div className="hide-me-age-overlay">
            <div className="hide-me-age-modal">
              <div className="hide-me-age-content">
                <div className="hide-me-age-title">Age Verification Required</div>
                <div className="hide-me-age-description">
                  Please enter your date of birth to verify you are at least {minimumAge} years old.
                </div>
                <div className="hide-me-age-input-group">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      setAgeError('');
                    }}
                    className="hide-me-age-input"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAgeSubmit();
                      }
                    }}
                  />
                  {ageError && <div className="hide-me-age-error">{ageError}</div>}
                  <div className="hide-me-age-buttons">
                    <button type="button" onClick={handleAgeSubmit} className="hide-me-age-submit">
                      Verify
                    </button>
                    <button type="button" onClick={handleAgeCancel} className="hide-me-age-cancel">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  // Build CSS classes using classNames
  const classes = classNames(
    'hide-me',
    blackOut
      ? 'hide-me--blackout'
      : mode === 'blur'
        ? 'hide-me--blur'
        : mode === 'age-verification'
          ? 'hide-me--age-verification'
          : 'hide-me--captcha',
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
      : mode === 'age-verification'
        ? 'Age-restricted content. Click to verify your age.'
        : 'Hidden content. Click to reveal.';

  return (
    <>
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
        <span className="sr-only">{ariaLabel}</span>
        {blackOut
          ? '████████'
          : mode === 'captcha'
            ? '••••••••'
            : mode === 'age-verification'
              ? '••••••••'
              : children}
      </button>
      {captchaModal}
      {ageModal}
    </>
  );
};
