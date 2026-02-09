import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/player-stats', label: 'Player Stats' },
    { path: '/streaming', label: 'Streaming' },
    { path: '/roster', label: 'Roster Upload' },
    { path: '/injuries', label: 'Injuries' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            🏀 NBA Fantasy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-900 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-blue-700">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-900 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
