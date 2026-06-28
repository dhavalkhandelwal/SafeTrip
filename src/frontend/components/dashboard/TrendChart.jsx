import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 text-xs border border-primary-800/30">
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }}></span>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export function SafetyTrendChart({ data }) {
  return (
    <div className="glass rounded-2xl p-5 border border-primary-800/20">
      <h4 className="text-sm font-semibold text-white mb-4">Safety Score Trend</h4>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="safetyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6c55f2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6c55f2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#2a2940" strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
          <YAxis domain={[6, 8.5]} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="score" stroke="#6c55f2" fill="url(#safetyGrad)" strokeWidth={2} name="Safety Score" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TravelGrowthChart({ data }) {
  return (
    <div className="glass rounded-2xl p-5 border border-primary-800/20">
      <h4 className="text-sm font-semibold text-white mb-4">Travel Growth</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid stroke="#2a2940" strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
          <Bar dataKey="domestic" fill="#6c55f2" radius={[4, 4, 0, 0]} name="Domestic" />
          <Bar dataKey="international" fill="#ff6b6b" radius={[4, 4, 0, 0]} name="International" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
