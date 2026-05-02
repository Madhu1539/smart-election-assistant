/**
 * BoothFinder.jsx — Find polling booth by city
 */
import { useState } from 'react';
import { findBoothByCity } from '../services/api';
import './BoothFinder.css';

const FEATURED_CITIES = [
  { name: 'Mumbai', icon: '🌆', color: '#4f46e5' },
  { name: 'Delhi', icon: '🏛️', color: '#7c3aed' },
  { name: 'Bangalore', icon: '🌿', color: '#10b981' },
  { name: 'Chennai', icon: '🌊', color: '#06b6d4' },
  { name: 'Hyderabad', icon: '🕌', color: '#f59e0b' },
  { name: 'Kolkata', icon: '🎭', color: '#ef4444' },
  { name: 'Pune', icon: '📚', color: '#8b5cf6' },
  { name: 'Ahmedabad', icon: '🏗️', color: '#ec4899' },
  { name: 'Jaipur', icon: '🏰', color: '#f97316' },
  { name: 'Lucknow', icon: '🌹', color: '#14b8a6' },
];

const STEPS_TO_VOTE = [
  { step: 1, icon: '🔍', text: 'Find your booth using our finder' },
  { step: 2, icon: '📋', text: 'Note down booth number & address' },
  { step: 3, icon: '🗓️', text: 'Check your voting date' },
  { step: 4, icon: '🪪', text: 'Carry Voter ID or approved photo ID' },
  { step: 5, icon: '🗳️', text: 'Go to booth and cast your vote!' },
];

