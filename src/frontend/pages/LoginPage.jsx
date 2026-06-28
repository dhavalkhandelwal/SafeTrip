import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiShield, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem',
    borderRadius: '0.75rem', background: '#2a2940', border: '1px solid rgba(64,40,165,0.3)',
    color: 'white', fontSize: '0.875rem', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
      <div className="card animate-fade-in-up" style={{ padding: '2.5rem', width: '100%', maxWidth: '28rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'var(--color-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <FiShield style={{ color: 'white' }} size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Welcome Back</h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.375rem' }}>Sign in to your SafeTrip account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.875rem', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }} size={16} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }} size={16} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={inputStyle} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--color-primary-500)', color: 'white', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Signing in...' : <>Sign In <FiArrowRight /></>}
          </button>
        </form>

        <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#8577f8', fontWeight: '500', textDecoration: 'none' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
