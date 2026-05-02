/**
 * chatbotController.js — Keyword-based intelligent chatbot for voter queries
 * Handles common questions Indian voters face.
 */

// ── Response Knowledge Base ──────────────────────────────────────────────────
const knowledgeBase = [
  // Registration queries
  {
    keywords: ['register', 'registration', 'enroll', 'add name', 'voter id apply', 'form 6', 'new voter'],
    response: `📋 **How to Register as a Voter:**\n\n**Online Method:**\n1. Visit **voters.eci.gov.in**\n2. Click "New Voter Registration"\n3. Fill **Form 6** with your details\n4. Upload: Aadhaar / Address Proof / Age Proof\n5. Submit and note down your reference number\n\n**Offline Method:**\n1. Visit your nearest BLO (Booth Level Officer)\n2. Collect Form 6 and fill it\n3. Submit with attested documents\n\n⏱️ Processing takes **15–30 working days**.\n\n💡 You must be **18+ years old** and an Indian citizen to register.`,
    quickReplies: ['How to check registration status?', 'What documents do I need?', 'When is the deadline?'],
  },

  // Lost voter ID
  {
    keywords: ['lost voter id', 'lost epic', 'missing voter card', 'voter card lost', 'duplicate voter id'],
    response: `🔍 **Lost Your Voter ID? Here's What To Do:**\n\n**Step 1:** File an FIR at your local police station (optional but recommended)\n\n**Step 2:** Visit **voters.eci.gov.in**\n1. Login / Register on the portal\n2. Go to **"Apply for Duplicate EPIC"**\n3. Fill **Form 002**\n4. Pay the fee (₹25 approx.)\n5. Submit your application\n\n**Step 3:** You can still vote using:\n- Aadhaar Card\n- Passport\n- Driving License\n- PAN Card (any approved govt photo ID)\n\n📦 The duplicate card will be delivered in **15–20 days**.`,
    quickReplies: ['Alternative ID to vote?', 'How to check voter ID status?'],
  },

  // Name not in voter list
  {
    keywords: ['name not in list', 'not in voter list', 'name missing', 'not in roll', 'deleted from list', 'name removed'],
    response: `❗ **Your Name Is Not in the Voter List?**\n\n**Immediate Check:**\n1. Visit **electoralsearch.eci.gov.in**\n2. Search by Name + Father's Name + DOB\n3. Also search with your EPIC number\n\n**If Not Found:**\n- File **Form 6** for fresh registration\n- Visit your local BLO or ERO (Electoral Registration Officer)\n- You can also call **1950** (Voter Helpline)\n\n**On Election Day without name:**\n- Unfortunately, you **cannot vote** without being on the roll\n- File a complaint for the next election cycle\n\n📌 Always verify your name **30 days before** elections!`,
    quickReplies: ['How to register?', 'Contact election helpline', 'What is BLO?'],
  },

  // Shifted to another city
  {
    keywords: ['shifted', 'moved', 'relocated', 'new city', 'transfer voter id', 'change address', 'new address', 'moved city'],
    response: `🏙️ **Moved to a New City? Update Your Voter Registration!**\n\n**Option 1: Same State Transfer**\n1. Visit **voters.eci.gov.in**\n2. Fill **Form 8A** (Transposition of Entry)\n3. Submit address proof of new location\n\n**Option 2: Different State Transfer**\n1. First **delete** old entry — Fill **Form 7** in old constituency\n2. Register fresh — Fill **Form 6** in new constituency\n\n**Documents Needed:**\n- New address proof (utility bill / Aadhaar / rent agreement)\n- Old voter ID\n\n⚠️ You must transfer your registration to vote at your **current residence**.`,
    quickReplies: ['What documents for address change?', 'How long does it take?'],
  },

  // Polling booth
  {
    keywords: ['polling booth', 'voting booth', 'where to vote', 'booth number', 'voting center', 'booth location'],
    response: `🗳️ **Find Your Polling Booth:**\n\n**Method 1 — Online:**\n1. Visit **electoralsearch.eci.gov.in**\n2. Enter your name or EPIC number\n3. Your booth details will appear on screen\n\n**Method 2 — SMS:**\nSend your EPIC number to **1950**\n\n**Method 3 — Voter Slip:**\nThe Election Commission sends a **voter slip** to your registered address before elections with your booth address.\n\n📍 Use our **Booth Finder** on this page — enter your city and find mock booth details!\n\n💡 **Tip:** Carry your voter slip + any govt photo ID on election day.`,
    quickReplies: ['Find my polling booth', 'What to carry on voting day?'],
  },

  // Election dates
  {
    keywords: ['election date', 'voting date', 'when is election', 'schedule', 'when to vote', 'election schedule', 'dates'],
    response: `📅 **2024 General Election (Lok Sabha) Key Dates:**\n\n| Phase | Date | States Covered |\n|-------|------|----------------|\n| Phase 1 | April 19, 2024 | 21 States |\n| Phase 2 | April 26, 2024 | 13 States |\n| Phase 3 | May 7, 2024 | 12 States |\n| Phase 4 | May 13, 2024 | 10 States |\n| Phase 5 | May 20, 2024 | 8 States |\n| Phase 6 | May 25, 2024 | 7 States |\n| Phase 7 | June 1, 2024 | 8 States |\n| **Results** | **June 4, 2024** | All India |\n\n📌 For state elections, visit **eci.gov.in** for updated schedules.\n\n🔔 Check our **Timeline** page for full details!`,
    quickReplies: ['Check election timeline', 'Registration deadline?'],
  },

  // How to vote
  {
    keywords: ['how to vote', 'voting process', 'voting procedure', 'step to vote', 'on election day', 'voting day'],
    response: `✅ **How to Vote on Election Day:**\n\n**Before You Go:**\n- Carry your **Voter ID / EPIC** or any approved photo ID\n- Check your **polling booth address** (voter slip / eci website)\n- Vote only at your **designated booth**\n\n**At the Booth:**\n1. Show ID to the polling officer\n2. Get your **finger inked** (left index finger)\n3. Press the **EVM button** for your candidate\n4. Collect the **VVPAT slip** confirmation\n\n**Approved IDs (if no voter card):**\n- Aadhaar, Passport, Driving License\n- PAN Card, MNREGA Card, Bank Passbook with photo\n\n🕐 Booths usually open **7:00 AM – 6:00 PM**`,
    quickReplies: ['What ID to carry?', 'Find my polling booth', 'What is EVM?'],
  },

  // Documents
  {
    keywords: ['documents', 'id proof', 'what to carry', 'identity proof', 'required documents', 'proof needed'],
    response: `📄 **Documents for Voter Registration:**\n\n**Age Proof (any one):**\n- Aadhaar Card\n- Birth Certificate\n- School Leaving Certificate\n- Passport\n\n**Address Proof (any one):**\n- Aadhaar Card (with current address)\n- Electricity / Water / Gas Bill (within 3 months)\n- Bank Statement / Passbook\n- Rent Agreement (notarized)\n\n**Photo:**\n- Recent passport-size photograph\n\n**On Election Day (any govt photo ID):**\n- Voter ID / Aadhaar / Passport / Driving License\n- PAN Card / MNREGA Card / Bank Passbook\n\n💡 Aadhaar alone is sufficient for most purposes!`,
    quickReplies: ['How to register?', 'Can I vote without voter ID?'],
  },

  // Helpline
  {
    keywords: ['helpline', 'contact', 'phone', 'call', '1950', 'eci contact', 'help number'],
    response: `📞 **Election Commission Helplines:**\n\n| Service | Contact |\n|---------|--------|\n| **National Voter Helpline** | 📞 **1950** (toll-free) |\n| **ECI Website** | 🌐 eci.gov.in |\n| **Voter Portal** | 🌐 voters.eci.gov.in |\n| **Electoral Search** | 🌐 electoralsearch.eci.gov.in |\n| **cVIGIL App** | 📱 Report malpractice |\n\n🕐 Helpline: **8:00 AM – 8:00 PM** on weekdays\n\n💡 The helpline helps with:\n- Voter registration issues\n- Booth location queries\n- Complaint registration`,
    quickReplies: ['How to register?', 'Report election problem'],
  },

  // EVM
  {
    keywords: ['evm', 'electronic voting machine', 'vvpat', 'voting machine', 'tampered evm'],
    response: `🖥️ **About EVM (Electronic Voting Machine):**\n\n**What is EVM?**\nAn EVM is an electronic device used in Indian elections to record votes electronically, replacing ballot papers.\n\n**How to use EVM:**\n1. The polling officer activates the ballot unit\n2. You see candidate names with their party symbols\n3. Press the **blue button** next to your candidate\n4. A **beep sound** confirms your vote\n\n**VVPAT (Voter Verifiable Paper Audit Trail):**\n- After pressing EVM button, a slip appears in the VVPAT machine\n- It shows the party symbol for 7 seconds\n- This confirms your vote was recorded correctly\n\n🔒 EVMs are **not connected to internet** — they are tamper-proof.`,
    quickReplies: ['How to vote?', 'Election day process'],
  },

  // Eligibility
  {
    keywords: ['eligible', 'eligibility', 'who can vote', 'age to vote', 'can i vote', 'minimum age'],
    response: `✅ **Voter Eligibility in India:**\n\n**To register and vote you must be:**\n1. 🇮🇳 **Indian Citizen**\n2. 🔞 **18 years or older** (as on January 1st of the election year)\n3. 📍 **Ordinary resident** of the constituency\n4. 🧠 **Not declared of unsound mind** by a court\n5. ⚖️ **Not disqualified** under any law\n\n**NRI Voters:**\n- NRIs can register at their last address in India\n- Must be present in India on election day to vote\n\n🎯 Use our **Eligibility Checker** page for instant checking!`,
    quickReplies: ['Check my eligibility', 'How to register?', 'NRI voting rules'],
  },

  // Greeting
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening', 'help'],
    response: `🙏 **Namaste! I'm your Smart Election Assistant.**\n\nI can help you with:\n- 📋 Voter registration\n- 🔍 Lost voter ID\n- 📍 Polling booth location\n- 📅 Election dates & schedule\n- ✅ Eligibility checker\n- 📄 Required documents\n- ❓ Any election-related queries\n\nWhat would you like to know today?`,
    quickReplies: ['How to register?', 'Lost voter ID', 'Find polling booth', 'Election dates'],
  },
];

// ── Default fallback response ────────────────────────────────────────────────
const defaultResponse = {
  response: `🤔 I'm not sure about that specific query. Let me suggest some common topics:\n\n- **Register to vote** — How to enroll\n- **Lost voter ID** — Get a duplicate\n- **Name not in list** — What to do\n- **Polling booth** — Find your booth\n- **Election dates** — View schedule\n- **Eligibility** — Who can vote\n\nFor more help, call **1950** (National Voter Helpline)\n\nTry asking one of the suggestions below! 👇`,
  quickReplies: ['How to register?', 'Lost voter ID', 'Find polling booth', 'Election dates'],
};

// ── Controller function ──────────────────────────────────────────────────────
const getChatbotResponse = (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const query = message.toLowerCase().trim();

  // Score each knowledge base entry by keyword matches
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (query.includes(keyword)) {
        // Longer keyword matches score higher
        score += keyword.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Return best match or default
  if (bestMatch && bestScore > 0) {
    return res.json({
      response: bestMatch.response,
      quickReplies: bestMatch.quickReplies || [],
    });
  }

  return res.json(defaultResponse);
};

module.exports = { getChatbotResponse };
