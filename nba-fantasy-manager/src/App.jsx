import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NBAProvider } from './context/NBAContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import PlayerStats from './pages/PlayerStats';
import StreamingOpportunities from './pages/StreamingOpportunities';
import RosterUpload from './pages/RosterUpload';
import InjuryTracking from './pages/InjuryTracking';
import './App.css';

function App() {
  return (
    <NBAProvider>
      <Router basename="/nba-fantasy-manager/">
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/player-stats" element={<PlayerStats />} />
            <Route path="/streaming" element={<StreamingOpportunities />} />
            <Route path="/roster" element={<RosterUpload />} />
            <Route path="/injuries" element={<InjuryTracking />} />
          </Routes>
        </div>
      </Router>
    </NBAProvider>
  );
}

export default App;
