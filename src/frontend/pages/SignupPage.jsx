import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone, FiShield, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    nationality: '', bloodGroup: '',
    emergencyContacts: [{ name: '', phone: '', relation: '' }],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleContactChange = (field, value) => {
    const contacts = [...form.emergencyContacts];
    contacts[0] = { ...contacts[0], [field]: value };
    setForm({ ...form, emergencyContacts: contacts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { password, ...profileData } = form;
      await signup(form.email, password, profileData);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Signup failed.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: '0.75rem', background: '#2a2940', border: '1px solid rgba(64,40,165,0.3)',
    color: 'white', fontSize: '0.875rem', outline: 'none',
  };
  const iconInputStyle = { ...inputStyle, paddingLeft: '2.5rem' };
  const labelStyle = { display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 2rem' }}>
      <div className="card animate-fade-in-up" style={{ padding: '2.5rem', width: '100%', maxWidth: '32rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'var(--color-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <FiShield style={{ color: 'white' }} size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Create Your SafeTrip ID</h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.375rem' }}>Register to get your Digital Tourist ID</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.875rem', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <FiUser style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }} size={16} />
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={iconInputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <div style={{ position: 'relative' }}>
                <FiPhone style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }} size={16} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91-XXXXX" style={iconInputStyle} />
              </div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }} size={16} />
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={iconInputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }} size={16} />
              <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Min 6 characters" style={iconInputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Nationality</label>
              <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. Indian" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Blood Group</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} style={inputStyle}>
                <option value="">Select</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div style={{ borderTop: '1px solid rgba(64,40,165,0.15)', paddingTop: '1.25rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#e4e2f0', marginBottom: '0.75rem' }}>🚨 Primary Emergency Contact</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <input value={form.emergencyContacts[0].name} onChange={(e) => handleContactChange('name', e.target.value)} placeholder="Name" style={inputStyle} />
              <input value={form.emergencyContacts[0].phone} onChange={(e) => handleContactChange('phone', e.target.value)} placeholder="Phone" style={inputStyle} />
              <input value={form.emergencyContacts[0].relation} onChange={(e) => handleContactChange('relation', e.target.value)} placeholder="Relation" style={inputStyle} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', background: 'var(--color-primary-500)', color: 'white', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Creating...' : <>Create SafeTrip ID <FiArrowRight /></>}
          </button>
        </form>

        <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#8577f8', fontWeight: '500', textDecoration: 'none' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
