import { FiClock, FiMapPin, FiDollarSign, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function ItineraryResult({ itinerary }) {
  if (!itinerary) return null;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold gradient-text mb-2">{itinerary.destination}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <span>{itinerary.totalDays} Days</span>
          <span>Budget: {itinerary.estimatedBudget}</span>
        </div>

        {/* Safety Tips */}
        {itinerary.safetyTips?.length > 0 && (
          <div className="mt-4 bg-primary-600/10 border border-primary-600/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-primary-300 flex items-center gap-2 mb-2">
              <FiShield size={14} /> Safety Tips
            </h4>
            <ul className="space-y-1">
              {itinerary.safetyTips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <FiCheckCircle className="text-green-400 mt-0.5 shrink-0" size={12} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Days */}
      {itinerary.days?.map((day) => (
        <div key={day.day} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
              D{day.day}
            </div>
            <div>
              <h4 className="font-semibold text-white">{day.theme}</h4>
              <p className="text-xs text-gray-500">{day.date}</p>
            </div>
          </div>

          <div className="space-y-3">
            {day.activities?.map((act, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-primary-800/40 pb-3 last:pb-0">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                <div className="bg-dark-700/50 rounded-xl p-4 hover:bg-dark-600/50 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-primary-400 flex items-center gap-1">
                      <FiClock size={12} /> {act.time}
                    </span>
                    {act.estimatedCost && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiDollarSign size={12} /> {act.estimatedCost}
                      </span>
                    )}
                  </div>
                  <h5 className="font-medium text-white text-sm">{act.title}</h5>
                  <p className="text-xs text-gray-400 mt-1">{act.description}</p>
                  {act.location && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <FiMapPin size={11} /> {act.location}
                    </p>
                  )}
                  {act.safetyNote && (
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-yellow-400/80 bg-yellow-500/5 rounded-lg px-2 py-1.5">
                      <FiAlertTriangle className="mt-0.5 shrink-0" size={11} />
                      {act.safetyNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
