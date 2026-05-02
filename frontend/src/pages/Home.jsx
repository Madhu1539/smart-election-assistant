/**
 * Home.jsx — Hero landing page
 */
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  {
    icon: '📋',
    title: 'Step-by-Step Guide',
    desc: 'Complete voting process from registration to casting your vote',
    path: '/guide',
    color: '#4f46e5',
    id: 'feature-guide',
  },
  {
    icon: '✅',
    title: 'Eligibility Checker',
    desc: 'Instantly check if you qualify to vote in Indian elections',
    path: '/eligibility',
    color: '#10b981',
    id: 'feature-eligibility',
  },
  {
    icon: '💬',
    title: 'Smart Assistant',
    desc: 'AI chatbot to answer all your voter queries instantly',
    path: '/chatbot',
    color: '#7c3aed',
    id: 'feature-chatbot',
  },
  {
    icon: '📍',
    title: 'Booth Finder',
    desc: 'Find your polling booth location by entering your city',
    path: '/booth-finder',
    color: '#f59e0b',
    id: 'feature-booth',
  },
  {
    icon: '📅',
    title: 'Election Timeline',
    desc: 'View all important election dates and phases at a glance',
    path: '/timeline',
    color: '#ef4444',
    id: 'feature-timeline',
  },
  {
    icon: '🏛️',
    title: 'Know Your Rights',
    desc: 'Understand voter rights, EVM usage, and election rules',
    path: '/chatbot',
    color: '#06b6d4',
    id: 'feature-rights',
  },
];

const stats = [
  { number: '968M+', label: 'Registered Voters', icon: '👥' },
  { number: '10.5L+', label: 'Polling Booths', icon: '🗳️' },
  { number: '543', label: 'Lok Sabha Seats', icon: '🏛️' },
  { number: '7', label: 'Election Phases', icon: '📅' },
];

const problems = [
  { icon: '❓', text: "Don't know how to register?" },
  { icon: '🔍', text: 'Lost your Voter ID card?' },
  { icon: '📜', text: 'Name missing from voter list?' },
  { icon: '🏙️', text: 'Moved to a new city?' },
  { icon: '📍', text: "Don't know your polling booth?" },
  { icon: '📅', text: 'Confused about election dates?' },
];

function Home() {
  return (
    <div className="home-page">
      {/* ── Hero Section ── */}
      <section className="hero-section">
        {/* Decorative blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="hero-content">
          <div className="hero-badge fade-in-up">
            🇮🇳 India's Voter Assistance Platform
          </div>

          <h1 className="hero-title fade-in-up fade-in-up-delay-1">
            Smart Election
            <span className="hero-title-gradient"> Assistant</span>
          </h1>

          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">
            Your personal voting guide for Indian elections. Get step-by-step help,
            check eligibility, find your polling booth, and get instant answers — all in one place.
          </p>

          <div className="hero-buttons fade-in-up fade-in-up-delay-3">
            <Link to="/guide" className="btn btn-primary btn-lg" id="hero-btn-guide">
              📋 Start Election Guide
            </Link>
            <Link to="/eligibility" className="btn btn-secondary btn-lg" id="hero-btn-eligibility">
              ✅ Check Eligibility
            </Link>
            <Link to="/chatbot" className="btn btn-accent btn-lg" id="hero-btn-chatbot">
              💬 Ask Assistant
            </Link>
          </div>
        </div>

        {/* Election Day Reminder */}
        <div className="hero-card fade-in-up fade-in-up-delay-4">
          <div className="hero-card-inner">
            <span className="hero-card-icon">🗳️</span>
            <div>
              <p className="hero-card-title">Your Vote Matters!</p>
              <p className="hero-card-sub">Every single vote shapes India's future. Be an informed voter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="stats-section">
        <div className="page-container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i} id={`stat-${i}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem → Solution Section ── */}
      <section className="problems-section">
        <div className="page-container">
          <div className="page-header">
            <div className="badge">🚨 Real Problems, Real Solutions</div>
            <h2>We Solve Real Voter Problems</h2>
            <p className="section-desc">
              Whether you're a first-time voter or a seasoned one, we handle every challenge you face
            </p>
          </div>

          <div className="problems-grid">
            {problems.map((problem, i) => (
              <div className="problem-item" key={i} id={`problem-${i}`}>
                <span className="problem-icon">{problem.icon}</span>
                <span className="problem-text">{problem.text}</span>
                <span className="problem-arrow">→</span>
                <Link to="/chatbot" className="problem-solve">
                  Get Help
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="features-section section-gradient">
        <div className="page-container">
          <div className="page-header">
            <div className="badge">🔥 All Features</div>
            <h2>Everything You Need to Vote</h2>
            <p className="section-desc">
              A complete toolkit for every Indian voter — simple, fast, and accessible
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <Link
                to={feature.path}
                className="feature-card"
                key={feature.id}
                id={feature.id}
              >
                <div className="feature-icon-wrap" style={{ background: `${feature.color}15`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <span className="feature-cta" style={{ color: feature.color }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="page-container">
          <div className="cta-banner">
            <div className="cta-blob cta-blob-1" />
            <div className="cta-blob cta-blob-2" />
            <div className="cta-content">
              <h2 className="cta-title">Ready to Make Your Vote Count?</h2>
              <p className="cta-desc">
                Join millions of informed Indian voters. Start your journey today!
              </p>
              <div className="cta-buttons">
                <Link to="/guide" className="btn btn-primary btn-lg" id="cta-guide">
                  📋 Start Guide
                </Link>
                <Link to="/chatbot" className="btn btn-secondary btn-lg" id="cta-chat">
                  💬 Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <div className="page-container">
          <div className="footer-inner">
            <div className="footer-logo">
              <span>🗳️</span>
              <div>
                <p className="footer-logo-main">Smart Election Assistant</p>
                <p className="footer-logo-sub">Empowering Indian Voters</p>
              </div>
            </div>
            <div className="footer-links">
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">ECI Official Site</a>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">Voter Portal</a>
              <a href="https://electoralsearch.eci.gov.in" target="_blank" rel="noopener noreferrer">Electoral Search</a>
            </div>
            <p className="footer-helpline">📞 Helpline: <strong>1950</strong></p>
          </div>
          <p className="footer-copyright">
            © 2024 Smart Election Assistant. Educational project. Data sourced from ECI.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