function BoothFinder() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const searchBooth = async (cityName) => {
    const searchCity = cityName || city.trim();
    if (!searchCity) { setError('Please enter a city name.'); return; }

    setLoading(true);
    setError('');
    setResult(null);
    setSearched(true);
    setCity(searchCity);

    try {
      const data = await findBoothByCity(searchCity);
      setResult(data);
    } catch (err) {
      setError('Could not connect to server. Please try again or visit electoralsearch.eci.gov.in.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') searchBooth();
  };

  const resetSearch = () => {
    setCity('');
    setResult(null);
    setError('');
    setSearched(false);
  };

  return (
    <div className="booth-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header fade-in-up">
          <div className="badge">📍 Booth Locator</div>
          <h1>
            Polling Booth
            <span className="gradient-text"> Finder</span>
          </h1>
          <p>Find your designated polling booth instantly by entering your city</p>
        </div>

        {/* Search Box */}
        <div className="booth-search-card fade-in-up fade-in-up-delay-1">
          <div className="search-icon-top">🗺️</div>
          <h2 className="search-title">Find Your Polling Booth</h2>
          <p className="search-subtitle">Enter your city to see mock booth details</p>

          <div className="search-input-row">
            <div className="search-input-wrap">
              <span className="search-icon-input">📍</span>
              <input
                id="city-input"
                type="text"
                className="input-field search-field"
                placeholder="Enter city name (e.g. Mumbai, Delhi, Bangalore...)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => searchBooth()}
              disabled={loading || !city.trim()}
              id="search-booth-btn"
            >
              {loading ? '🔍 Searching...' : '🔍 Find Booth'}
            </button>
          </div>

          {/* City Chips */}
          <div className="city-chips">
            <p className="chips-label">Popular Cities:</p>
            <div className="chips-row">
              {FEATURED_CITIES.map((c) => (
                <button
                  key={c.name}
                  className="city-chip"
                  id={`city-chip-${c.name.toLowerCase()}`}
                  onClick={() => searchBooth(c.name)}
                  style={{ borderColor: `${c.color}30`, color: c.color, background: `${c.color}08` }}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error mt-lg fade-in-up" id="booth-error">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-state fade-in-up">
            <div className="spinner" style={{ width: 40, height: 40 }} />
            <p>Searching booths in {city}...</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="booth-results fade-in-up" id="booth-results">
            <div className="results-header">
              <div className="results-info">
                {result.found ? (
                  <>
                    <div className="results-found-badge">
                      ✅ Found {result.totalBooths} Booth{result.totalBooths > 1 ? 's' : ''} in {result.city}
                    </div>
                    <p className="results-note">⚠️ {result.note}</p>
                  </>
                ) : (
                  <div className="results-not-found">
                    <span>❌</span>
                    <div>
                      <h3>No data for "{result.city}"</h3>
                      <p>{result.message}</p>
                    </div>
                  </div>
                )}
              </div>
              <button className="btn btn-secondary btn-sm" onClick={resetSearch} id="reset-search">
                🔄 Search Again
              </button>
            </div>

            {result.found && (
              <div className="booth-cards">
                {result.booths.map((booth, i) => (
                  <div className="booth-card" key={i} id={`booth-card-${i}`}>
                    <div className="booth-card-header">
                      <div className="booth-number-badge">Booth #{booth.boothNumber}</div>
                      <span className="booth-open-status">🟢 Open on Election Day</span>
                    </div>

                    <h3 className="booth-name">🏫 {booth.boothName}</h3>

                    <div className="booth-details">
                      <div className="booth-detail-item" id={`booth-address-${i}`}>
                        <span className="detail-icon">📍</span>
                        <div>
                          <span className="detail-label">Address</span>
                          <span className="detail-value">{booth.address}</span>
                        </div>
                      </div>
                      <div className="booth-detail-item" id={`booth-constituency-${i}`}>
                        <span className="detail-icon">🗺️</span>
                        <div>
                          <span className="detail-label">Constituency</span>
                          <span className="detail-value">{booth.constituency}</span>
                        </div>
                      </div>
                      <div className="booth-detail-item" id={`booth-ward-${i}`}>
                        <span className="detail-icon">🏘️</span>
                        <div>
                          <span className="detail-label">Ward</span>
                          <span className="detail-value">{booth.ward}</span>
                        </div>
                      </div>
                      <div className="booth-detail-item" id={`booth-timing-${i}`}>
                        <span className="detail-icon">🕐</span>
                        <div>
                          <span className="detail-label">Voting Hours</span>
                          <span className="detail-value">{booth.timing}</span>
                        </div>
                      </div>
                      <div className="booth-detail-item" id={`booth-officer-${i}`}>
                        <span className="detail-icon">👤</span>
                        <div>
                          <span className="detail-label">Presiding Officer</span>
                          <span className="detail-value">{booth.presiding_officer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="booth-card-footer">
                      <a
                        href="https://electoralsearch.eci.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        id={`verify-booth-${i}`}
                      >
                        🔍 Verify on ECI →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!result.found && result.availableCities && (
              <div className="available-cities">
                <p className="available-label">Cities with mock data available:</p>
                <div className="available-chips">
                  {result.availableCities.map((c) => (
                    <button
                      key={c}
                      className="city-chip available-chip"
                      id={`avail-city-${c}`}
                      onClick={() => searchBooth(c.charAt(0).toUpperCase() + c.slice(1))}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* How to Vote Steps */}
        {!searched && (
          <div className="voting-steps-section fade-in-up fade-in-up-delay-2">
            <h2 className="text-center mb-xl">
              How to Vote on <span className="gradient-text">Election Day</span>
            </h2>
            <div className="voting-steps-list">
              {STEPS_TO_VOTE.map((s) => (
                <div className="voting-step" key={s.step} id={`vote-step-${s.step}`}>
                  <div className="voting-step-num">{s.step}</div>
                  <div className="voting-step-icon">{s.icon}</div>
                  <p className="voting-step-text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official link box */}
        <div className="official-link-box fade-in-up">
          <span className="official-icon">🏛️</span>
          <div>
            <h3>Find Your Official Booth</h3>
            <p>For accurate booth details, use the official Election Commission portal.</p>
          </div>
          <a
            href="https://electoralsearch.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="eci-search-link"
          >
            Visit ECI Portal →
          </a>
        </div>
      </div>
    </div>
  );
}

export default BoothFinder;
