/**
 * App.jsx — Root component with routing
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Eligibility from './pages/Eligibility';
import Chatbot from './pages/Chatbot';
import Timeline from './pages/Timeline';
import BoothFinder from './pages/BoothFinder';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/booth-finder" element={<BoothFinder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
