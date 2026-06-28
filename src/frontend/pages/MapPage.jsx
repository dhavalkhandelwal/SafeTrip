import { useState, useEffect } from 'react';
import { FiMap, FiFilter } from 'react-icons/fi';
import SafetyMap from '../components/map/SafetyMap';
import defaultSafetyZones from '../../backend/data/safetyZones';
import { useAuth } from '../context/AuthContext';

export default function MapPage() {
  const { profile } = useAuth();
  
  const [zones, setZones] = useState(() => {
    const stored = localStorage.getItem('safetrip_zones');
    return stored ? JSON.parse(stored) : defaultSafetyZones.map(z => ({ ...z, reviews: [] }));
  });
  
  const [selectedCity, setSelectedCity] = useState('');
  const cities = [...new Set(zones.map(z => z.city))];

  useEffect(() => localStorage.setItem('safetrip_zones', JSON.stringify(zones)), [zones]);

  const handleAddReview = (zoneId, rating, comment) => {
    setZones(prev => prev.map(zone => {
      if (zone.id !== zoneId) return zone;
      const reviews = [{ id: Date.now(), rating: Number(rating), comment, author: profile?.name || 'Anonymous Traveler', timestamp: new Date().toISOString() }, ...(zone.reviews || [])];
      let newScore = zone.safetyScore;
      if (reviews.length) {
        const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        const w = Math.min(reviews.length * 0.2, 0.8);
        newScore = (zone.safetyScore * (1 - w)) + (avg * w);
      }
      return { ...zone, safetyScore: Number(newScore.toFixed(1)), reviews };
    }));
  };

  return (
    <div className="page-container"><div className="page-inner-wide">
      <div className="page-header flex w-full flex-wrap justify-between items-start gap-4">
        <div>
          <h1><FiMap className="inline text-primary-400 mr-2" />Community Safety Map</h1>
          <p>Explore color-coded safety zones and add your own reviews to update area scores.</p>
        </div>
        <div className="flex items-center gap-3">
          <FiFilter className="text-gray-500" size={16} />
          <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="bg-dark-700 border border-primary-800/30 text-white text-sm rounded-xl py-2 px-4 focus:outline-none">
            <option value="">All Cities</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
      </div>
      <div className="w-full rounded-2xl overflow-hidden border border-primary-500/15 h-[calc(100vh-220px)] min-h-[600px]">
        <SafetyMap city={selectedCity} zones={zones} onAddReview={handleAddReview} />
      </div>
    </div></div>
  );
}
