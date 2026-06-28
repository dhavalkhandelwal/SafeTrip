import { FiStar, FiCheckCircle, FiPhone, FiMapPin } from 'react-icons/fi';

const categoryColors = {
  'women-only': 'from-pink-500/20 to-purple-500/20 border-pink-500/30',
  'women-transport': 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  'homestay': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  'hostel': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  'hotel': 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
};

const typeBadgeColors = {
  'Verified Host': 'bg-blue-500/15 text-blue-400',
  'Women-Only Transport': 'bg-pink-500/15 text-pink-400',
};

export default function ResourceCard({ resource }) {
  const gradientClass = categoryColors[resource.category] || 'from-primary-500/20 to-primary-600/20 border-primary-500/30';
  const badgeClass = typeBadgeColors[resource.type] || 'bg-primary-500/15 text-primary-400';

  return (
    <div className={`glass rounded-2xl p-5 border bg-gradient-to-br ${gradientClass} hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-white text-sm">{resource.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{resource.city}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${badgeClass}`}>
          {resource.type}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{resource.description}</p>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-3">
        <FiStar className="text-yellow-400" size={14} />
        <span className="text-sm font-semibold text-white">{resource.rating}</span>
        <span className="text-xs text-gray-500">/5</span>
        {resource.verified && (
          <span className="ml-auto flex items-center gap-1 text-xs text-green-400">
            <FiCheckCircle size={12} /> Verified
          </span>
        )}
      </div>

      {/* Amenities */}
      {resource.amenities && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {resource.amenities.map((a) => (
            <span key={a} className="px-2 py-0.5 rounded-md bg-dark-700/60 text-xs text-gray-400">
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Contact */}
      <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-white/5">
        {resource.phone && (
          <span className="flex items-center gap-1">
            <FiPhone size={12} /> {resource.phone}
          </span>
        )}
        {resource.address && (
          <span className="flex items-center gap-1">
            <FiMapPin size={12} /> {resource.address}
          </span>
        )}
      </div>
    </div>
  );
}
