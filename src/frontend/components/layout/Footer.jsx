import { FiShield, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-primary-800/20 bg-dark-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <FiShield className="text-white text-sm" />
            </div>
            <span className="font-semibold gradient-text">SafeTrip</span>
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <FiHeart className="text-coral" size={14} /> for safer travel &middot; B.Tech Minor Project &copy; 2026
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="hover:text-primary-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-primary-400 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
