import { HideMe } from 'react-sensitive-hide';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>🔒 React Sensitive Hide</h1>
        <p>Hide sensitive text with blur, blackout, or CAPTCHA protection</p>
      </header>

      <main>
        <section className="section">
          <h2>Default Blur Mode</h2>
          
          <div className="example">
            <h3>Basic Usage</h3>
            <p>
              This is a normal paragraph with some <HideMe>sensitive information</HideMe> that 
              you can reveal by clicking on it.
            </p>
            <div className="code">
{`<HideMe>sensitive information</HideMe>`}
            </div>
          </div>
        </section>

        <section className="section">
          <h2>CAPTCHA Mode</h2>
          
          <div className="example">
            <h3>Easy Difficulty</h3>
            <p>
              This content requires solving a simple math problem to reveal: 
              <HideMe mode="captcha" captchaDifficulty="easy">secret password: admin123</HideMe>
            </p>
            <div className="code">
{`<HideMe mode="captcha" captchaDifficulty="easy">
  secret password: admin123
</HideMe>`}
            </div>
          </div>

          <div className="example">
            <h3>Medium Difficulty</h3>
            <p>
              Medium difficulty math problems: 
              <HideMe mode="captcha" captchaDifficulty="medium">API key: xyz789</HideMe>
            </p>
            <div className="code">
{`<HideMe mode="captcha" captchaDifficulty="medium">
  API key: xyz789
</HideMe>`}
            </div>
          </div>

          <div className="example">
            <h3>Hard Difficulty</h3>
            <p>
              Hard difficulty with more complex math: 
              <HideMe mode="captcha" captchaDifficulty="hard">Database password: superSecret2024!</HideMe>
            </p>
            <div className="code">
{`<HideMe mode="captcha" captchaDifficulty="hard">
  Database password: superSecret2024!
</HideMe>`}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          <a href="https://github.com/LyesWeb/react-sensitive-hide" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
