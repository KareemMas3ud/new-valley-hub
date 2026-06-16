import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AttractionsPage from './pages/AttractionsPage';
import ServicesPage from './pages/ServicesPage';
import HotelsPage from './pages/HotelsPage';
import MapPage from './pages/MapPage';
import PlannerPage from './pages/PlannerPage';
import MarketplacePage from './pages/MarketplacePage';
import VirtualMuseumPage from './pages/VirtualMuseumPage';
import SouvenirPage from './pages/SouvenirPage';
import ContactPage from './pages/ContactPage';
import SearchResults from './pages/SearchResults';
import MyTrips from './pages/MyTrips';
import OfflineIndicator from './components/OfflineIndicator';
import SOSButton from './components/SOSButton';
import ChatbotWidget from './components/ChatbotWidget';
import BackToTop from './components/BackToTop';

import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen overflow-x-hidden flex flex-col theme-transition" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <OfflineIndicator />
            <SOSButton />
            <ChatbotWidget />
            <Navbar />
            <main className="pt-20 flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/attractions" element={<AttractionsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/museum" element={<VirtualMuseumPage />} />
                <Route path="/souvenir" element={<SouvenirPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/my-trips" element={<MyTrips />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
