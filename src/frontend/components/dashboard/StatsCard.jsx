import { FiUsers, FiAlertTriangle, FiShield, FiAlertCircle } from 'react-icons/fi';

const iconMap = {
  users: FiUsers,
  alert: FiAlertTriangle,
  shield: FiShield,
  sos: FiAlertCircle,
};

const gradients = [
  'from-primary-600/20 to-primary-700/10 border-primary-600/30',
  'from-yellow-500/20 to-orange-500/10 border-yellow-500/30',
  'from-green-500/20 to-emerald-500/10 border-green-500/30',
  'from-red-500/20 to-rose-500/10 border-red-500/30',
];

export default function StatsCard({ data, index = 0 }) {
  const Icon = iconMap[data.icon] || FiShield;
  const gradient = gradients[index % gradients.length];

  return (
    <div className={`glass rounded-2xl p-5 border bg-gradient-to-br ${gradient} hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-dark-700/50 flex items-center justify-center">
          <Icon className="text-primary-400" size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{data.value}</p>
      <p className="text-xs text-gray-500 mt-1">{data.title}</p>
    </div>
  );
}
