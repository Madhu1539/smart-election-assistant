/**
 * Eligibility.jsx — Voter eligibility checker with age input
 */
import { useState } from 'react';
import { checkEligibility } from '../services/api';
import './Eligibility.css';

const quickFacts = [
  { icon: '🔞', title: 'Minimum Age', value: '18 Years' },
  { icon: '🇮🇳', title: 'Citizenship', value: 'Indian Citizen' },
  { icon: '📍', title: 'Residency', value: 'Current Constituency' },
  { icon: '🧠', title: 'Mental Status', value: 'Sound Mind' },
];

function Eligibility() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      setError('Please enter a valid age between 1 and 120.');
      return;
    }

    setLoading(true);
    try {
      const data = await checkEligibility(parsedAge);
      setResult(data);
    } catch (err) {
      // Fallback: client-side eligibility if backend unavailable
      const eligible = parsedAge >= 18;
      const yearsLeft = 18 - parsedAge;
      setResult({
        eligible,
        message: eligible ? '🎉 You are eligible to vote!' : '⏳ Not eligible yet',
        detail: eligible
          ? `At ${parsedAge} years old, you meet the minimum age requirement of 18 years. As an Indian citizen, you have the right to vote!`
          : `You are ${parsedAge} years old. You need to be at least 18 years old to vote in India. You will be eligible in ${yearsLeft} more year${yearsLeft > 1 ? 's' : ''}!`,
        nextSteps: eligible
          ? [
              'Check if your name is on the voter list at electoralsearch.eci.gov.in',
              'If not registered, fill Form 6 at voters.eci.gov.in',
              'Carry a valid photo ID on election day',
              'Find your polling booth location',
            ]
          : [
              `Mark your calendar — register when you turn 18`,
              'Learn about elections and political parties now',
              'Encourage eligible family members to vote',
              'Use our Election Guide to learn the process',
            ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAge('');
    setResult(null);
    setError('');
  };

  return (
    <div className="eligibility-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header fade-in-up">
          <div className="badge">✅ Instant Check</div>
          <h1>
            Voter Eligibility
            <span className="gradient-text"> Checker</span>
          </h1>
          <p>Find out instantly if you are eligible to vote in Indian elections</p>
        </div>

        <div className="eligibility-layout">
          {/* Left — Checker Form */}
          <div className="checker-card fade-in-up fade-in-up-delay-1">
            <div className="checker-icon">🗳️</div>
            <h2 className="checker-title">Check Your Eligibility</h2>
            <p className="checker-subtitle">Enter your age to know if you can vote</p>

            <form onSubmit={handleCheck} id="eligibility-form">
              <div className="input-group">
                <label htmlFor="age-input">Your Current Age</label>
                <input
                  id="age-input"
                  type="number"
                  className="input-field age-input"
                  placeholder="e.g. 21"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                />
              </div>

              {error && (
                <div className="alert alert-error mb-md">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading || !age}
                id="check-eligibility-btn"
              >
                {loading ? (
                  <><span className="spinner" style={{width:18,height:18,marginRight:8}} />Checking...</>
                ) : (
                  '✅ Check Now'
                )}
              </button>
            </form>

            {/* Quick age buttons */}
            <div className="quick-ages">
              <p className="quick-ages-label">Quick Test:</p>
              <div className="quick-ages-btns">
                {[16, 17, 18, 21, 25, 35].map((a) => (
                  <button
                    key={a}
                    className={`age-btn ${age === String(a) ? 'age-btn-active' : ''}`}
                    onClick={() => { setAge(String(a)); setResult(null); setError(''); }}
                    id={`age-btn-${a}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Result + Facts */}
          <div className="eligibility-right">
            {/* Result Box */}
            {result && (
              <div className={`result-box ${result.eligible ? 'result-eligible' : 'result-not-eligible'} fade-in-up`} id="eligibility-result">
                <div className="result-header">
                  <div className="result-emoji">
                    {result.eligible ? '🎉' : '⏳'}
                  </div>
                  <div>
                    <h3 className="result-message">{result.message}</h3>
                    <p className="result-detail">{result.detail}</p>
                  </div>
                </div>

                <div className="result-next-steps">
                  <h4>What to do next:</h4>
                  <ul>
                    {result.nextSteps.map((step, i) => (
                      <li key={i} id={`next-step-${i}`}>
                        <span className={`next-step-icon ${result.eligible ? 'icon-success' : 'icon-info'}`}>
                          {result.eligible ? '→' : 'ℹ'}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                  id="reset-eligibility"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  🔄 Check Again
                </button>
              </div>
            )}

            {/* Quick Facts */}
            {!result && (
              <div className="quick-facts fade-in-up fade-in-up-delay-2">
                <h3 className="facts-title">Eligibility Requirements</h3>
                <div className="facts-grid">
                  {quickFacts.map((fact, i) => (
                    <div className="fact-item" key={i} id={`fact-${i}`}>
                      <span className="fact-icon">{fact.icon}</span>
                      <div>
                        <p className="fact-title">{fact.title}</p>
                        <p className="fact-value">{fact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="nri-box">
                  <h4>🌏 NRI Voters</h4>
                  <p>
                    Non-Resident Indians can register at their last address in India.
                    They must be present on election day to vote.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* What Should I Do Now section */}
        <div className="what-now-section fade-in-up fade-in-up-delay-3">
          <h2 className="text-center mb-xl">
            What Should I Do <span className="gradient-text">Now?</span>
          </h2>
          <div className="what-now-grid">
            <div className="what-now-card" id="what-now-register">
              <span className="what-now-icon">📋</span>
              <h3>Not Registered Yet?</h3>
              <p>Visit voters.eci.gov.in and fill Form 6 to register as a voter. It's free and takes 30 minutes.</p>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Register Now →
              </a>
            </div>
            <div className="what-now-card" id="what-now-search">
              <span className="what-now-icon">🔍</span>
              <h3>Already Registered?</h3>
              <p>Check your name on the electoral roll and find your booth at electoralsearch.eci.gov.in.</p>
              <a href="https://electoralsearch.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Find My Name →
              </a>
            </div>
            <div className="what-now-card" id="what-now-help">
              <span className="what-now-icon">💬</span>
              <h3>Have Questions?</h3>
              <p>Ask our Smart Assistant about any voter query — lost ID, booth location, dates, and more.</p>
              <a href="/chatbot" className="btn btn-primary btn-sm">
                Ask Assistant →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eligibility;
