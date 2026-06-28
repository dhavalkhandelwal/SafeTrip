import { useState } from 'react';
import { FiCalendar, FiMapPin, FiDollarSign, FiHeart, FiSend, FiLoader } from 'react-icons/fi';

export default function PlannerForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    interests: '',
    travelStyle: 'solo-female',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
        <FiCalendar className="text-primary-400" /> Plan Your Trip
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Destination</label>
          <div className="relative">
            <FiMapPin className="absolute left-3.5 top-3 text-gray-500" size={16} />
            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="e.g. Jaipur, Rajasthan"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-700 border border-primary-800/30 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Budget</label>
          <div className="relative">
            <FiDollarSign className="absolute left-3.5 top-3 text-gray-500" size={16} />
            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="e.g. ₹20,000 or $500"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-700 border border-primary-800/30 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Interests</label>
        <div className="relative">
          <FiHeart className="absolute left-3.5 top-3 text-gray-500" size={16} />
          <input
            name="interests"
            value={form.interests}
            onChange={handleChange}
            placeholder="e.g. History, Food, Photography, Art"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-700 border border-primary-800/30 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Travel Style</label>
        <select
          name="travelStyle"
          value={form.travelStyle}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 transition-all text-sm"
        >
          <option value="solo-female">Solo Female Traveler</option>
          <option value="solo">Solo Traveler</option>
          <option value="budget">Budget Backpacker</option>
          <option value="luxury">Luxury Traveler</option>
          <option value="adventure">Adventure Seeker</option>
          <option value="cultural">Cultural Explorer</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin" size={18} />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <FiSend size={18} />
            <span>Generate Itinerary</span>
          </>
        )}
      </button>
    </form>
  );
}
