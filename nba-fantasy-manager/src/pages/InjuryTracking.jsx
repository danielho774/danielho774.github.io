import { useNBA } from '../hooks/useNBA';
import { useState } from 'react';

export default function InjuryTracking() {
  const { injuries } = useNBA();
  const [filterStatus, setFilterStatus] = useState('all');

  const [extendedInjuries] = useState([
    {
      id: 1,
      playerName: 'Giannis Antetokounmpo',
      team: 'MIL',
      status: 'Out',
      injuryType: 'Knee Injury',
      expectedReturn: '2026-02-15',
      reportDate: '2026-02-01',
      severity: 'High',
      newsUpdates: [
        { date: '2026-02-08', update: 'Update: Targeting return by mid-February. Will be re-evaluated.' },
        { date: '2026-02-05', update: 'Giannis underwent MRI on knee. Results show improvement.' },
        { date: '2026-02-01', update: 'Giannis ruled out due to left knee soreness.' },
      ],
    },
    {
      id: 2,
      playerName: 'Stephen Curry',
      team: 'GSW',
      status: 'Day to Day',
      injuryType: 'Ankle Injury',
      expectedReturn: 'Unknown',
      reportDate: '2026-02-06',
      severity: 'Low',
      newsUpdates: [
        { date: '2026-02-08', update: 'Curry listed as questionable for tonight\'s game.' },
        { date: '2026-02-06', update: 'Curry rolled ankle in practice. Being evaluated.' },
      ],
    },
    {
      id: 3,
      playerName: 'Jaylen Brown',
      team: 'BOS',
      status: 'Probable',
      injuryType: 'Hamstring Strain',
      expectedReturn: '2026-02-10',
      reportDate: '2026-02-07',
      severity: 'Medium',
      newsUpdates: [
        { date: '2026-02-08', update: 'Brown expected to play tonight with no restrictions.' },
        { date: '2026-02-07', update: 'Brown listed as probable with hamstring strain.' },
      ],
    },
    {
      id: 4,
      playerName: 'Tyrese Maxey',
      team: 'PHI',
      status: 'Out',
      injuryType: 'Hand Fracture',
      expectedReturn: '2026-03-01',
      reportDate: '2026-02-04',
      severity: 'High',
      newsUpdates: [
        { date: '2026-02-06', update: 'MRI confirms fracture. Out for 3-4 weeks.' },
        { date: '2026-02-04', update: 'Maxey suffers hand fracture vs. Nets.' },
      ],
    },
  ]);

  const filteredInjuries = extendedInjuries.filter((injury) => {
    if (filterStatus === 'all') return true;
    return injury.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'out':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'day to day':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'probable':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-50';
      case 'medium':
        return 'bg-yellow-50';
      case 'low':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Injury Tracking & News</h1>

      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Status</h2>
        <div className="flex gap-4 flex-wrap">
          {['all', 'out', 'day to day', 'probable'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors capitalize ${
                filterStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Injury Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredInjuries.map((injury) => (
          <div
            key={injury.id}
            className={`rounded-lg shadow-lg overflow-hidden border-l-4 ${
              injury.status === 'Out'
                ? 'border-red-500'
                : injury.status === 'Day to Day'
                  ? 'border-yellow-500'
                  : 'border-green-500'
            }`}
          >
            <div className="bg-white p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Player Info */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{injury.playerName}</h3>
                    <p className="text-gray-600">{injury.team}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 text-sm">Injury Type</p>
                      <p className="text-lg font-semibold text-gray-900">{injury.injuryType}</p>
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">Status</p>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold capitalize border ${getStatusColor(
                            injury.status
                          )}`}
                        >
                          {injury.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Severity</p>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold capitalize border ${
                            injury.severity === 'High'
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : injury.severity === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                : 'bg-green-100 text-green-800 border-green-300'
                          }`}
                        >
                          {injury.severity}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm">Expected Return</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {injury.expectedReturn === 'Unknown'
                          ? 'TBD'
                          : new Date(injury.expectedReturn).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - News Updates */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Latest Updates</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {injury.newsUpdates.map((update, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 border-blue-500 ${getSeverityColor(
                          injury.severity
                        )}`}
                      >
                        <p className="text-gray-600 text-xs mb-2">
                          {new Date(update.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-gray-900 text-sm font-semibold">{update.update}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInjuries.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No injuries with this status</p>
        </div>
      )}

      {/* Injury Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-red-50 p-6 rounded-lg shadow-lg border border-red-200">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Out</h4>
          <p className="text-3xl font-bold text-red-600">
            {extendedInjuries.filter((i) => i.status === 'Out').length}
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-lg border border-yellow-200">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Day to Day</h4>
          <p className="text-3xl font-bold text-yellow-600">
            {extendedInjuries.filter((i) => i.status === 'Day to Day').length}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Probable</h4>
          <p className="text-3xl font-bold text-green-600">
            {extendedInjuries.filter((i) => i.status === 'Probable').length}
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Total Injuries</h4>
          <p className="text-3xl font-bold text-blue-600">{extendedInjuries.length}</p>
        </div>
      </div>
    </div>
  );
}
