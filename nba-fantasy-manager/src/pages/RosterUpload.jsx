import { useState } from 'react';
import { useNBA } from '../hooks/useNBA';

export default function RosterUpload() {
  const { uploadRoster, roster, rosterName, setRosterName } = useNBA();
  const [csvContent, setCsvContent] = useState('');
  const [parseError, setParseError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCsvContent(e.target.result);
      setParseError('');
    };
    reader.readAsText(file);
  };

  const parseCSV = () => {
    if (!csvContent.trim()) {
      setParseError('Please upload a CSV file or paste content');
      return;
    }

    try {
      const lines = csvContent.trim().split('\n');
      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

      const rosterData = lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim());
        const player = {};
        headers.forEach((header, index) => {
          player[header] = values[index] || '';
        });
        return player;
      });

      if (rosterData.length === 0) {
        setParseError('No player data found in CSV');
        return;
      }

      uploadRoster(rosterData);
      setSuccessMessage(`Successfully uploaded ${rosterData.length} players!`);
      setCsvContent('');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setParseError('Error parsing CSV: ' + error.message);
    }
  };

  const downloadTemplate = () => {
    const template =
      'Player Name,Team,Position,Points,Assists,Rebounds\nLeBron James,LAL,PF,24.5,8.1,8.7\n';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roster-template.csv';
    a.click();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Roster Upload</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Roster</h2>

          {/* Roster Name Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Roster Name</label>
            <input
              type="text"
              value={rosterName}
              onChange={(e) => setRosterName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="My Fantasy Team"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Upload CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
            />
            <p className="text-gray-600 text-sm mt-2">
              Required columns: Player Name, Team, Position
            </p>
          </div>

          {/* CSV Content TextArea */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Or Paste CSV Content</label>
            <textarea
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              placeholder="Player Name,Team,Position&#10;LeBron James,LAL,PF&#10;Kevin Durant,PHX,SF"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-40 font-mono text-sm"
            />
          </div>

          {/* Error Message */}
          {parseError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {parseError}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={parseCSV}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Upload Roster
            </button>
            <button
              onClick={downloadTemplate}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Download Template
            </button>
          </div>
        </div>

        {/* Current Roster Display */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Current Roster ({roster.length})
          </h2>

          {roster.length === 0 ? (
            <p className="text-gray-500">No roster uploaded yet. Upload a CSV file to get started!</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {roster.map((player, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900">
                    {player['player name'] || player['Player Name'] || `Player ${index + 1}`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {player.team || player.Team} - {player.position || player.Position}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Roster Stats */}
          {roster.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Total Players</p>
                  <p className="text-2xl font-bold text-blue-600">{roster.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Roster Status</p>
                  <p className="text-2xl font-bold text-green-600">Active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSV Format Guide */}
      <div className="mt-8 bg-blue-50 rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">CSV Format Guide</h3>
        <p className="text-gray-700 mb-4">Your CSV file should have the following format:</p>
        <div className="bg-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>
            Player Name,Team,Position,Points,Assists,Rebounds<br />
            LeBron James,LAL,PF,24.5,8.1,8.7<br />
            Luka Doncic,DAL,PG,33.9,9.2,9.2<br />
          </code>
        </div>
        <p className="text-gray-700 mt-4">
          Only "Player Name", "Team", and "Position" are required. Additional columns like
          Points, Assists, and Rebounds are optional.
        </p>
      </div>
    </div>
  );
}
