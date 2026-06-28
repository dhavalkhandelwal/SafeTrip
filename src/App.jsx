import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './frontend/context/AuthContext';
import Navbar from './frontend/components/layout/Navbar';
import Home from './frontend/pages/Home';
import MapPage from './frontend/pages/MapPage';
import ItineraryPage from './frontend/pages/ItineraryPage';
import ProfilePage from './frontend/pages/ProfilePage';
import SOSPage from './frontend/pages/SOSPage';
import ResourcesPage from './frontend/pages/ResourcesPage';
import DashboardPage from './frontend/pages/DashboardPage';
import LoginPage from './frontend/pages/LoginPage';
import SignupPage from './frontend/pages/SignupPage';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/sos" element={<SOSPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
