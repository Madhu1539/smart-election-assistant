/**
 * voterController.js — Handles eligibility, booth finder, timeline
 */

// ── Mock Booth Data ──────────────────────────────────────────────────────────
const boothDatabase = {
  mumbai: [
    {
      boothNumber: 'MH-001',
      boothName: 'D.N. Nagar Primary School',
      address: 'Plot No. 12, D.N. Nagar, Andheri West, Mumbai - 400053',
      constituency: 'Mumbai North West',
      ward: 'Andheri West',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Ramesh Kulkarni',
    },
    {
      boothNumber: 'MH-002',
      boothName: 'Juhu Municipal School',
      address: 'Juhu Tara Road, Juhu, Mumbai - 400049',
      constituency: 'Mumbai North West',
      ward: 'Juhu',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Ms. Priya Desai',
    },
  ],
  delhi: [
    {
      boothNumber: 'DL-001',
      boothName: 'Rajinder Nagar Govt. School',
      address: 'Rajinder Nagar, New Delhi - 110060',
      constituency: 'New Delhi',
      ward: 'Rajinder Nagar',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Arun Sharma',
    },
    {
      boothNumber: 'DL-002',
      boothName: 'Lajpat Nagar Community Hall',
      address: 'Lajpat Nagar II, New Delhi - 110024',
      constituency: 'South Delhi',
      ward: 'Lajpat Nagar',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Ms. Sunita Mehta',
    },
  ],
  bangalore: [
    {
      boothNumber: 'KA-001',
      boothName: 'Koramangala Govt. High School',
      address: '80 Feet Road, Koramangala, Bangalore - 560034',
      constituency: 'Bangalore South',
      ward: 'Koramangala',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Suresh Reddy',
    },
    {
      boothNumber: 'KA-002',
      boothName: 'Indiranagar Primary School',
      address: '100 Feet Road, Indiranagar, Bangalore - 560038',
      constituency: 'Bangalore Central',
      ward: 'Indiranagar',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Ms. Lakshmi Rao',
    },
  ],
  chennai: [
    {
      boothNumber: 'TN-001',
      boothName: 'T. Nagar Municipal School',
      address: 'Usman Road, T. Nagar, Chennai - 600017',
      constituency: 'Chennai Central',
      ward: 'T. Nagar',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Vijayakumar S.',
    },
  ],
  hyderabad: [
    {
      boothNumber: 'TS-001',
      boothName: 'Banjara Hills Govt. School',
      address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
      constituency: 'Hyderabad',
      ward: 'Banjara Hills',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Rajesh Naik',
    },
  ],
  kolkata: [
    {
      boothNumber: 'WB-001',
      boothName: 'Park Street Primary School',
      address: 'Park Street, Kolkata - 700016',
      constituency: 'Kolkata Dakshin',
      ward: 'Park Street',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Ms. Ananya Bose',
    },
  ],
  pune: [
    {
      boothNumber: 'MH-101',
      boothName: 'Kothrud Municipal School',
      address: 'Kothrud, Pune - 411038',
      constituency: 'Pune',
      ward: 'Kothrud',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Deepak Joshi',
    },
  ],
  ahmedabad: [
    {
      boothNumber: 'GJ-001',
      boothName: 'Navrangpura Govt. School',
      address: 'Navrangpura, Ahmedabad - 380009',
      constituency: 'Ahmedabad East',
      ward: 'Navrangpura',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Kamlesh Patel',
    },
  ],
  jaipur: [
    {
      boothNumber: 'RJ-001',
      boothName: 'Malviya Nagar Govt. School',
      address: 'Malviya Nagar, Jaipur - 302017',
      constituency: 'Jaipur',
      ward: 'Malviya Nagar',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Ms. Kavita Sharma',
    },
  ],
  lucknow: [
    {
      boothNumber: 'UP-001',
      boothName: 'Hazratganj Primary School',
      address: 'Hazratganj, Lucknow - 226001',
      constituency: 'Lucknow',
      ward: 'Hazratganj',
      timing: '7:00 AM – 6:00 PM',
      presiding_officer: 'Mr. Alok Verma',
    },
  ],
};

