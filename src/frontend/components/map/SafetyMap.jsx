import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiAlertCircle, FiPlus, FiStar, FiMessageSquare } from 'react-icons/fi';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const alertIcon = (color) => L.divIcon({
  html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></div>`,
  iconSize: [28, 28], iconAnchor: [14, 14],
});

const ALERT_TYPES = [
  { label: 'Poor Light', color: '#facc15', icon: '💡' }, { label: 'Unsafe Crowd', color: '#ef4444', icon: '👥' },
  { label: 'Harassment', color: '#ef4444', icon: '🚨' }, { label: 'Road Issue', color: '#f97316', icon: '🚧' },
  { label: 'Suspicious', color: '#ef4444', icon: '👁️' }, { label: 'Safe Spot', color: '#22c55e', icon: '✅' },
];

const getScoreData = (s) => s >= 7 ? ['#22c55e', 'Safe'] : s >= 4 ? ['#facc15', 'Moderate'] : ['#ef4444', 'Unsafe'];

function ClickHandler({ onAdd }) {
  useMapEvents({ click: (e) => onAdd(e.latlng) });
  return null;
}

export default function SafetyMap({ city, zones, onAddReview }) {
  const [alerts, setAlerts] = useState(() => JSON.parse(localStorage.getItem('safetrip_alerts') || '[]'));
  const [ui, setUi] = useState({ adding: false, latlng: null, typeIdx: null, rating: 10, text: '' });

  const fZones = city ? zones.filter(z => z.city === city) : zones;
  const center = fZones.length ? [fZones[0].lat, fZones[0].lng] : [28.6139, 77.2090];

  useEffect(() => localStorage.setItem('safetrip_alerts', JSON.stringify(alerts)), [alerts]);

  const updateUi = (updates) => setUi(prev => ({ ...prev, ...updates }));

  const confirmAlert = () => {
    if (ui.latlng && ui.typeIdx !== null) {
      setAlerts(p => [...p, { id: Date.now(), lat: ui.latlng.lat, lng: ui.latlng.lng, type: ALERT_TYPES[ui.typeIdx], timestamp: new Date().toISOString(), reporter: 'Community' }]);
      updateUi({ latlng: null, typeIdx: null, adding: false });
    }
  };

  const submitReview = (e, id) => {
    e.preventDefault();
    if (ui.text.trim()) {
      onAddReview(id, ui.rating, ui.text);
      updateUi({ text: '', rating: 10 });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-[1000]">
        <button onClick={() => updateUi({ adding: !ui.adding, latlng: null })} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-lg transition-all ${ui.adding ? 'bg-yellow-500 text-black' : 'glass text-white hover:bg-white/10'}`}>
          <FiPlus size={16} />{ui.adding ? 'Cancel' : 'Pin Report'}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-[1000] glass rounded-xl p-3 text-xs space-y-1.5 pointer-events-none">
        <p className="font-semibold text-gray-300">Area Safety</p>
        {[ {c:'bg-green-500',l:'Safe (7-10)'}, {c:'bg-yellow-400',l:'Moderate (4-6)'}, {c:'bg-red-500',l:'Unsafe (1-3)'} ].map(i => (
          <div key={i.l} className="flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${i.c}`}></span>{i.l}</div>
        ))}
      </div>

      {ui.latlng && (
        <div className="absolute top-4 left-4 z-[1000] glass rounded-xl p-4 max-w-xs animate-fade-in-up">
          <p className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2"><FiAlertCircle /> Select Report</p>
          <div className="grid grid-cols-2 gap-2">
            {ALERT_TYPES.map((t, i) => (
              <button key={i} onClick={() => updateUi({ typeIdx: i })} className={`text-xs px-2 py-2 rounded-lg border text-left ${ui.typeIdx === i ? 'border-primary-400 bg-primary-600/20 text-white' : 'border-primary-800/30 text-gray-400'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <button onClick={confirmAlert} disabled={ui.typeIdx === null} className="mt-3 w-full py-2 rounded-lg bg-primary-600 hover:bg-primary-500 disabled:opacity-40 text-white text-sm font-medium">Confirm Pin</button>
        </div>
      )}

      <MapContainer center={center} zoom={city ? 13 : 11} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
        <ClickHandler onAdd={(latlng) => ui.adding && updateUi({ latlng })} />

        {fZones.map(z => {
          const [color, label] = getScoreData(z.safetyScore);
          return (
            <Circle key={z.id} center={[z.lat, z.lng]} radius={z.radius} pathOptions={{ fillColor: color, fillOpacity: 0.25, color, weight: 2 }}>
              <Popup minWidth={280} maxWidth={320}>
                <div className="text-white p-1">
                  <div className="border-b border-gray-700 pb-2 mb-2">
                    <h4 className="font-bold text-base m-0 leading-tight">{z.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 mb-2">{z.city}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold text-black" style={{ background: color }}>{label}</span>
                      <span className="text-sm font-bold">Score: {z.safetyScore}/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 m-0 mb-3">{z.description}</p>
                  
                  <div className="border-t border-gray-700 pt-2 mb-3">
                    <h5 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1 uppercase"><FiMessageSquare size={12}/> Reviews ({z.reviews?.length||0})</h5>
                    <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
                      {z.reviews?.length ? z.reviews.map(r => (
                        <div key={r.id} className="bg-dark-700/80 rounded p-2 text-xs">
                          <div className="flex justify-between mb-1"><span className="font-medium">{r.author}</span><span className="flex items-center gap-0.5 text-yellow-400">{r.rating}<FiStar size={10} fill="currentColor"/></span></div>
                          <p className="text-gray-400 m-0 break-words">{r.comment}</p>
                        </div>
                      )) : <p className="text-xs text-gray-500 italic m-0">No reviews yet.</p>}
                    </div>
                  </div>

                  <form onSubmit={e => submitReview(e, z.id)} className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Rating:</span>
                      <input type="range" min="1" max="10" value={ui.rating} onChange={e => updateUi({ rating: e.target.value })} className="w-1/2 accent-primary-500" />
                      <span className="text-sm font-bold w-6 text-right">{ui.rating}</span>
                    </div>
                    <textarea placeholder="Share experience..." value={ui.text} onChange={e => updateUi({ text: e.target.value })} className="w-full bg-dark-700 border border-gray-600 rounded p-2 text-xs text-white mb-2" rows="2" required />
                    <button type="submit" className="w-full py-1.5 bg-primary-600 hover:bg-primary-500 rounded text-xs font-medium">Submit Review</button>
                  </form>
                </div>
              </Popup>
            </Circle>
          );
        })}

        {alerts.map(a => (
          <Marker key={a.id} position={[a.lat, a.lng]} icon={alertIcon(a.type.color)}>
            <Popup><div className="p-1"><h4 className="font-bold text-sm m-0">{a.type.icon} {a.type.label}</h4><p className="text-xs text-gray-500 mt-1 mb-0">{new Date(a.timestamp).toLocaleString()}</p><p className="text-xs text-gray-500 m-0">By: {a.reporter}</p></div></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
