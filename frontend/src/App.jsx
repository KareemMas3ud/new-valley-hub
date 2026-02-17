import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AttractionsPage from './pages/AttractionsPage';
import ServicesPage from './pages/ServicesPage';
import HotelsPage from './pages/HotelsPage';
import MapPage from './pages/MapPage';
import PlannerPage from './pages/PlannerPage';
import MarketplacePage from './pages/MarketplacePage';
import SouvenirPage from './pages/SouvenirPage';
import ContactPage from './pages/ContactPage';
import SearchResults from './pages/SearchResults';
import OfflineIndicator from './components/OfflineIndicator';
import SOSButton from './components/SOSButton';
import ChatbotWidget from './components/ChatbotWidget';

import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFF4E2] text-[#472825] font-sans overflow-x-hidden flex flex-col">
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
            <Route path="/souvenir" element={<SouvenirPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