// ── Election Timeline Data ───────────────────────────────────────────────────
const electionTimeline = [
  {
    id: 1,
    phase: 'Voter Registration Opens',
    date: 'January 1, 2024',
    description: 'New voter registration begins on voters.eci.gov.in using Form 6. Deadline for registration is 30 days before election.',
    icon: '📋',
    status: 'completed',
    color: '#4CAF50',
  },
  {
    id: 2,
    phase: 'Registration Deadline',
    date: 'February 15, 2024',
    description: 'Last date to submit voter registration forms. Also deadline to apply for corrections in existing entries.',
    icon: '⏰',
    status: 'completed',
    color: '#FF9800',
  },
  {
    id: 3,
    phase: 'Final Voter List Published',
    date: 'March 1, 2024',
    description: 'Election Commission publishes the final electoral roll. Check your name at electoralsearch.eci.gov.in.',
    icon: '📜',
    status: 'completed',
    color: '#2196F3',
  },
  {
    id: 4,
    phase: 'Model Code of Conduct',
    date: 'March 16, 2024',
    description: 'Model Code of Conduct comes into effect. Political parties must follow election rules and guidelines.',
    icon: '⚖️',
    status: 'completed',
    color: '#9C27B0',
  },
  {
    id: 5,
    phase: 'Phase 1 Voting',
    date: 'April 19, 2024',
    description: 'First phase voting — 102 constituencies across 21 states/UTs including Andaman, Arunachal Pradesh, Manipur.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 6,
    phase: 'Phase 2 Voting',
    date: 'April 26, 2024',
    description: '89 constituencies across 13 states voting in second phase including Kerala, Karnataka, Rajasthan.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 7,
    phase: 'Phase 3 Voting',
    date: 'May 7, 2024',
    description: '94 constituencies in 12 states — includes Gujarat, Goa, Maharashtra, Jharkhand, Bihar.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 8,
    phase: 'Phase 4 Voting',
    date: 'May 13, 2024',
    description: '96 constituencies across 10 states including Madhya Pradesh, Maharashtra, Andhra Pradesh.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 9,
    phase: 'Phase 5 Voting',
    date: 'May 20, 2024',
    description: '49 constituencies in 8 states including Maharashtra, Uttar Pradesh, West Bengal, Jharkhand.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 10,
    phase: 'Phase 6 Voting',
    date: 'May 25, 2024',
    description: '58 constituencies in 7 states including Delhi, Haryana, Uttar Pradesh, West Bengal.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 11,
    phase: 'Phase 7 Voting',
    date: 'June 1, 2024',
    description: 'Final phase — 57 constituencies in 8 states including Bihar, Himachal Pradesh, Punjab, Uttar Pradesh.',
    icon: '🗳️',
    status: 'completed',
    color: '#F44336',
  },
  {
    id: 12,
    phase: 'Vote Counting & Results',
    date: 'June 4, 2024',
    description: 'Counting of votes begins at 8:00 AM across all constituencies. Results declared throughout the day.',
    icon: '🏆',
    status: 'completed',
    color: '#FF5722',
  },
  {
    id: 13,
    phase: 'Government Formation',
    date: 'June 8–10, 2024',
    description: 'Winning party/alliance invited to form the government. Prime Minister takes oath of office.',
    icon: '🏛️',
    status: 'completed',
    color: '#795548',
  },
];

// ── Eligibility Checker ──────────────────────────────────────────────────────
const checkEligibility = (req, res) => {
  const { age, citizenship } = req.body;

  if (!age || isNaN(age)) {
    return res.status(400).json({ error: 'Valid age is required' });
  }

  const parsedAge = parseInt(age, 10);

  if (parsedAge < 0 || parsedAge > 120) {
    return res.status(400).json({ error: 'Please enter a valid age between 0 and 120.' });
  }

  if (parsedAge >= 18) {
    return res.json({
      eligible: true,
      message: `🎉 You are eligible to vote!`,
      detail: `At ${parsedAge} years old, you meet the minimum age requirement of 18 years. As an Indian citizen, you have the right to vote!`,
      nextSteps: [
        'Check if your name is on the voter list at electoralsearch.eci.gov.in',
        'If not registered, fill Form 6 at voters.eci.gov.in',
        'Carry a valid photo ID on election day',
        'Find your polling booth location',
      ],
    });
  } else {
    const yearsLeft = 18 - parsedAge;
    return res.json({
      eligible: false,
      message: `⏳ Not eligible yet`,
      detail: `You are ${parsedAge} years old. You need to be at least 18 years old to vote in India. You will be eligible in ${yearsLeft} more year${yearsLeft > 1 ? 's' : ''}!`,
      nextSteps: [
        `Mark your calendar — register to vote when you turn 18`,
        'Learn about elections and political parties now',
        'Encourage eligible family members to register and vote',
        'Use our Election Guide to learn the process',
      ],
    });
  }
};

// ── Polling Booth Finder ─────────────────────────────────────────────────────
const findBooth = (req, res) => {
  const { city } = req.params;
  const normalizedCity = city.toLowerCase().trim();

  const booths = boothDatabase[normalizedCity];

  if (booths && booths.length > 0) {
    return res.json({
      found: true,
      city: city,
      totalBooths: booths.length,
      booths,
      note: 'This is mock data for demonstration. For actual booth details, visit electoralsearch.eci.gov.in',
    });
  }

  return res.json({
    found: false,
    city: city,
    message: `No mock booth data available for "${city}". Please visit electoralsearch.eci.gov.in for official booth information.`,
    availableCities: Object.keys(boothDatabase),
    helpline: '1950',
  });
};

// ── Election Timeline ────────────────────────────────────────────────────────
const getTimeline = (req, res) => {
  return res.json({
    election: '18th Lok Sabha General Election 2024',
    totalPhases: 7,
    totalSeats: 543,
    timeline: electionTimeline,
  });
};

module.exports = { checkEligibility, findBooth, getTimeline };
