import { CaptchaDifficulty } from '../types';

export interface MathProblem {
  question: string;
  answer: number;
}

export function generateMathProblem(difficulty: CaptchaDifficulty = 'easy'): MathProblem {
  switch (difficulty) {
    case 'easy':
      return generateEasyProblem();
    case 'medium':
      return generateMediumProblem();
    case 'hard':
      return generateHardProblem();
    default:
      return generateEasyProblem();
  }
}

function generateEasyProblem(): MathProblem {
  const a = Math.floor(Math.random() * 10) + 1; // 1-10
  const b = Math.floor(Math.random() * 10) + 1; // 1-10
  const operations = ['+', '-'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let question: string;
  let answer: number;
  
  if (operation === '+') {
    question = `${a} + ${b}`;
    answer = a + b;
  } else {
    // Ensure positive result for subtraction
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);
    question = `${larger} - ${smaller}`;
    answer = larger - smaller;
  }
  
  return { question, answer };
}

function generateMediumProblem(): MathProblem {
  const a = Math.floor(Math.random() * 20) + 1; // 1-20
  const b = Math.floor(Math.random() * 10) + 1; // 1-10
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let question: string;
  let answer: number;
  
  switch (operation) {
    case '+':
      question = `${a} + ${b}`;
      answer = a + b;
      break;
    case '-':
      // Ensure positive result
      const larger = Math.max(a, b);
      const smaller = Math.min(a, b);
      question = `${larger} - ${smaller}`;
      answer = larger - smaller;
      break;
    case '*':
      question = `${a} × ${b}`;
      answer = a * b;
      break;
    default:
      return generateEasyProblem();
  }
  
  return { question, answer };
}

function generateHardProblem(): MathProblem {
  const a = Math.floor(Math.random() * 50) + 1; // 1-50
  const b = Math.floor(Math.random() * 20) + 1; // 1-20
  const operations = ['+', '-', '*', '/'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let question: string;
  let answer: number;
  
  switch (operation) {
    case '+':
      question = `${a} + ${b}`;
      answer = a + b;
      break;
    case '-':
      // Ensure positive result
      const larger = Math.max(a, b);
      const smaller = Math.min(a, b);
      question = `${larger} - ${smaller}`;
      answer = larger - smaller;
      break;
    case '*':
      question = `${a} × ${b}`;
      answer = a * b;
      break;
    case '/':
      // Ensure clean division
      const product = a * b;
      question = `${product} ÷ ${a}`;
      answer = b;
      break;
    default:
      return generateEasyProblem();
  }
  
  return { question, answer };
}
