import { useState } from 'react';
import { FiBookOpen, FiSearch } from 'react-icons/fi';
import verifiedResources from '../../backend/data/verifiedResources';
import ResourceCard from '../components/resources/ResourceCard';

const categories = [
  { value: '', label: 'All' },
  { value: 'Verified Host', label: 'Verified Hosts' },
  { value: 'Women-Only Transport', label: 'Women-Only Transport' },
];

export default function ResourcesPage() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = verifiedResources.filter((r) => {
    const matchType = filter ? r.type === filter : true;
    const matchSearch = search
      ? r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.city.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchType && matchSearch;
  });

  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <h1><FiBookOpen style={{ color: '#8577f8' }} /> Verified Resources Hub</h1>
          <p>Trusted accommodations and women-only transport options</p>
        </div>

        {/* Filters */}
        <div className="card section-gap" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 240px', position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '0.875rem', top: '0.75rem', color: '#6b7280' }} size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or city..."
                style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.625rem', paddingBottom: '0.625rem', borderRadius: '0.75rem', background: '#2a2940', border: '1px solid rgba(64,40,165,0.3)', color: 'white', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: '500',
                    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                    background: filter === cat.value ? 'rgba(92,61,231,0.15)' : 'transparent',
                    color: filter === cat.value ? '#a199fb' : '#9ca3af',
                    border: filter === cat.value ? '1px solid rgba(108,85,242,0.3)' : '1px solid rgba(64,40,165,0.3)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
            No resources match your search.
          </div>
        )}
      </div>
    </div>
  );
}
