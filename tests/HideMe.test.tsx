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

  describe('Age Verification Mode', () => {
    it('renders age verification mode correctly', () => {
      render(<HideMe mode="age-verification">Age-restricted content</HideMe>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hide-me--age-verification');
      expect(button).toHaveAttribute('aria-label', 'Age-restricted content. Click to verify your age.');
    });

    it('shows age verification modal on click', () => {
      render(<HideMe mode="age-verification">Age-restricted content</HideMe>);
      
      fireEvent.click(screen.getByRole('button'));
      
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument();
      expect(screen.getByText(/Please enter your date of birth/)).toBeInTheDocument();
    });

    it('reveals content when valid age is entered (18+)', () => {
      render(<HideMe mode="age-verification" minimumAge={18}>Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      // Enter a valid birth date (25 years ago)
      const twentyFiveYearsAgo = new Date();
      twentyFiveYearsAgo.setFullYear(twentyFiveYearsAgo.getFullYear() - 25);
      const dateString = twentyFiveYearsAgo.toISOString().split('T')[0];
      
      const dateInput = screen.getByDisplayValue('');
      fireEvent.change(dateInput, { target: { value: dateString } });
      
      // Click verify button
      fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
      
      // Content should be revealed
      expect(screen.getByText('Age-restricted content')).toBeInTheDocument();
    });

    it('shows error when age is below minimum', () => {
      render(<HideMe mode="age-verification" minimumAge={18}>Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      // Enter an invalid birth date (16 years ago)
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      const dateString = sixteenYearsAgo.toISOString().split('T')[0];
      
      const dateInput = screen.getByDisplayValue('');
      fireEvent.change(dateInput, { target: { value: dateString } });
      
      // Click verify button
      fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
      
      // Error should be shown
      expect(screen.getByText('You must be at least 18 years old to view this content')).toBeInTheDocument();
    });

    it('shows error when no date is entered', () => {
      render(<HideMe mode="age-verification">Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      // Click verify without entering a date
      fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
      
      // Error should be shown
      expect(screen.getByText('Please enter your date of birth')).toBeInTheDocument();
    });

    it('shows error when future date is entered', () => {
      render(<HideMe mode="age-verification">Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      // Enter a future date
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = futureDate.toISOString().split('T')[0];
      
      const dateInput = screen.getByDisplayValue('');
      fireEvent.change(dateInput, { target: { value: dateString } });
      
      // Click verify button
      fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
      
      // Error should be shown
      expect(screen.getByText('Date of birth cannot be in the future')).toBeInTheDocument();
    });

    it('closes modal when cancel is clicked', () => {
      render(<HideMe mode="age-verification">Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument();
      
      // Click cancel
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      
      // Modal should be closed
      expect(screen.queryByText('Age Verification Required')).not.toBeInTheDocument();
    });

    it('respects custom minimumAge prop', () => {
      render(<HideMe mode="age-verification" minimumAge={21}>Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      expect(screen.getByText(/at least 21 years old/)).toBeInTheDocument();
      
      // Enter a birth date that makes user 20 years old
      const twentyYearsAgo = new Date();
      twentyYearsAgo.setFullYear(twentyYearsAgo.getFullYear() - 20);
      const dateString = twentyYearsAgo.toISOString().split('T')[0];
      
      const dateInput = screen.getByDisplayValue('');
      fireEvent.change(dateInput, { target: { value: dateString } });
      
      // Click verify button
      fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
      
      // Error should be shown with custom age
      expect(screen.getByText('You must be at least 21 years old to view this content')).toBeInTheDocument();
    });

    it('clears error when date input changes', () => {
      render(<HideMe mode="age-verification">Age-restricted content</HideMe>);
      
      // Click to show modal
      fireEvent.click(screen.getByRole('button', { name: /Age-restricted content/ }));
      
      // Click verify without entering a date to trigger error
      fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
      
      expect(screen.getByText('Please enter your date of birth')).toBeInTheDocument();
      
      // Now enter a date
      const dateInput = screen.getByDisplayValue('');
      fireEvent.change(dateInput, { target: { value: '2000-01-01' } });
      
      // Error should be cleared
      expect(screen.queryByText('Please enter your date of birth')).not.toBeInTheDocument();
    });
  });
});
