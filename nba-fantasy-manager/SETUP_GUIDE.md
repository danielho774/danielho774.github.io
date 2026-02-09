# NBA Fantasy Basketball Management Website

A comprehensive web application for managing NBA fantasy basketball leagues with player tracking, injury monitoring, and strategic insights.

## 🎯 Features Implemented

### 1. **Dashboard**

- Quick stats overview (active players, roster spots, injuries, league rank)
- Real-time notifications and updates
- Quick navigation links to all major features

### 2. **Leaderboard**

- Player performance rankings by timeframe (1 week, 2 weeks, 1 month, season)
- Detailed stats: Points, Assists, Rebounds, Fantasy Score
- Sortable and filterable player data

### 3. **Player Stats Page**

- Search and view individual player statistics
- Detailed stat cards for each player including:
  - Points Per Game (PPG)
  - Assists Per Game (APG)
  - Rebounds Per Game (RPG)
  - Field Goal %, 3-Point %, Steals, Blocks
  - Player bio (height, weight, years in league)

### 4. **Streaming Opportunities**

- Curated list of available high-value players
- Confidence scores for streaming recommendations
- Reason for value analysis
- Projected vs. average points comparison

### 5. **Roster Upload**

- CSV upload for roster management
- Roster name customization
- Download CSV template
- Current roster display with player count
- Supports CSV format: Player Name, Team, Position

### 6. **Injury Tracking & News**

- Real-time injury status monitoring
- Status categories: Out, Day to Day, Probable
- Severity levels: Low, Medium, High
- News updates timeline
- Expected return dates
- Injury statistics dashboard

## 📁 Project Structure

```
src/
├── pages/
│   ├── Dashboard.jsx           # Main dashboard page
│   ├── Leaderboard.jsx         # Player rankings page
│   ├── PlayerStats.jsx         # Player details page
│   ├── StreamingOpportunities.jsx  # Streaming recommendations
│   ├── RosterUpload.jsx        # CSV roster upload
│   └── InjuryTracking.jsx      # Injury monitoring
├── components/
│   └── Navigation.jsx          # Top navigation bar
├── context/
│   └── NBAContext.jsx          # Global state management
├── hooks/
│   └── useNBA.js               # Custom hook for context
├── services/                   # (Ready for API integration)
├── utils/                      # (Ready for helper functions)
├── App.jsx                     # Main app component with routing
├── main.jsx                    # React entry point
├── index.css                   # Tailwind CSS setup
└── App.css                     # Custom app styles
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **CSS**: Tailwind CSS 4
- **Routing**: React Router v6
- **HTTP Client**: Axios (ready to install)
- **State Management**: React Context API
- **Deployment**: GitHub Pages

## 📦 Installed Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.x.x",
  "tailwindcss": "^4.1.18",
  "axios": "^1.x.x",
  "postcss": "^8.x.x",
  "autoprefixer": "^10.x.x"
}
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📊 Next Steps: NBA API Integration

### 1. **Choose NBA Data Source**

#### Option A: NBA Official API

- Endpoint: `https://www.nba.com/stats/` (Note: This may require web scraping)
- Alternative: Use a sports API wrapper

#### Option B: Third-Party Sports APIs (Recommended)

Popular options:

- **RapidAPI's NBA API**: Easy integration, comprehensive data
- **ESPN API**: Free alternative
- **SportsData.io**: Professional-grade data

### 2. **Create API Service**

Create `src/services/nbaApiService.js`:

```javascript
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const nbaApiService = {
  // Players
  getPlayers: async (season) => {
    // Implementation here
  },

  // Player Stats
  getPlayerStats: async (playerId, season) => {
    // Implementation here
  },

  // Leaderboard
  getLeaderboard: async (timeframe) => {
    // Implementation here
  },

  // Injuries
  getInjuries: async () => {
    // Implementation here
  },

  // Streaming Opportunities (Custom logic)
  getStreamingOpportunities: async () => {
    // Implementation here
  },
};
```

### 3. **Environment Variables**

Create `.env.local`:

```
VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key
```

### 4. **Update Context with Real Data**

In `src/context/NBAContext.jsx`, replace mock data with API calls:

```javascript
useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const response = await nbaApiService.getLeaderboard(selectedTimeframe);
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  fetchPlayers();
}, [selectedTimeframe]);
```

## 🎨 Customization

### Tailwind Configuration

Modify `tailwind.config.js` to customize colors, fonts, and theme:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
      },
    },
  },
};
```

### Navigation Styling

Update `src/components/Navigation.jsx` for custom branding and logo

### Page Styling

All pages use Tailwind CSS. Update classes directly in component JSX files.

## 📝 CSV Format for Roster Upload

Expected CSV format:

```csv
Player Name,Team,Position,Points,Assists,Rebounds
LeBron James,LAL,PF,24.5,8.1,8.7
Luka Doncic,DAL,PG,33.9,9.2,9.2
```

Required columns:

- Player Name
- Team
- Position

Optional columns:

- Points
- Assists
- Rebounds
- Any other stats

## 🔒 Data Persistence

Currently uses React Context (in-memory). For persistence:

### Option 1: localStorage

```javascript
useEffect(() => {
  localStorage.setItem("roster", JSON.stringify(roster));
}, [roster]);
```

### Option 2: Backend Database

- Create Node.js/Express API
- Use MongoDB, PostgreSQL, or Firebase
- Update Context to call backend endpoints

### Option 3: Firebase

```javascript
import { db } from "./firebase-config";
const rosterRef = collection(db, "rosters");
```

## 🧪 Testing

Add testing setup with:

- Jest
- React Testing Library
- Vitest (Vite-native alternative)

```bash
npm install --save-dev vitest @testing-library/react
```

## 📱 Responsive Design

The site is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🐛 Troubleshooting

### Port 5173 Already in Use

```bash
npm run dev -- --port 3000
```

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tailwind Not Loading

Ensure `@import "tailwindcss"` is at the top of `src/index.css`

## 📄 License

MIT License - Free to use and modify

## 🤝 Support

For issues or questions, refer to:

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

**Happy Fantasy Basketball Managing! 🏀**
