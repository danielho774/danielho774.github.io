import { createContext, useState, useCallback } from 'react';

export const NBAContext = createContext();

export const NBAProvider = ({ children }) => {
  // Dashboard and Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'update', title: 'Player Update', message: 'LeBron James stats updated', timestamp: new Date() },
    { id: 2, type: 'injury', title: 'Injury Report', message: 'Giannis - Out for next game', timestamp: new Date() },
  ]);

  // Player data
  const [players, setPlayers] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('season'); // 'week', 'twoWeeks', 'month', 'season'

  // Roster data
  const [roster, setRoster] = useState([]);
  const [rosterName, setRosterName] = useState('My Roster');

  // Injury data
  const [injuries, setInjuries] = useState([
    { id: 1, playerName: 'Giannis Antetokounmpo', team: 'MIL', status: 'Out', expectedReturn: '2026-02-15' },
    { id: 2, playerName: 'Stephen Curry', team: 'GSW', status: 'Day to Day', expectedReturn: 'Unknown' },
  ]);

  // Streaming opportunities
  const [streamingOpportunities, setStreamingOpportunities] = useState([]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const uploadRoster = useCallback((rosterData) => {
    setRoster(rosterData);
    addNotification({
      type: 'success',
      title: 'Roster Uploaded',
      message: `Successfully uploaded roster with ${rosterData.length} players`,
    });
  }, [addNotification]);

  const value = {
    // Notifications
    notifications,
    addNotification,
    removeNotification,

    // Players and Leaderboard
    players,
    setPlayers,
    selectedTimeframe,
    setSelectedTimeframe,

    // Roster
    roster,
    uploadRoster,
    rosterName,
    setRosterName,

    // Injuries
    injuries,
    setInjuries,

    // Streaming
    streamingOpportunities,
    setStreamingOpportunities,
  };

  return (
    <NBAContext.Provider value={value}>
      {children}
    </NBAContext.Provider>
  );
};
