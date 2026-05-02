/**
 * Guide.jsx — Step-by-step voting process guide with progress tracking
 */
import { useState } from 'react';
import './Guide.css';

const steps = [
  {
    id: 1,
    title: 'Check Your Eligibility',
    icon: '✅',
    color: '#4f46e5',
    duration: '5 minutes',
    difficulty: 'Easy',
    description:
      'Ensure you meet the basic requirements to vote in India. You must be an Indian citizen, 18 years or older, and an ordinary resident of the constituency.',
    substeps: [
      'Must be an Indian Citizen',
      'Must be 18+ years old as on January 1st of election year',
      'Must be ordinary resident of the constituency',
      'Must not be disqualified by law or declared of unsound mind',
    ],
    tip: '💡 Use our Eligibility Checker to verify in seconds!',
    link: '/eligibility',
    linkText: 'Check Eligibility →',
  },
  {
    id: 2,
    title: 'Gather Your Documents',
    icon: '📄',
    color: '#10b981',
    duration: '1 day',
    difficulty: 'Easy',
    description:
      'Collect all necessary documents before starting registration. This ensures a smooth application process.',
    substeps: [
      'Age Proof: Aadhaar / Birth Certificate / Passport / School Certificate',
      'Address Proof: Aadhaar / Electricity Bill / Bank Passbook / Rent Agreement',
      'Recent Passport-size Photograph (2 copies)',
      'Mobile number for OTP verification',
    ],
    tip: '💡 Aadhaar card alone covers both age and address proof!',
  },
  {
    id: 3,
    title: 'Register as a Voter',
    icon: '📋',
    color: '#7c3aed',
    duration: '30 minutes',
    difficulty: 'Medium',
    description:
      'Submit Form 6 online or offline to add your name to the electoral roll. Registration is free.',
    substeps: [
      'Visit voters.eci.gov.in and create account',
      'Click "New Voter Registration" → Fill Form 6',
      'Upload scanned documents (PDF/JPG format)',
      'Submit and note your Reference/Application number',
      'Offline: Visit your BLO with physical Form 6',
    ],
    tip: '💡 The registration window opens January 1st each year!',
  },
  {
    id: 4,
    title: 'Track Your Application',
    icon: '🔍',
    color: '#f59e0b',
    duration: '15–30 days',
    difficulty: 'Easy',
    description:
      'After submitting, your application is reviewed by the Booth Level Officer (BLO). Track status online.',
    substeps: [
      'Visit voters.eci.gov.in > "Track Application Status"',
      'Enter Reference Number received after submission',
      'BLO may visit your address for verification',
      'You may receive an SMS update when approved',
    ],
    tip: '💡 Processing typically takes 15–30 working days.',
  },
  {
    id: 5,
    title: 'Find Your Voter ID & Booth',
    icon: '📍',
    color: '#06b6d4',
    duration: '10 minutes',
    difficulty: 'Easy',
    description:
      'Once registered, find your EPIC (Voter ID) number and locate your designated polling booth.',
    substeps: [
      'Visit electoralsearch.eci.gov.in',
      'Search by Name, DOB, and Father\'s Name',
      'Note your EPIC number and Booth Number',
      'Download and print your Voter ID from the portal',
    ],
    tip: '💡 Use our Booth Finder to quickly locate your booth!',
    link: '/booth-finder',
    linkText: 'Find Your Booth →',
  },
  {
    id: 6,
    title: 'Election Day — Go Vote!',
    icon: '🗳️',
    color: '#ef4444',
    duration: 'Election Day',
    difficulty: 'Easy',
    description:
      'On election day, carry your voter ID and proceed to your designated polling booth. The entire process takes 15–20 minutes.',
    substeps: [
      'Carry Voter ID or any approved government photo ID',
      'Go to YOUR designated polling booth only',
      'Join queue — polling officers will verify your identity',
      'Finger is inked (indelible ink) — cast your vote on EVM',
      'Check VVPAT slip to confirm your vote',
    ],
    tip: '💡 Booths are open from 7:00 AM to 6:00 PM on election day.',
  },
  {
    id: 7,
    title: 'Results & Next Steps',
    icon: '🏆',
    color: '#ec4899',
    duration: 'Count Day',
    difficulty: 'Informational',
    description:
      'Vote counting happens on a designated day (announced by ECI). Results are typically declared the same day.',
    substeps: [
      'Results broadcast live on News channels & ECI website',
      'Check results at results.eci.gov.in',
      'Winning candidate takes oath and joins the legislature',
      'Stay engaged — hold your elected representative accountable!',
    ],
    tip: '💡 Check our Timeline page for exact result dates!',
    link: '/timeline',
    linkText: 'View Timeline →',
  },
];

