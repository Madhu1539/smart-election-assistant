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
