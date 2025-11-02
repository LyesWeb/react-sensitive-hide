import { HideMe } from 'react-sensitive-hide';
import { useState } from 'react';

type TabId = 'blur' | 'blackout' | 'captcha' | 'age-verification';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'blur', label: 'Default Blur Mode', icon: '👁️' },
  { id: 'blackout', label: 'Blackout Mode', icon: '⬛' },
  { id: 'captcha', label: 'CAPTCHA Mode', icon: '🔢' },
  { id: 'age-verification', label: 'Age Verification Mode', icon: '🔞' },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('blur');

  return (
    <div className="container">
      <header className="header">
        <h1>🔒 React Sensitive Hide</h1>
        <p>Hide sensitive text with blur, blackout, or CAPTCHA protection</p>
      </header>

      <main>
        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Panels */}
        <div className="tab-panels">
          {/* Default Blur Mode */}
          {activeTab === 'blur' && (
            <div
              role="tabpanel"
              id="panel-blur"
              aria-labelledby="tab-blur"
              className="tab-panel"
            >
              <section className="section">
                <h2>Default Blur Mode</h2>
                <p className="section-description">
                  The default mode that applies a blur effect to sensitive content. 
                  Click on the blurred text to reveal it instantly.
                </p>
                
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

                <div className="example">
                  <h3>Custom Blur Amount</h3>
                  <p>
                    You can customize the blur intensity: 
                    <HideMe blurAmount={10}>highly blurred content</HideMe>
                  </p>
                  <div className="code">
{`<HideMe blurAmount={10}>
  highly blurred content
</HideMe>`}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Blackout Mode */}
          {activeTab === 'blackout' && (
            <div
              role="tabpanel"
              id="panel-blackout"
              aria-labelledby="tab-blackout"
              className="tab-panel"
            >
              <section className="section">
                <h2>Blackout Mode</h2>
                <p className="section-description">
                  Completely blacks out sensitive content with solid blocks. 
                  Perfect for redacted information or extra privacy.
                </p>
                
                <div className="example">
                  <h3>Basic Blackout</h3>
                  <p>
                    This text will be completely blacked out: 
                    <HideMe mode="blur" blackOut={true}>This text will be completely blacked out</HideMe>
                  </p>
                  <div className="code">
{`<HideMe mode="blur" blackOut={true}>
  This text will be completely blacked out
</HideMe>`}
                  </div>
                </div>

                <div className="example">
                  <h3>Redacted Document Style</h3>
                  <p>
                    Classified information: <HideMe blackOut={true}>TOP SECRET DOCUMENT</HideMe> requires 
                    clearance level 5 or above.
                  </p>
                  <div className="code">
{`<HideMe blackOut={true}>
  TOP SECRET DOCUMENT
</HideMe>`}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* CAPTCHA Mode */}
          {activeTab === 'captcha' && (
            <div
              role="tabpanel"
              id="panel-captcha"
              aria-labelledby="tab-captcha"
              className="tab-panel"
            >
              <section className="section">
                <h2>CAPTCHA Mode</h2>
                <p className="section-description">
                  Protects content with a math problem that must be solved before revealing. 
                  Great for bot protection or adding an extra verification layer.
                </p>
                
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
            </div>
          )}

          {/* Age Verification Mode */}
          {activeTab === 'age-verification' && (
            <div
              role="tabpanel"
              id="panel-age-verification"
              aria-labelledby="tab-age-verification"
              className="tab-panel"
            >
              <section className="section">
                <h2>Age Verification Mode</h2>
                <p className="section-description">
                  Requires users to verify their age by entering their date of birth. 
                  Ideal for age-restricted content.
                </p>
                
                <div className="example">
                  <h3>Default Age Verification (18+)</h3>
                  <p>
                    This content requires age verification: 
                    <HideMe mode="age-verification">Adult content for 18+ users</HideMe>
                  </p>
                  <div className="code">
{`<HideMe mode="age-verification">
  Adult content for 18+ users
</HideMe>`}
                  </div>
                </div>

                <div className="example">
                  <h3>Custom Minimum Age (21+)</h3>
                  <p>
                    This content requires you to be 21 or older: 
                    <HideMe mode="age-verification" minimumAge={21}>Content for 21+ users only</HideMe>
                  </p>
                  <div className="code">
{`<HideMe mode="age-verification" minimumAge={21}>
  Content for 21+ users only
</HideMe>`}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
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
