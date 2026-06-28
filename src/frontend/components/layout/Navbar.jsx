import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMap, FiCalendar, FiUser, FiShield, FiGrid, FiLogOut, FiHome, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import SOSButton from '../sos/SOSButton';

const navLinks = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/map', label: 'Safety Map', icon: FiMap },
  { to: '/itinerary', label: 'Itinerary', icon: FiCalendar },
  { to: '/resources', label: 'Resources', icon: FiBookOpen },
  { to: '/dashboard', label: 'Analytics', icon: FiGrid },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiShield style={{ color: 'white', fontSize: '18px' }} />
          </div>
          <span className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: '700' }}>SafeTrip</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 0.875rem', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: '500',
                textDecoration: 'none', transition: 'all 0.2s',
                color: location.pathname === to ? '#a199fb' : '#9ca3af',
                background: location.pathname === to ? 'rgba(92, 61, 231, 0.15)' : 'transparent',
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <SOSButton />
          {user ? (
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'none' }}>
                <FiUser size={16} /> Profile
              </Link>
              <button onClick={logout} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="desktop-nav" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#5c3de7', color: 'white', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}>
              Sign In
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-only"
            style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'none' }}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass animate-fade-in-up" style={{ borderTop: '1px solid rgba(108, 85, 242, 0.12)', padding: '1.25rem 1.5rem' }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none',
                color: location.pathname === to ? '#a199fb' : '#9ca3af',
                background: location.pathname === to ? 'rgba(92, 61, 231, 0.15)' : 'transparent',
              }}
            >
              <Icon size={18} /> {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
