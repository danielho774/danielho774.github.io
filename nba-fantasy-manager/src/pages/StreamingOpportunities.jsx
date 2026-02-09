import { useState } from 'react';
import { useNBA } from '../hooks/useNBA';

export default function StreamingOpportunities() {
  const [mockOpportunities] = useState([
    {
      id: 1,
      playerName: 'Malik Monk',
      team: 'LAL',
      position: 'SG',
      reasonForValue: 'Increased playing time due to injuries',
      projectedPoints: 18.5,
      avgPoints: 12.3,
      availability: 'Available',
      confidenceScore: 85,
    },
    {
      id: 2,
      playerName: 'Cole Anthony',
      team: 'ORL',
      position: 'PG',
      reasonForValue: 'Starting role guaranteed for 2 weeks',
      projectedPoints: 22.1,
      avgPoints: 14.7,
      availability: 'Available',
      confidenceScore: 78,
    },
    {
      id: 3,
      playerName: 'Nassir Little',
      team: 'PHI',
      position: 'SF',
      reasonForValue: 'Improving usage with bench unit',
      projectedPoints: 16.3,
      avgPoints: 9.8,
      availability: 'Available',
      confidenceScore: 72,
    },
    {
      id: 4,
      playerName: 'Devin Vassell',
      team: 'SAS',
      position: 'SG',
      reasonForValue: 'Back to full health, favorable matchups',
      projectedPoints: 20.2,
      avgPoints: 16.1,
      availability: 'Available',
      confidenceScore: 88,
    },
    {
      id: 5,
      playerName: 'Ize Nnaji',
      team: 'DEN',
      position: 'PF',
      reasonForValue: 'Consistent minutes increase trend',
      projectedPoints: 14.5,
      avgPoints: 10.2,
      availability: 'Available',
      confidenceScore: 68,
    },
  ]);

  const [filteredOpportunities, setFilteredOpportunities] = useState(mockOpportunities);
  const [confidenceFilter, setConfidenceFilter] = useState(0);

  const handleConfidenceFilter = (confidence) => {
    setConfidenceFilter(confidence);
    setFilteredOpportunities(
      mockOpportunities.filter((opp) => opp.confidenceScore >= confidence)
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Streaming Opportunities</h1>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Confidence Score</h2>
        <div className="flex gap-4 flex-wrap">
          {[0, 60, 70, 80, 90].map((confidence) => (
            <button
              key={confidence}
              onClick={() => handleConfidenceFilter(confidence)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                confidenceFilter === confidence
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {confidence === 0 ? 'All' : `${confidence}%+`}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{opportunity.playerName}</h3>
                  <p className="text-gray-600">
                    {opportunity.team} - {opportunity.position}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-600 text-sm mb-2">Why Stream This Player?</p>
                  <p className="text-gray-900 font-semibold">{opportunity.reasonForValue}</p>
                </div>

                <div>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {opportunity.availability}
                  </span>
                </div>
              </div>

              {/* Right Side */}
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Projected PPG</p>
                    <p className="text-2xl font-bold text-blue-600">{opportunity.projectedPoints}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Avg PPG</p>
                    <p className="text-2xl font-bold text-purple-600">{opportunity.avgPoints}</p>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-2">Confidence Score</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="bg-gray-300 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            opportunity.confidenceScore >= 80
                              ? 'bg-green-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${opportunity.confidenceScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{opportunity.confidenceScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No opportunities match your filters</p>
        </div>
      )}
    </div>
  );
}
