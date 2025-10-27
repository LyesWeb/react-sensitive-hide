# react-sensitive-hide

[![npm version](https://badge.fury.io/js/react-sensitive-hide.svg)](https://www.npmjs.com/package/react-sensitive-hide)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Online-blue)](https://lyesweb.github.io/react-sensitive-hide/)

**📦 [npm package](https://www.npmjs.com/package/react-sensitive-hide)**

A lightweight React component for hiding sensitive inline text (images comming soon) with blur, blackout, or CAPTCHA unlock mechanisms. Perfect for protecting sensitive information in user interfaces while maintaining a clean, accessible experience.

**Keywords:** react, npm-package, safety, sensitive, content-protection, hide-text, kid-safe, protect-text

## 🎮 Live Demo

**[Try it out live!](https://lyesweb.github.io/react-sensitive-hide/)** - See all features in action with interactive examples.

## ✨ Features

- 🎯 **Inline Text Hiding** - Wrap sensitive text directly in paragraphs
- 🔒 **Multiple Reveal Modes** - Blur, blackout, or CAPTCHA-based unlocking
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🎨 **Customizable** - Flexible styling and behavior options
- 📦 **Lightweight** - Zero heavy dependencies, tree-shakeable
- 🔧 **TypeScript** - Full type safety and IntelliSense support
- ⚡ **React 18+** - Built with modern React features

## 📦 Installation

```bash
npm install react-sensitive-hide
```

```bash
yarn add react-sensitive-hide
```

```bash
pnpm add react-sensitive-hide
```

## 🚀 Quick Start

```tsx
import { HideMe } from 'react-sensitive-hide';
import 'react-sensitive-hide/styles.css';

function App() {
  return (
    <p>
      Here is some public text. <HideMe>Hidden sensitive text</HideMe> continues here.
    </p>
  );
}
```

## 📖 Usage Examples

### Basic Blur Mode (Default)

```tsx
import { HideMe } from 'react-sensitive-hide';
import 'react-sensitive-hide/styles.css';

<p>
  Your password is <HideMe>super-secret-123</HideMe> and should be kept safe.
</p>
```

### Blackout Mode

```tsx
<HideMe mode="blur" blackOut={true}>
  This text will be completely blacked out
</HideMe>
```

### CAPTCHA Mode

```tsx
<HideMe mode="captcha" captchaDifficulty="easy">
  This content requires solving a simple math problem to reveal
</HideMe>
```

### Custom Styling

```tsx
<HideMe 
  mode="blur" 
  blurAmount={8}
  className="my-custom-class"
  style={{ borderRadius: '4px' }}
>
  Custom styled hidden content
</HideMe>
```

## 🔧 API Reference

### HideMeProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** The content to hide |
| `mode` | `"blur" \| "captcha"` | `"blur"` | Reveal mechanism |
| `blackOut` | `boolean` | `false` | Use blackout instead of blur |
| `blurAmount` | `number` | `5` | CSS blur value (0-20) |
| `captchaDifficulty` | `"easy" \| "medium" \| "hard"` | `"easy"` | Math problem complexity |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

### Mode Details

#### Blur Mode
- **Default behavior** - Text is blurred and can be revealed on click
- **Accessibility** - Screen readers announce "hidden content" with reveal instructions
- **Keyboard** - Focusable with Tab, reveal with Enter/Space

#### CAPTCHA Mode
- **Math problems** - Simple arithmetic (e.g., "5 + 2 = ?")
- **Difficulty levels**:
  - `easy`: Single digit addition/subtraction
  - `medium`: Two digit operations
  - `hard`: Three digit operations with mixed operators
- **Accessibility** - Full keyboard navigation and screen reader support

## 🎨 Styling

**Important:** Don't forget to import the CSS file in your application:

```tsx
import 'react-sensitive-hide/styles.css';
```

The component uses CSS custom properties for easy theming:

```css
.hide-me {
  --hide-me-bg: #f5f5f5;
  --hide-me-text: #333;
  --hide-me-border: #ddd;
  --hide-me-hover-bg: #e0e0e0;
}
```

## ♿ Accessibility

- **ARIA labels** - Proper `aria-hidden` and `aria-label` attributes
- **Keyboard navigation** - Full Tab/Enter/Space support
- **Screen readers** - Clear announcements and instructions
- **Focus management** - Proper focus handling during reveal
- **High contrast** - Works with system high contrast modes

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Format code
npm run format
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/LyesWeb/react-sensitive-hide.git
cd react-sensitive-hide

# Install dependencies
npm install

# Start development server
npm run dev
```


## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.


### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages


## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/LyesWeb/react-sensitive-hide/issues) with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Code example (if applicable)

## 💡 Feature Requests

Have an idea? We'd love to hear it! Please [open an issue](https://github.com/LyesWeb/react-sensitive-hide/issues) with:

- Clear description of the feature
- Use case and motivation
- Proposed API (if applicable)
- Any mockups or examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
