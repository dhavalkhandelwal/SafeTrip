import { useState } from 'react';
import { FiUser, FiPhone, FiMail, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function ProfileForm() {
  const { profile, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    nationality: profile?.nationality || '',
    bloodGroup: profile?.bloodGroup || '',
    emergencyContacts: profile?.emergencyContacts || [{ name: '', phone: '', relation: '' }],
    safetyPreferences: profile?.safetyPreferences || {
      shareLocation: true,
      nightAlerts: true,
      crowdAlerts: true,
      womenOnlyTransport: true,
    },
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContactChange = (index, field, value) => {
    const contacts = [...form.emergencyContacts];
    contacts[index] = { ...contacts[index], [field]: value };
    setForm({ ...form, emergencyContacts: contacts });
  };

  const addContact = () => {
    setForm({ ...form, emergencyContacts: [...form.emergencyContacts, { name: '', phone: '', relation: '' }] });
  };

  const removeContact = (index) => {
    const contacts = form.emergencyContacts.filter((_, i) => i !== index);
    setForm({ ...form, emergencyContacts: contacts.length ? contacts : [{ name: '', phone: '', relation: '' }] });
  };

  const togglePreference = (key) => {
    setForm({
      ...form,
      safetyPreferences: { ...form.safetyPreferences, [key]: !form.safetyPreferences[key] },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <FiUser className="text-primary-400" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input name="email" value={form.email} disabled className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-primary-800/30 text-gray-500 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Nationality</label>
            <input name="nationality" value={form.nationality} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Blood Group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-primary-800/30 text-white focus:outline-none focus:border-primary-500 text-sm">
              <option value="">Select</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <FiPhone className="text-coral" /> Emergency Contacts
        </h3>
        {form.emergencyContacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 items-end">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <input value={contact.name} onChange={(e) => handleContactChange(index, 'name', e.target.value)} placeholder="Contact name" className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-primary-800/30 text-white text-sm focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone</label>
              <input value={contact.phone} onChange={(e) => handleContactChange(index, 'phone', e.target.value)} placeholder="+91-XXXXX" className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-primary-800/30 text-white text-sm focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Relation</label>
              <input value={contact.relation} onChange={(e) => handleContactChange(index, 'relation', e.target.value)} placeholder="e.g. Parent" className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-primary-800/30 text-white text-sm focus:outline-none focus:border-primary-500" />
            </div>
            <button type="button" onClick={() => removeContact(index)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all self-end">
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addContact} className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 mt-2">
          <FiPlus size={14} /> Add Contact
        </button>
      </div>

      {/* Safety Preferences */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">🛡️ Safety Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'shareLocation', label: 'Share Live Location with Contacts' },
            { key: 'nightAlerts', label: 'Receive Night Safety Alerts' },
            { key: 'crowdAlerts', label: 'Crowded Area Warnings' },
            { key: 'womenOnlyTransport', label: 'Prefer Women-Only Transport' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => togglePreference(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all
                ${form.safetyPreferences[key]
                  ? 'border-primary-500/40 bg-primary-600/10 text-white'
                  : 'border-primary-800/30 bg-dark-700/50 text-gray-500'
                }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all
                ${form.safetyPreferences[key] ? 'bg-primary-500 border-primary-500' : 'border-gray-600'}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold flex items-center justify-center gap-2 transition-all"
      >
        <FiSave size={18} />
        {saved ? '✓ Saved!' : 'Save Profile'}
      </button>
    </form>
  );
}
