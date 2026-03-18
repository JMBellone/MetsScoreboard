import { useMLBData } from './hooks/useMLBData';
import { ScoreCard } from './components/ScoreCard';
import { UpcomingGames } from './components/UpcomingGames';
import { Standings } from './components/Standings';
import './App.css';

export default function App() {
  const { latestGame, upcomingSlots, standings, loading, error, lastUpdated, refresh } =
    useMLBData();

  return (
    <div className="dashboard">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={refresh} className="retry-btn">Retry</button>
        </div>
      )}

      <div className={`dashboard-grid ${loading ? 'loading' : ''}`}>
        {/* Left column: score on top, upcoming below */}
        <div className="left-col">
          <ScoreCard game={latestGame} />
          <UpcomingGames slots={upcomingSlots} />
        </div>

        {/* Right column: standings full height */}
        <Standings standings={standings} />
      </div>

      {lastUpdated && (
        <div className="footer">
          <span>Updated {lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          <button className="refresh-btn" onClick={refresh} disabled={loading}>↺</button>
        </div>
      )}
    </div>
  );
}
