# NBA API Integration Guide

This guide helps you integrate real NBA data into your fantasy basketball management website.

## 🔌 Choosing an API Provider

### 1. **RapidAPI NBA API** (Recommended for Beginners)

**Pros:**

- Comprehensive NBA data
- Easy authentication
- Good documentation
- Free tier available

**Cons:**

- Limited free requests (500/month)
- Requires RapidAPI account

**Setup:**

1. Visit: https://rapidapi.com/api-sports/api/nba
2. Sign up for free account
3. Copy your API key
4. Create `.env.local`:
   ```
   VITE_API_URL=https://api-nba-v1.p.rapidapi.com
   VITE_API_KEY=your_rapidapi_key
   VITE_API_PROVIDER=rapidapi
   ```

---

### 2. **ESPN API** (Free Alternative)

**Pros:**

- Completely free
- No authentication needed
- Reliable public API
- Lots of endpoints

**Cons:**

- Less structured data
- Requires more data transformation
- No official documentation (community-driven)

**Setup:**

1. Create `.env.local`:

   ```
   VITE_API_URL=https://www.espn.com/apis/site/v2/sports/basketball/nba
   VITE_API_PROVIDER=espn
   ```

2. Update `src/services/nbaApiService.js`:
   ```javascript
   // ESPN doesn require API key
   const apiClient = axios.create({
     baseURL: API_BASE_URL,
     timeout: 10000,
   });
   ```

---

### 3. **API-Basketball** (Professional Option)

**Pros:**

- Very comprehensive
- Professional API design
- Good documentation
- Multiple sports included

**Cons:**

- Paid service
- More expensive than others

**Setup:**

1. Visit: https://www.api-football.com/documentation
2. Get API key
3. Create `.env.local`:
   ```
   VITE_API_URL=https://v3.basketball.api-sports.io
   VITE_API_KEY=your_api_key
   VITE_API_PROVIDER=api-basketball
   ```

---

## 📝 Implementation Steps

### Step 1: Set Up Environment Variables

Create `.env.local` in your project root:

```env
VITE_API_URL=https://your-chosen-api-url.com
VITE_API_KEY=your-api-key
VITE_API_PROVIDER=your-provider-name
```

### Step 2: Update nbaApiService.js

Customize the API endpoints based on your chosen provider:

```javascript
// For RapidAPI NBA
export const getPlayers = async () => {
  const response = await apiClient.get("/players", {
    headers: {
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    },
  });
  return response.data.response;
};

// For ESPN
export const getPlayers = async () => {
  const response = await apiClient.get("/players");
  return response.data.players;
};
```

### Step 3: Install Axios

```bash
npm install axios
```

### Step 4: Update Context to Use Real Data

In `src/context/NBAContext.jsx`:

```javascript
import { useEffect } from "react";
import { nbaApiService } from "../services/nbaApiService";

export const NBAProvider = ({ children }) => {
  // ... existing code ...

  // Fetch players on mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await nbaApiService.getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Error loading players:", error);
      }
    };

    fetchPlayers();
  }, []);

  // Fetch injuries
  useEffect(() => {
    const fetchInjuries = async () => {
      try {
        const data = await nbaApiService.getInjuryReports();
        setInjuries(data);
      } catch (error) {
        console.error("Error loading injuries:", error);
      }
    };

    fetchInjuries();
  }, []);

  // ... rest of provider ...
};
```

---

## 🔧 API Endpoint Mapping

### RapidAPI NBA

```javascript
// Players
GET /players - Get all players
GET /players?id=201950 - Get specific player
GET /stats?season=2024 - Get player stats

// Teams
GET /teams - Get all teams
GET /teams?id=1610612752 - Get specific team

// Standings
GET /standings?season=2024 - Get league standings

// Statistics
GET /statistics?season=2024&date=2024-02-06 - Get daily stats
```

### ESPN API

```javascript
// Players
GET /players - Get all players
GET /players/{id} - Get player details

// Teams
GET /teams - Get all teams
GET /teams/{id} - Get team details

// Scores
GET /scoreboard - Get today's games
GET /scoreboard?dates=20240206 - Get games by date
```

---

## 📊 Data Transformation Examples

### RapidAPI → Your App Format

```javascript
// API Response
{
  "get": "players",
  "response": [
    {
      "id": 201950,
      "firstname": "LeBron",
      "lastname": "James",
      "nba": { "start": 2003, "pro": true }
    }
  ]
}

// Transform to App Format
const transformedData = response.data.response.map(player => ({
  id: player.id,
  name: `${player.firstname} ${player.lastname}`,
  yearsInLeague: new Date().getFullYear() - player.nba.start,
  // ... other fields
}));
```

### ESPN → Your App Format

```javascript
// API Response
{
  "players": [
    {
      "id": "2571",
      "displayName": "LeBron James",
      "fullName": "LeBron Raymone James",
      // ... extensive player data
    }
  ]
}

// Transform to App Format
const transformedData = response.data.players.map(player => ({
  id: player.id,
  name: player.displayName,
  fullName: player.fullName,
  // ... map other fields
}));
```

---

## ⚡ Performance Optimization

### Caching Strategy

```javascript
// Add caching to nbaApiService
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getPlayers = async () => {
  const cacheKey = "players";
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const response = await apiClient.get("/players");
  const data = response.data;

  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
};
```

### Rate Limiting

```javascript
// Implement request throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // ms

export const throttledApiCall = async (fn) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest),
    );
  }

  lastRequestTime = Date.now();
  return fn();
};
```

---

## 🧪 Testing Your Integration

### Test with Mock Data First

```javascript
// Create src/services/mockNbaService.js
export const mockNbaService = {
  getPlayers: async () => [
    { id: 1, name: "LeBron James", team: "LAL", position: "PF" },
    // ... mock players
  ],
  // ... other mocked methods
};
```

### Switch Between Real and Mock

```javascript
const nbaService =
  process.env.VITE_USE_MOCK === "true" ? mockNbaService : nbaApiService;
```

---

## 🐛 Troubleshooting

### CORS Errors

**Problem:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**

- If using free ESP public API, add mode to axios:
  ```javascript
  const response = await axios.get(url, {
    config: { mode: "cors" },
  });
  ```
- For RapidAPI, ensure proper headers
- Use a CORS proxy for development (not for production!)

### API Rate Limiting

**Problem:** Too many requests error

**Solution:**

```javascript
// Implement exponential backoff
const apiCall = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};
```

### Missing Data Fields

**Problem:** API doesn't have all fields you need

**Solution:**

```javascript
// Provide default values
const transformedPlayer = {
  id: apiPlayer.id,
  name: apiPlayer.name || "Unknown",
  team: apiPlayer.team || "N/A",
  fantasyScore: calculateFantasyScore(apiPlayer), // Custom calculation
  // ... other fields with defaults
};
```

---

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [RapidAPI NBA API Docs](https://rapidapi.com/api-sports/api/nba)
- [ESPN Sports Data Docs](https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc5b)
- [React Data Fetching Best Practices](https://react.dev/learn/synchronizing-with-effects)

---

**Good luck with your NBA Fantasy Basketball app! 🏀**
