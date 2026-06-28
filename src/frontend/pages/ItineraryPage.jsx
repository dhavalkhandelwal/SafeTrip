import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import PlannerForm from '../components/itinerary/PlannerForm';
import ItineraryResult from '../components/itinerary/ItineraryResult';
import { generateItinerary } from '../../backend/services/aiService';

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (form) => {
    setLoading(true);
    setItinerary(null);
    setError(null);
    try {
      const result = await generateItinerary(form);
      setItinerary(result);
    } catch (err) {
      console.error('Itinerary generation error:', err);
      setError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <h1><FiCalendar style={{ color: '#8577f8' }} /> Smart Itinerary Planner</h1>
          <p>Let AI build a safe, budget-aware daily plan tailored for you</p>
        </div>

        {/* Planner Form */}
        <div className="section-gap">
          <PlannerForm onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="card section-gap" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', border: '3px solid #5c3de7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Generating your personalized itinerary…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="section-gap" style={{ padding: '1.5rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '1rem', color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Results */}
        {itinerary && (
          <div className="section-gap">
            <ItineraryResult itinerary={itinerary} />
          </div>
        )}
      </div>
    </div>
  );
}
