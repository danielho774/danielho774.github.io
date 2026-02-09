import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';
const API_KEY = import.meta.env.VITE_API_KEY;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'x-api-key': API_KEY }),
  },
});

/**
 * NBA API Service
 * 
 * This service handles all API calls related to NBA player data, stats, injuries, etc.
 * Update the endpoints based on your chosen API provider.
 * 
 * Popular API Options:
 * 1. RapidAPI NBA API - https://rapidapi.com/api-sports/api/nba
 * 2. ESPN API - https://www.espn.com/apis/site/v2/sports/basketball/nba
 * 3. API-Basketball - https://rapidapi.com/api-sports/api/api-basketball
 */

export const nbaApiService = {
  /**
   * Get all NBA players with basic info
   * @param {string} season - NBA season (e.g., "2025-2026")
   * @returns {Promise<Array>} Array of player objects
   */
  getPlayers: async (season = '2025-2026') => {
    try {
      const response = await apiClient.get('/players', {
        params: { season },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  },

  /**
   * Get detailed stats for a specific player
   * @param {number} playerId - NBA player ID
   * @param {string} season - NBA season
   * @returns {Promise<Object>} Player stats object
   */
  getPlayerStats: async (playerId, season = '2025-2026') => {
    try {
      const response = await apiClient.get(`/players/${playerId}/stats`, {
        params: { season },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching stats for player ${playerId}:`, error);
      throw error;
    }
  },

  /**
   * Get player rankings (leaderboard) by timeframe
   * @param {string} timeframe - 'week', 'month', 'season'
   * @returns {Promise<Array>} Sorted array of players with scores
   */
  getLeaderboard: async (timeframe = 'season') => {
    try {
      // Map timeframe to API parameters
      const timeframeMap = {
        'week': 7,
        'twoWeeks': 14,
        'month': 30,
        'season': 365,
      };

      const days = timeframeMap[timeframe] || 365;

      const response = await apiClient.get('/standings', {
        params: { 
          season: '2025-2026',
          days,
        },
      });

      // Transform and sort by fantasy score
      return response.data.sort((a, b) => b.fantasyScore - a.fantasyScore);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  /**
   * Get current injury reports
   * @returns {Promise<Array>} Array of injured players
   */
  getInjuryReports: async () => {
    try {
      const response = await apiClient.get('/injuries');
      return response.data;
    } catch (error) {
      console.error('Error fetching injury reports:', error);
      throw error;
    }
  },

  /**
   * Get injury news for a specific player
   * @param {number} playerId - NBA player ID
   * @returns {Promise<Array>} Array of injury news/updates
   */
  getPlayerInjuryNews: async (playerId) => {
    try {
      const response = await apiClient.get(`/injuries/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching injury news for player ${playerId}:`, error);
      throw error;
    }
  },

  /**
   * Get streaming opportunities (custom logic)
   * Analyzes available players with high value potential
   * @returns {Promise<Array>} Array of streaming opportunities
   */
  getStreamingOpportunities: async () => {
    try {
      // This is custom logic - fetch available players and analyze
      const response = await apiClient.get('/available-players');
      
      // Filter and score players based on:
      // 1. Playing time increase
      // 2. matchup favorability
      // 3. Recent performance metrics
      const opportunities = response.data
        .map(player => ({
          ...player,
          confidenceScore: calculateConfidenceScore(player),
          projectedPoints: calculateProjectedPoints(player),
        }))
        .filter(p => p.confidenceScore >= 65)
        .sort((a, b) => b.confidenceScore - a.confidenceScore);

      return opportunities;
    } catch (error) {
      console.error('Error fetching streaming opportunities:', error);
      throw error;
    }
  },

  /**
   * Get team schedule
   * @param {string} teamId - NBA team ID
   * @returns {Promise<Array>} Array of upcoming games
   */
  getTeamSchedule: async (teamId) => {
    try {
      const response = await apiClient.get(`/teams/${teamId}/schedule`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule for team ${teamId}:`, error);
      throw error;
    }
  },

  /**
   * Search for a player by name
   * @param {string} playerName - Player name to search for
   * @returns {Promise<Array>} Array of matching players
   */
  searchPlayers: async (playerName) => {
    try {
      const response = await apiClient.get('/players/search', {
        params: { name: playerName },
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching for player ${playerName}:`, error);
      throw error;
    }
  },

  /**
   * Get live game data
   * @returns {Promise<Array>} Array of live games
   */
  getLiveGames: async () => {
    try {
      const response = await apiClient.get('/games/live');
      return response.data;
    } catch (error) {
      console.error('Error fetching live games:', error);
      throw error;
    }
  },
};

/**
 * Helper function: Calculate confidence score for streaming opportunity
 * @param {Object} player - Player object with stats
 * @returns {number} Confidence score (0-100)
 */
function calculateConfidenceScore(player) {
  let score = 0;

  // Playing time trend (0-30 points)
  if (player.playingTimeTrend > 5) score += 30;
  else if (player.playingTimeTrend > 2) score += 20;
  else if (player.playingTimeTrend > 0) score += 10;

  // Recent performance (0-30 points)
  if (player.last7DaysAverage > player.seasonAverage * 1.2) score += 30;
  else if (player.last7DaysAverage > player.seasonAverage * 1.1) score += 20;
  else if (player.last7DaysAverage > player.seasonAverage) score += 10;

  // Matchup favorability (0-25 points)
  if (player.nextMatchupDifficulty === 'easy') score += 25;
  else if (player.nextMatchupDifficulty === 'medium') score += 15;

  // Health status (0-15 points)
  if (player.healthStatus === 'healthy') score += 15;
  else if (player.healthStatus === 'probable') score += 5;

  return Math.min(score, 100);
}

/**
 * Helper function: Calculate projected points for a player
 * @param {Object} player - Player object with stats
 * @returns {number} Projected points
 */
function calculateProjectedPoints(player) {
  const baseAverage = player.seasonAverage || 10;
  const recentTrend = player.last7DaysAverage || baseAverage;

  // Weight recent performance 60%, season average 40%
  const projectedBase = (recentTrend * 0.6) + (baseAverage * 0.4);

  // Adjust for matchup difficulty
  const matchupMultiplier = 
    player.nextMatchupDifficulty === 'easy' ? 1.15 :
    player.nextMatchupDifficulty === 'medium' ? 1.0 :
    0.85;

  return Math.round(projectedBase * matchupMultiplier * 10) / 10;
}

/**
 * Error handling utility
 * @param {Error} error - Error object from API
 * @returns {Object} Formatted error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: null,
      message: 'No response from server',
    };
  } else {
    // Error in request setup
    return {
      status: null,
      message: error.message || 'An error occurred',
    };
  }
};

export default nbaApiService;
