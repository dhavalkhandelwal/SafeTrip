import { useState, useEffect } from 'react';
import { FiAlertTriangle, FiMapPin, FiClock, FiPhone, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getCurrentPosition } from '../../backend/services/locationService';

export default function SOSPage() {
  const { profile } = useAuth();
  const [history, setHistory] = useState([]);
  const [testSending, setTestSending] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('safetrip_sos') || '[]');
    setHistory(stored);
  }, []);

  const handleTestSOS = async () => {
    setTestSending(true);
    const pos = await getCurrentPosition();
    const log = {
      userId: profile?.uid || 'guest',
      location: pos,
      timestamp: new Date().toISOString(),
      test: true,
    };
    const updated = [log, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('safetrip_sos', JSON.stringify(updated));
    setTestSending(false);
  };

  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <h1><FiAlertTriangle style={{ color: '#f87171' }} /> Virtual SOS System</h1>
          <p>Emergency alerts and SOS history</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Emergency Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card-lg" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '1rem', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiShield style={{ color: '#f87171' }} /> Emergency Mode
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                When you press the SOS button, your current GPS location is captured and a simulated alert is sent to all your emergency contacts with your coordinates.
              </p>
              <button
                onClick={handleTestSOS}
                disabled={testSending}
                className="sos-pulse"
                style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: '#dc2626', color: 'white', fontWeight: '700', fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: testSending ? 0.5 : 1 }}
              >
                <FiAlertTriangle size={22} />
                {testSending ? 'Sending...' : 'Test SOS Alert'}
              </button>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.75rem', textAlign: 'center' }}>
                This sends a test alert. No real notifications are dispatched.
              </p>
            </div>

            {/* Emergency Contacts */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiPhone style={{ color: '#ff6b6b' }} /> Your Emergency Contacts
              </h3>
              {profile?.emergencyContacts?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {profile.emergencyContacts.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(42,41,64,0.5)', borderRadius: '0.75rem', padding: '1rem 1.25rem' }}>
                      <div>
                        <p style={{ fontSize: '0.875rem', color: 'white', fontWeight: '500' }}>{c.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.125rem' }}>{c.relation}</p>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{c.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  No emergency contacts set up. Add them in your <a href="/profile" style={{ color: '#8577f8', textDecoration: 'underline' }}>profile</a>.
                </p>
              )}
            </div>
          </div>

          {/* SOS History */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiClock style={{ color: '#8577f8' }} /> SOS History
            </h3>
            {history.length === 0 ? (
              <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', padding: '3rem 0' }}>No SOS events recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {history.map((event, i) => (
                  <div key={i} style={{ background: 'rgba(42,41,64,0.5)', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid rgba(239,68,68,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '500', padding: '0.25rem 0.625rem', borderRadius: '0.375rem', background: event.test ? 'rgba(250,204,21,0.12)' : 'rgba(239,68,68,0.12)', color: event.test ? '#facc15' : '#f87171' }}>
                        {event.test ? 'TEST' : 'LIVE'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      <FiMapPin size={14} style={{ color: '#8577f8' }} />
                      <span>
                        {event.location?.lat?.toFixed(4)}, {event.location?.lng?.toFixed(4)}
                        {event.location?.fallback && ' (fallback)'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
