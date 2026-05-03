# 🗳️ Smart Election Assistant for Voters (India)

> An interactive, full-stack web application to help Indian voters understand elections, check eligibility, find polling booths, and get instant answers via a smart chatbot.

---

## 🚀 Live Features

| Feature | Description |
|---------|-------------|
| 📋 Step-by-Step Guide | 7-step voting process with progress tracking |
| ✅ Eligibility Checker | Instant eligibility check based on age |
| 💬 Smart Chatbot | Keyword-based AI assistant for voter queries |
| 📍 Booth Finder | Find polling booths by city (10 major cities) |
| 📅 Election Timeline | 2024 Lok Sabha election schedule |
| 🔥 Problem Solver | Handles lost ID, name missing, city change, etc. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Fonts | Google Fonts (Bree Serif + Source Sans 3) |
| Styling | Vanilla CSS with CSS Variables |

---

## 📁 Project Structure

```
Election Process Education/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx + Navbar.css
│   │   │   ├── Card.jsx + Card.css
│   │   │   └── Button.jsx + Button.css
│   │   ├── pages/
│   │   │   ├── Home.jsx + Home.css
│   │   │   ├── Guide.jsx + Guide.css
│   │   │   ├── Eligibility.jsx + Eligibility.css
│   │   │   ├── Chatbot.jsx + Chatbot.css
│   │   │   ├── Timeline.jsx + Timeline.css
│   │   │   └── BoothFinder.jsx + BoothFinder.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── chatbotController.js
│   │   └── voterController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Voter.js
│   ├── routes/
│   │   ├── chatbotRoutes.js
│   │   └── voterRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── database/
│   ├── connection.js
│   ├── models/
│   └── seed/
│       └── mockData.json
│
└── README.md
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Chatbot response |
| POST | `/api/voter/eligibility` | Check voter eligibility |
| GET | `/api/voter/booth/:city` | Find polling booths by city |
| GET | `/api/voter/timeline` | Get election timeline |
| GET | `/api/health` | Health check |

---

## 💬 Chatbot Supported Queries

The chatbot handles these topics intelligently:

- 📋 How to register to vote
- 🔍 Lost voter ID / duplicate EPIC
- 📜 Name not in voter list
- 🏙️ Shifted to another city
- 📍 Polling booth location
- 📅 Election dates
- ✅ Voter eligibility
- 📄 Required documents
- 📞 Helpline numbers
- 🖥️ EVM & VVPAT information

---

## 📍 Cities Available in Booth Finder (Mock Data)

Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow

For actual booth details: [electoralsearch.eci.gov.in](https://electoralsearch.eci.gov.in)

---

## 🧪 Testing

### Testing Approach
The application has undergone thorough manual testing along with basic validation checks. Our primary goal was to ensure all core functionalities, especially the AI assistant and voter tools, work smoothly under various conditions and user interactions.

### Types of Testing Performed
- **Functional Testing**: Verified that all core features (eligibility check, booth finder, timeline) work as intended.
- **Input Validation Testing**: Ensured forms and chat inputs handle incorrect or empty data safely.
- **UI/UX Testing**: Confirmed responsive design across mobile, tablet, and desktop views.
- **Performance Testing**: Checked page load times and chatbot response delays.
- **Error Handling Testing**: Simulated network failures and incorrect API responses to ensure graceful fallbacks.

### Test Cases

| Test Case | Input/Action | Expected Output | Status |
|-----------|--------------|-----------------|--------|
| **Valid user query** | "How to register to vote?" | Chatbot provides step-by-step registration guide. | ✅ Pass |
| **Empty input** | Submit empty chat message | No message sent, input field remains focused. | ✅ Pass |
| **Invalid/random input** | "asdfghjkl" | Chatbot asks for clarification or provides a default fallback message. | ✅ Pass |
| **Election-related question** | "Where is my polling booth?" | Chatbot directs the user to the Booth Finder tool. | ✅ Pass |
| **Non-related question** | "What is the weather today?" | Chatbot states it can only answer election-related queries. | ✅ Pass |
| **Eligibility check - Underage** | Enter age "16" | Shows "Not Eligible" with the required age criteria. | ✅ Pass |
| **Eligibility check - Valid** | Enter age "20" | Shows "Eligible" with next steps to register. | ✅ Pass |
| **Navigation Button click** | Click "Find Booth" in navigation | Redirects smoothly to the Booth Finder page. | ✅ Pass |
| **API failure / no internet** | Disconnect internet & send query | Shows a friendly error message like "Unable to connect". | ✅ Pass |

### Conclusion
Based on the testing results, the Election Process Assistant is stable, responsive, and handles edge cases properly. The application successfully manages unexpected user inputs and network issues, providing a seamless and educational experience for voters.

---

## 🔗 Official Resources

| Resource | URL |
|---------|-----|
| Election Commission India | https://eci.gov.in |
| Voter Registration Portal | https://voters.eci.gov.in |
| Electoral Search | https://electoralsearch.eci.gov.in |
| Results | https://results.eci.gov.in |
| Voter Helpline | **1950** (Toll-free) |

---

## 👨‍💻 Development Notes

- Frontend runs with **Vite** for fast HMR
- Backend uses **nodemon** for auto-restart
- All chatbot responses are keyword-matched (no external AI API needed)
- App works with graceful fallbacks even without MongoDB running
- Fully responsive — works on mobile, tablet, and desktop

---

*Built for educational purposes. Data sourced from ECI.*
