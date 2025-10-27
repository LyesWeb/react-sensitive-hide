import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HideMe } from '../src/HideMe';

describe('HideMe Component', () => {
  it('renders children when revealed', () => {
    render(<HideMe>Hidden content</HideMe>);
    
    // Click to reveal
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Hidden content')).toBeInTheDocument();
  });

  it('applies blur mode by default', () => {
    render(<HideMe>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hide-me--blur');
  });

  it('handles keyboard navigation', () => {
    render(<HideMe>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    // Press Enter to reveal
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    
    expect(screen.getByText('Hidden content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<HideMe className="custom-class">Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<HideMe style={customStyle}>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('has proper accessibility attributes', () => {
    render(<HideMe>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Hidden content. Click to reveal.');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not render when children is null', () => {
    const { container } = render(<HideMe>{null}</HideMe>);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when children is undefined', () => {
    const { container } = render(<HideMe>{undefined}</HideMe>);
    
    expect(container.firstChild).toBeNull();
  });

  it('applies custom blur amount', () => {
    render(<HideMe blurAmount={10}>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('--hide-me-blur-amount: 10px');
  });

  it('applies blackout mode when blackOut is true', () => {
    render(<HideMe blackOut={true}>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hide-me--blackout');
    expect(button).toHaveAttribute('aria-label', 'Blacked out content. Click to reveal.');
  });

  it('shows blackout characters when blackOut is true', () => {
    render(<HideMe blackOut={true}>Hidden content</HideMe>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('████████');
  });
});
