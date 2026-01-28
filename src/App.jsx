
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PlayerDetail from './pages/PlayerDetail';
import Rankings from './pages/Rankings'; // Placeholder for now
import Schedule from './pages/Schedule'; // Placeholder for now
import NetWorth from './pages/NetWorth'; // Placeholder for now

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/net-worth" element={<NetWorth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
