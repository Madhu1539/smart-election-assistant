/**
 * Timeline.jsx — Election timeline visualization
 */
import { useState, useEffect } from 'react';
import { getElectionTimeline } from '../services/api';
import './Timeline.css';

// Fallback timeline data (in case backend is not running)
const FALLBACK_TIMELINE = [
  { id: 1, phase: 'Voter Registration Opens', date: 'January 1, 2024', description: 'New voter registration begins on voters.eci.gov.in using Form 6.', icon: '📋', status: 'completed', color: '#4CAF50' },
  { id: 2, phase: 'Registration Deadline', date: 'February 15, 2024', description: 'Last date to submit voter registration forms and corrections.', icon: '⏰', status: 'completed', color: '#FF9800' },
  { id: 3, phase: 'Final Voter List Published', date: 'March 1, 2024', description: 'Election Commission publishes the final electoral roll.', icon: '📜', status: 'completed', color: '#2196F3' },
  { id: 4, phase: 'Model Code of Conduct', date: 'March 16, 2024', description: 'Model Code of Conduct comes into effect for all political parties.', icon: '⚖️', status: 'completed', color: '#9C27B0' },
  { id: 5, phase: 'Phase 1 Voting', date: 'April 19, 2024', description: '102 constituencies across 21 states/UTs vote in the first phase.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 6, phase: 'Phase 2 Voting', date: 'April 26, 2024', description: '89 constituencies across 13 states vote in second phase.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 7, phase: 'Phase 3 Voting', date: 'May 7, 2024', description: '94 constituencies in 12 states — Gujarat, Goa, Maharashtra, Bihar.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 8, phase: 'Phase 4 Voting', date: 'May 13, 2024', description: '96 constituencies across 10 states including Madhya Pradesh.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 9, phase: 'Phase 5 Voting', date: 'May 20, 2024', description: '49 constituencies in 8 states including Maharashtra, Uttar Pradesh.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 10, phase: 'Phase 6 Voting', date: 'May 25, 2024', description: '58 constituencies in 7 states including Delhi, Haryana.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 11, phase: 'Phase 7 Voting', date: 'June 1, 2024', description: 'Final phase — 57 constituencies in 8 states including Bihar, Punjab.', icon: '🗳️', status: 'completed', color: '#F44336' },
  { id: 12, phase: 'Vote Counting & Results', date: 'June 4, 2024', description: 'Counting begins at 8:00 AM. Results declared throughout the day.', icon: '🏆', status: 'completed', color: '#FF5722' },
  { id: 13, phase: 'Government Formation', date: 'June 8–10, 2024', description: 'Winning party invited to form government. PM takes oath of office.', icon: '🏛️', status: 'completed', color: '#795548' },
];

const phaseStats = [
  { label: 'Total Phases', value: '7', icon: '📅', color: '#4f46e5' },
  { label: 'Total Seats', value: '543', icon: '🏛️', color: '#7c3aed' },
  { label: 'Eligible Voters', value: '968M+', icon: '👥', color: '#10b981' },
  { label: 'Polling Booths', value: '10.5L+', icon: '🗳️', color: '#f59e0b' },
];

function Timeline() {
  const [timeline, setTimeline] = useState(FALLBACK_TIMELINE);
  const [electionName, setElectionName] = useState('18th Lok Sabha General Election 2024');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getElectionTimeline();
        setTimeline(data.timeline);
        setElectionName(data.election);
      } catch {
        // Use fallback data silently
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  const filteredTimeline = filter === 'all'
    ? timeline
    : timeline.filter((t) => {
        if (filter === 'voting') return t.icon === '🗳️';
        if (filter === 'registration') return t.id <= 3;
        if (filter === 'results') return t.id >= 12;
        return true;
      });

  return (
    <div className="timeline-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header fade-in-up">
          <div className="badge">📅 2024 General Election</div>
          <h1>
            Election
            <span className="gradient-text"> Timeline</span>
          </h1>
          <p>{electionName} — Complete Schedule</p>
        </div>

        {/* Stats row */}
        <div className="timeline-stats fade-in-up fade-in-up-delay-1">
          {phaseStats.map((stat, i) => (
            <div className="tl-stat-card" key={i} id={`tl-stat-${i}`} style={{ borderColor: `${stat.color}30` }}>
              <span className="tl-stat-icon">{stat.icon}</span>
              <span className="tl-stat-value" style={{ color: stat.color }}>{stat.value}</span>
              <span className="tl-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filter buttons */}
        <div className="timeline-filters fade-in-up fade-in-up-delay-2">
          {['all', 'registration', 'voting', 'results'].map((f) => (
            <button
              key={f}
              id={`filter-${f}`}
              className={`filter-btn ${filter === f ? 'filter-btn-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '🌐 All Events' : f === 'registration' ? '📋 Registration' : f === 'voting' ? '🗳️ Voting Days' : '🏆 Results'}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="flex-center" style={{ padding: '60px' }}>
            <div className="spinner" style={{ width: 40, height: 40 }} />
          </div>
        ) : (
          <div className="timeline-container fade-in-up fade-in-up-delay-3">
            <div className="timeline-line" />
            {filteredTimeline.map((event, idx) => (
              <div
                key={event.id}
                className={`timeline-item ${idx % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                id={`timeline-event-${event.id}`}
              >
                {/* Connector dot */}
                <div className="timeline-dot" style={{ background: event.color }}>
                  <span className="timeline-dot-icon">{event.icon}</span>
                </div>

                {/* Card */}
                <div className="timeline-card" style={{ borderLeftColor: event.color }}>
                  <div className="timeline-card-header">
                    <span className="timeline-date">{event.date}</span>
                    <span className={`timeline-status status-${event.status}`}>
                      {event.status === 'completed' ? '✅ Done' : event.status === 'upcoming' ? '🔜 Upcoming' : '🔄 Active'}
                    </span>
                  </div>
                  <h3 className="timeline-phase">{event.phase}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info box */}
        <div className="timeline-info-box fade-in-up">
          <div className="info-box-inner">
            <div className="info-item" id="info-eci">
              <span className="info-icon">🌐</span>
              <div>
                <p className="info-title">Official ECI Website</p>
                <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">eci.gov.in</a>
              </div>
            </div>
            <div className="info-item" id="info-results">
              <span className="info-icon">📊</span>
              <div>
                <p className="info-title">Live Results</p>
                <a href="https://results.eci.gov.in" target="_blank" rel="noopener noreferrer">results.eci.gov.in</a>
              </div>
            </div>
            <div className="info-item" id="info-helpline">
              <span className="info-icon">📞</span>
              <div>
                <p className="info-title">Voter Helpline</p>
                <p className="info-value">1950 (Toll-free)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
