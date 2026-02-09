import { useNBA } from '../hooks/useNBA';
import { useState } from 'react';

export default function Leaderboard() {
  const { selectedTimeframe, setSelectedTimeframe } = useNBA();
  const [mockPlayers] = useState([
    { id: 1, name: 'LeBron James', team: 'LAL', position: 'PF', points: 2485, assists: 521, rebounds: 892, fantasyScore: 8742 },
    { id: 2, name: 'Luka Doncic', team: 'DAL', position: 'PG', points: 2341, assists: 618, rebounds: 756, fantasyScore: 8456 },
    { id: 3, name: 'Giannis Antetokounmpo', team: 'MIL', position: 'C', points: 2156, assists: 432, rebounds: 1045, fantasyScore: 8123 },
    { id: 4, name: 'Kevin Durant', team: 'PHX', position: 'SF', points: 1987, assists: 341, rebounds: 623, fantasyScore: 7856 },
    { id: 5, name: 'Stephen Curry', team: 'GSW', position: 'PG', points: 1834, assists: 512, rebounds: 412, fantasyScore: 7234 },
    { id: 6, name: 'Jayson Tatum', team: 'BOS', position: 'SF', points: 2012, assists: 321, rebounds: 734, fantasyScore: 7812 },
    { id: 7, name: 'Shai Gilgeous-Alexander', team: 'OKC', position: 'PG', points: 1856, assists: 478, rebounds: 512, fantasyScore: 7456 },
    { id: 8, name: 'Donovan Mitchell', team: 'CLE', position: 'SG', points: 1923, assists: 389, rebounds: 412, fantasyScore: 7123 },
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">NBA Player Leaderboard</h1>

      {/* Timeframe Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Timeframe</h2>
        <div className="flex gap-4 flex-wrap">
          {['week', 'twoWeeks', 'month', 'season'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {timeframe === 'week' && '1 Week'}
              {timeframe === 'twoWeeks' && '2 Weeks'}
              {timeframe === 'month' && '1 Month'}
              {timeframe === 'season' && 'Season'}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Player</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Team</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Points</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Assists</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Rebounds</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Fantasy Score</th>
            </tr>
          </thead>
          <tbody>
            {mockPlayers.map((player, index) => (
              <tr key={player.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-gray-900">{index + 1}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{player.name}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">{player.team}</td>
                <td className="px-6 py-4 text-gray-700">{player.position}</td>
                <td className="px-6 py-4 text-center text-gray-900 font-semibold">{player.points}</td>
                <td className="px-6 py-4 text-center text-gray-900 font-semibold">{player.assists}</td>
                <td className="px-6 py-4 text-center text-gray-900 font-semibold">{player.rebounds}</td>
                <td className="px-6 py-4 text-center text-blue-600 font-bold">{player.fantasyScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
