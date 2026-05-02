/**
 * Navbar.jsx — Top navigation bar
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/guide', label: 'Guide', icon: '📋' },
  { path: '/eligibility', label: 'Eligibility', icon: '✅' },
  { path: '/chatbot', label: 'Assistant', icon: '💬' },
  { path: '/timeline', label: 'Timeline', icon: '📅' },
  { path: '/booth-finder', label: 'Booth Finder', icon: '📍' },
];

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="nav-logo">
          <div className="logo-icon">🗳️</div>
          <div className="logo-text">
            <span className="logo-main">Election</span>
            <span className="logo-sub">Assistant</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                id={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link to="/chatbot" className="btn btn-primary btn-sm navbar-cta" id="nav-cta">
          🤖 Ask Assistant
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              id={`mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
              className={`mobile-link ${location.pathname === link.path ? 'mobile-link-active' : ''}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
