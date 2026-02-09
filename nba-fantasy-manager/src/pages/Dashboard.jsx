import { useNBA } from '../hooks/useNBA';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { notifications, removeNotification } = useNBA();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-100 text-sm font-semibold">Active Players</h3>
          <p className="text-3xl font-bold mt-2">15</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-100 text-sm font-semibold">Roster Spots</h3>
          <p className="text-3xl font-bold mt-2">15/15</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-100 text-sm font-semibold">Injuries</h3>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-100 text-sm font-semibold">League Rank</h3>
          <p className="text-3xl font-bold mt-2">#3</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Updates & Notifications</h2>
        
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications at this time.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className={`flex justify-between items-start p-4 border-l-4 rounded ${
                notif.type === 'injury' ? 'border-red-500 bg-red-50' :
                notif.type === 'success' ? 'border-green-500 bg-green-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div>
                  <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                  <p className="text-gray-700 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notif.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/leaderboard" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
          <p className="text-blue-100">View player rankings by timeframe</p>
        </Link>
        <Link to="/streaming" className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold mb-2">Streaming Opportunities</h3>
          <p className="text-green-100">Find available high-value players</p>
        </Link>
        <Link to="/injuries" className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold mb-2">Injury Tracking</h3>
          <p className="text-red-100">Stay updated on player injuries</p>
        </Link>
      </div>
    </div>
  );
}