function Guide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const progress = Math.round(((completedSteps.length) / steps.length) * 100);
  const activeStep = steps[currentStep];

  const markComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (idx) => setCurrentStep(idx);

  return (
    <div className="guide-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header fade-in-up">
          <div className="badge">📋 7 Steps</div>
          <h1>
            Complete Voting
            <span className="gradient-text"> Guide</span>
          </h1>
          <p>Follow this step-by-step guide to participate in Indian elections like a pro</p>
        </div>

        {/* Progress Bar */}
        <div className="guide-progress fade-in-up fade-in-up-delay-1">
          <div className="progress-info">
            <span className="progress-label">Your Progress</span>
            <span className="progress-value">{completedSteps.length} of {steps.length} steps completed</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          {progress === 100 && (
            <div className="alert alert-success mt-md">
              🎉 Congratulations! You know everything about the voting process!
            </div>
          )}
        </div>

        {/* Step Navigation Dots */}
        <div className="step-dots fade-in-up fade-in-up-delay-2">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              id={`step-dot-${idx}`}
              className={`step-dot ${idx === currentStep ? 'step-dot-active' : ''} ${completedSteps.includes(idx) ? 'step-dot-done' : ''}`}
              onClick={() => goToStep(idx)}
              title={step.title}
            >
              {completedSteps.includes(idx) ? '✓' : step.icon}
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="step-card-main fade-in-up fade-in-up-delay-3" id={`step-card-${currentStep}`}>
          {/* Step header */}
          <div className="step-card-header" style={{ borderLeftColor: activeStep.color }}>
            <div className="step-number-badge" style={{ background: activeStep.color }}>
              Step {activeStep.id}
            </div>
            <div className="step-card-meta">
              <span className="step-meta-item">⏱️ {activeStep.duration}</span>
              <span className="step-meta-item">📊 {activeStep.difficulty}</span>
            </div>
          </div>

          <div className="step-card-body">
            <div className="step-icon-wrap" style={{ background: `${activeStep.color}15` }}>
              <span className="step-icon-big" style={{ color: activeStep.color }}>
                {activeStep.icon}
              </span>
            </div>
            <div className="step-card-content">
              <h2 className="step-title">{activeStep.title}</h2>
              <p className="step-description">{activeStep.description}</p>

              {/* Sub steps */}
              <div className="substeps-list">
                <h4>What to do:</h4>
                <ul>
                  {activeStep.substeps.map((sub, i) => (
                    <li key={i} className="substep-item" id={`substep-${currentStep}-${i}`}>
                      <span className="substep-check" style={{ background: activeStep.color }}>✓</span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tip */}
              <div className="step-tip">
                <p>{activeStep.tip}</p>
              </div>

              {/* Link if available */}
              {activeStep.link && (
                <a href={activeStep.link} className="step-link" style={{ color: activeStep.color }}>
                  {activeStep.linkText}
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="step-navigation">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              id="step-prev"
            >
              ← Previous
            </button>

            <button
              className="btn btn-primary"
              onClick={markComplete}
              id={currentStep === steps.length - 1 ? 'step-finish' : 'step-next'}
            >
              {completedSteps.includes(currentStep)
                ? currentStep === steps.length - 1
                  ? '🎉 Completed!'
                  : 'Next Step →'
                : currentStep === steps.length - 1
                ? '✅ Mark Complete'
                : '✅ Done, Next Step →'}
            </button>
          </div>
        </div>

        {/* Step List Overview */}
        <div className="steps-overview">
          <h3 className="steps-overview-title">All Steps Overview</h3>
          <div className="steps-list">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`steps-list-item ${idx === currentStep ? 'steps-list-active' : ''} ${completedSteps.includes(idx) ? 'steps-list-done' : ''}`}
                onClick={() => goToStep(idx)}
                id={`step-list-${idx}`}
              >
                <div className="steps-list-icon" style={{ background: `${step.color}20`, color: step.color }}>
                  {completedSteps.includes(idx) ? '✅' : step.icon}
                </div>
                <div className="steps-list-info">
                  <span className="steps-list-num">Step {step.id}</span>
                  <span className="steps-list-name">{step.title}</span>
                </div>
                <span className="steps-list-time">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guide;
