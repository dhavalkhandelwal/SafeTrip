import { useState, useEffect } from 'react';
import { FiAlertTriangle, FiX, FiMapPin, FiPhone, FiMic, FiMicOff } from 'react-icons/fi';
import { getCurrentPosition } from '../../../backend/services/locationService';
import { useAuth } from '../../context/AuthContext';
import { useAcousticSentinel } from '../../hooks/useAcousticSentinel';

export default function SOSButton() {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { profile } = useAuth();

  // Acoustic Sentinel State
  const [acousticEnabled, setAcousticEnabled] = useState(() => {
    return localStorage.getItem('safetrip_acoustic') === 'true';
  });

  const toggleAcoustic = () => {
    const newState = !acousticEnabled;
    setAcousticEnabled(newState);
    localStorage.setItem('safetrip_acoustic', String(newState));
  };

  const handleSOS = async () => {
    setSending(true);
    setShowModal(true); // Show modal immediately for better UX
    try {
      const pos = await getCurrentPosition();
      setLocation(pos);
      // Simulate logging to database
      const sosLog = {
        userId: profile?.uid || 'guest',
        location: pos,
        timestamp: new Date().toISOString(),
        emergencyContacts: profile?.emergencyContacts || [],
      };
      console.log('🚨 SOS TRIGGERED:', sosLog);

      // Store in localStorage for SOS history
      const history = JSON.parse(localStorage.getItem('safetrip_sos') || '[]');
      history.unshift(sosLog);
      localStorage.setItem('safetrip_sos', JSON.stringify(history.slice(0, 20)));

      setSent(true);
    } catch (err) {
      console.error('SOS error:', err);
    }
    setSending(false);
  };

  // Connect the hook
  const { isListening, error } = useAcousticSentinel(acousticEnabled, handleSOS);

  const closeModal = () => {
    setShowModal(false);
    setSent(false);
    setLocation(null);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Acoustic Sentinel Toggle */}
        <button
          onClick={toggleAcoustic}
          className={`p-2 rounded-lg transition-all border ${
            acousticEnabled 
              ? 'bg-red-500/10 border-red-500/30 text-red-500' 
              : 'bg-dark-700/50 border-dark-600/50 text-gray-500 hover:text-gray-300 hover:bg-dark-600'
          }`}
          title={acousticEnabled ? 'Acoustic Sentinel ON (Listening for "Help" or "Bachao")' : 'Acoustic Sentinel OFF'}
        >
          {isListening ? <FiMic size={16} className="animate-pulse" /> : <FiMicOff size={16} />}
        </button>

        {/* SOS Button */}
        <button
          id="sos-button"
          onClick={handleSOS}
          className="relative px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all sos-pulse flex items-center gap-1.5"
        >
          <FiAlertTriangle size={16} />
          <span className="hidden sm:inline">SOS</span>
        </button>
      </div>

      {/* SOS Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="glass rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-red-400">
                <FiAlertTriangle size={24} />
                <h3 className="text-lg font-bold">Emergency Alert {sent ? 'Sent' : 'Sending...'}</h3>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

            {sent ? (
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-sm text-gray-300 mb-2">
                    📍 Your location has been logged and simulated alerts have been sent to your emergency contacts.
                  </p>
                  {location && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                      <FiMapPin size={14} />
                      <span>
                        {location.fallback ? 'Fallback Location: ' : ''}
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-surface-light rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <FiPhone size={14} /> Contacts Notified (Simulated)
                  </h4>
                  {profile?.emergencyContacts?.length > 0 ? (
                    <ul className="space-y-1">
                      {profile.emergencyContacts.map((c, i) => (
                        <li key={i} className="text-sm text-gray-400">• {c.name} — {c.phone}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No emergency contacts configured. Add them in your profile.</p>
                  )}
                </div>

                <p className="text-xs text-gray-500 text-center">
                  In a real scenario, SMS/email alerts would be sent automatically along with your GPS coordinates.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                 <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-sm text-gray-300">Acquiring GPS location and sending alerts...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
