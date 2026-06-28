import { Link } from 'react-router-dom';
import { FiMap, FiCalendar, FiShield, FiBookOpen, FiArrowRight, FiUsers, FiGlobe, FiAlertTriangle } from 'react-icons/fi';

const features = [
  {
    icon: FiMap,
    title: 'Interactive Safety Map',
    description: 'Real-time color-coded safety zones with crowdsourced alerts from fellow travelers.',
    link: '/map',
    iconColor: '#4ade80',
  },
  {
    icon: FiCalendar,
    title: 'AI Itinerary Planner',
    description: 'Generate personalized day-by-day plans with safety-aware recommendations powered by AI.',
    link: '/itinerary',
    iconColor: '#8577f8',
  },
  {
    icon: FiAlertTriangle,
    title: 'Virtual SOS System',
    description: 'One-tap emergency alerts with GPS tracking sent instantly to your emergency contacts.',
    link: '/sos',
    iconColor: '#f87171',
  },
  {
    icon: FiBookOpen,
    title: 'Verified Resources',
    description: 'Directory of verified hosts and women-only transport options with safety ratings.',
    link: '/resources',
    iconColor: '#60a5fa',
  },
];

const stats = [
  { value: '12K+', label: 'Active Travelers', icon: FiUsers },
  { value: '50+', label: 'Cities Covered', icon: FiGlobe },
  { value: '97%', label: 'Safety Rating', icon: FiShield },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '10rem', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', color: '#a199fb', marginBottom: '2rem' }}>
            <FiShield size={14} />
            AI-Powered Travel Safety Platform
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', color: 'white', lineHeight: 1.15, marginBottom: '2rem' }}>
            Travel Bold,{' '}
            <span className="gradient-text">Stay Safe</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: '#9ca3af', maxWidth: '32rem', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            SafeTrip empowers solo travelers — especially women — with real-time safety maps,
            AI-powered itineraries, and instant emergency tools.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/signup" style={{ padding: '0.875rem 2rem', borderRadius: '0.75rem', background: 'var(--color-primary-500)', color: 'white', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Get Started <FiArrowRight />
            </Link>
            <Link to="/map" className="glass" style={{ padding: '0.875rem 2rem', borderRadius: '0.75rem', color: 'white', fontWeight: '500', textDecoration: 'none' }}>
              Explore Map
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="glass" style={{ textAlign: 'center', borderRadius: '1rem', padding: '2rem 1rem' }}>
              <Icon style={{ color: '#8577f8', margin: '0 auto 0.75rem' }} size={24} />
              <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', fontWeight: '700', color: 'white' }}>{value}</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.375rem' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: '700', color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
            Everything You Need for <span className="gradient-text">Safe Travel</span>
          </h2>
          <p style={{ color: '#6b7280', textAlign: 'center', maxWidth: '28rem', margin: '0 auto 3.5rem' }}>
            A comprehensive ecosystem designed to make solo travel safer, smarter, and more enjoyable.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {features.map((f) => (
              <Link
                key={f.title}
                to={f.link}
                className="glass"
                style={{ borderRadius: '1rem', padding: '2rem', textDecoration: 'none', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: 'rgba(42,41,64,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <f.icon style={{ color: f.iconColor }} size={24} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.6 }}>{f.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="glass" style={{ maxWidth: '38rem', margin: '0 auto', borderRadius: '1rem', padding: 'clamp(2rem, 4vw, 3.5rem)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: '700', color: 'white', marginBottom: '1.25rem' }}>
            Ready to Travel <span className="gradient-text">Fearlessly</span>?
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            Join thousands of solo travelers who trust SafeTrip for their safety.
          </p>
          <Link to="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '0.75rem', background: 'var(--color-primary-500)', color: 'white', fontWeight: '600', textDecoration: 'none' }}>
            Create Your SafeTrip ID <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
