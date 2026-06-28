import { FiGrid, FiTrendingUp } from 'react-icons/fi';
import StatsCard from '../components/dashboard/StatsCard';
import { SafetyTrendChart } from '../components/dashboard/TrendChart';
import { kpiData, safetyTrends, topDestinations } from '../../backend/data/mockAnalytics';

export default function DashboardPage() {
  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <h1><FiGrid style={{ color: '#8577f8' }} /> Analytics Dashboard</h1>
          <p>Key trends and insights for the SafeTrip ecosystem</p>
        </div>

        {/* KPI Cards */}
        <div className="grid-4 section-gap">
          {kpiData.map((kpi, i) => (
            <StatsCard key={kpi.title} data={kpi} index={i} />
          ))}
        </div>

        {/* Safety Trend Chart — full width */}
        <div className="section-gap">
          <SafetyTrendChart data={safetyTrends} />
        </div>

        {/* Top Destinations Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiTrendingUp size={16} style={{ color: '#8577f8' }} /> Top Destinations
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(64,40,165,0.2)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Destination</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Travelers</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Safety Score</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {topDestinations.map((dest) => (
                  <tr key={dest.name} style={{ borderBottom: '1px solid rgba(64,40,165,0.08)' }}>
                    <td style={{ padding: '1rem', color: 'white', fontWeight: '500' }}>{dest.name}</td>
                    <td style={{ padding: '1rem', color: '#9ca3af' }}>{dest.travelers.toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '4rem', height: '0.5rem', background: '#2a2940', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '9999px', width: `${dest.safetyScore * 10}%`, background: dest.safetyScore >= 7 ? '#22c55e' : dest.safetyScore >= 5 ? '#facc15' : '#ef4444' }} />
                        </div>
                        <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{dest.safetyScore}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.625rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '500',
                        background: dest.safetyScore >= 7 ? 'rgba(34,197,94,0.12)' : dest.safetyScore >= 5 ? 'rgba(250,204,21,0.12)' : 'rgba(239,68,68,0.12)',
                        color: dest.safetyScore >= 7 ? '#4ade80' : dest.safetyScore >= 5 ? '#facc15' : '#f87171',
                      }}>
                        {dest.safetyScore >= 7 ? 'Safe' : dest.safetyScore >= 5 ? 'Caution' : 'Alert'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
