import { FiShield, FiPhone, FiUser, FiDroplet, FiFlag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function DigitalID() {
  const { profile } = useAuth();

  if (!profile) return null;

  const initial = profile.name ? profile.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="digital-id-card">
      {/* Gradient banner */}
      <div className="digital-id-header">
        <div className="digital-id-avatar">{initial}</div>
      </div>

      <div className="digital-id-body">
        {/* Name row + Verified badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div style={{ minWidth: 0 }}>
            <p className="digital-id-name">{profile.name || 'Traveler'}</p>
            <p className="digital-id-label">Digital Tourist ID</p>
          </div>
          <div className="digital-id-badge">
            <FiShield size={10} /> Verified
          </div>
        </div>

        <div className="digital-id-divider" />

        {/* Info grid */}
        <div className="digital-id-grid">
          <div className="digital-id-field">
            <FiUser size={13} style={{ color: '#818cf8', flexShrink: 0 }} />
            <span title={profile.digitalId}>{profile.digitalId || 'N/A'}</span>
          </div>
          <div className="digital-id-field">
            <FiDroplet size={13} style={{ color: '#f87171', flexShrink: 0 }} />
            <span>{profile.bloodGroup || 'N/A'}</span>
          </div>
          <div className="digital-id-field">
            <FiFlag size={13} style={{ color: '#60a5fa', flexShrink: 0 }} />
            <span>{profile.nationality || 'N/A'}</span>
          </div>
          <div className="digital-id-field">
            <FiPhone size={13} style={{ color: '#fb923c', flexShrink: 0 }} />
            <span title={profile.phone}>{profile.phone || 'N/A'}</span>
          </div>
        </div>

        {/* Emergency Contact */}
        {profile.emergencyContacts?.[0]?.name && (
          <div className="digital-id-emergency">
            <p className="digital-id-emergency-label">Emergency Contact</p>
            <p className="digital-id-emergency-value">
              {profile.emergencyContacts[0].name}
              {profile.emergencyContacts[0].relation && ` (${profile.emergencyContacts[0].relation})`}
              {' — '}
              {profile.emergencyContacts[0].phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
