import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlayerStats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate();

  const [mockPlayers] = useState([
    {
      id: 1,
      name: 'LeBron James',
      team: 'LAL',
      position: 'PF',
      pointsPerGame: 24.5,
      assistsPerGame: 8.1,
      reboundsPerGame: 8.7,
      fieldGoalPercentage: 52.3,
      threePointPercentage: 39.2,
      stealsPerGame: 1.2,
      blocksPerGame: 0.8,
      height: '6\'9"',
      weight: '250 lbs',
      yearsInLeague: 21,
      jerseyNumber: 23,
    },
    {
      id: 2,
      name: 'Luka Doncic',
      team: 'DAL',
      position: 'PG',
      pointsPerGame: 33.9,
      assistsPerGame: 9.2,
      reboundsPerGame: 9.2,
      fieldGoalPercentage: 50.4,
      threePointPercentage: 38.1,
      stealsPerGame: 1.5,
      blocksPerGame: 0.6,
      height: '6\'7"',
      weight: '230 lbs',
      yearsInLeague: 5,
      jerseyNumber: 77,
    },
    {
      id: 3,
      name: 'Giannis Antetokounmpo',
      team: 'MIL',
      position: 'C',
      pointsPerGame: 30.1,
      assistsPerGame: 8.9,
      reboundsPerGame: 11.5,
      fieldGoalPercentage: 58.7,
      threePointPercentage: 32.4,
      stealsPerGame: 1.1,
      blocksPerGame: 1.2,
      height: '6\'11"',
      weight: '242 lbs',
      yearsInLeague: 12,
      jerseyNumber: 34,
    },
  ]);

  const filteredPlayers = mockPlayers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Player Stats</h1>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Player Selection */}
      {selectedPlayer === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
              <p className="text-gray-600 mb-4">{player.team} - {player.position}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">PPG</p>
                  <p className="text-xl font-bold text-blue-600">{player.pointsPerGame}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">APG</p>
                  <p className="text-xl font-bold text-blue-600">{player.assistsPerGame}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">RPG</p>
                  <p className="text-xl font-bold text-blue-600">{player.reboundsPerGame}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">FG%</p>
                  <p className="text-xl font-bold text-blue-600">{player.fieldGoalPercentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => setSelectedPlayer(null)}
            className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ← Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Player Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedPlayer.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{selectedPlayer.team} - #{selectedPlayer.jerseyNumber}</p>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-500">Position</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedPlayer.position}</p>
                </div>
                <div>
                  <p className="text-gray-500">Height / Weight</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedPlayer.height} / {selectedPlayer.weight}</p>
                </div>
                <div>
                  <p className="text-gray-500">Years in League</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedPlayer.yearsInLeague}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Season Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Points Per Game</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedPlayer.pointsPerGame}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Assists Per Game</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedPlayer.assistsPerGame}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Rebounds Per Game</p>
                  <p className="text-3xl font-bold text-green-600">{selectedPlayer.reboundsPerGame}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Field Goal %</p>
                  <p className="text-3xl font-bold text-green-600">{selectedPlayer.fieldGoalPercentage}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">3-Point %</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedPlayer.threePointPercentage}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Steals Per Game</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedPlayer.stealsPerGame}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Blocks Per Game</p>
                  <p className="text-3xl font-bold text-orange-600">{selectedPlayer.blocksPerGame}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
