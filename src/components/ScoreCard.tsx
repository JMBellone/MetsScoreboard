import type { Game } from '../types';
import { TeamLogoCircle } from './TeamLogoCircle';

const METS_ID = 121;

interface Props {
  game: Game | null;
}

function formatDate(officialDate: string): string {
  const [year, month, day] = officialDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase();
}

function formatGameTime(gameDate: string): string {
  const d = new Date(gameDate);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function ScoreCard({ game }: Props) {
  if (!game) {
    return (
      <div className="card score-card">
        <div className="no-data">No recent game data</div>
      </div>
    );
  }

  const { teams, status, linescore, gameDate, officialDate } = game;
  const isLive = status.abstractGameState === 'Live';
  const isFinal = status.abstractGameState === 'Final';
  const isPreview = status.abstractGameState === 'Preview';

  const away = teams.away;
  const home = teams.home;
  const metsIsHome = home.team.id === METS_ID;
  void metsIsHome;

  const finalInnings = isFinal && linescore?.currentInning && linescore.currentInning > 9
    ? linescore.currentInning
    : null;

  const statusLabel = isLive && linescore
    ? `${linescore.inningHalf === 'Top' ? '▲' : '▼'} ${linescore.currentInningOrdinal}`
    : isFinal ? (finalInnings ? `FINAL/${finalInnings}` : 'FINAL')
    : isPreview ? formatGameTime(gameDate)
    : status.detailedState.toUpperCase();

  return (
    <div className="card score-card">
      {/* Away team */}
      <div className="sc-team">
        <TeamLogoCircle teamId={away.team.id} size={52} alt={away.team.name} />
        <span className="sc-record">{away.leagueRecord.wins}-{away.leagueRecord.losses}</span>
      </div>

      {/* Away score */}
      <span className={`sc-score ${away.team.id === METS_ID ? 'mets-score' : 'opp-score'}`}>
        {(isLive || isFinal) ? (away.score ?? 0) : ''}
      </span>

      {/* Status */}
      <div className="sc-status">
        <span className="sc-date">{formatDate(officialDate)}</span>
        <span className="sc-label">{statusLabel}</span>
      </div>

      {/* Home score */}
      <span className={`sc-score ${home.team.id === METS_ID ? 'mets-score' : 'opp-score'}`}>
        {(isLive || isFinal) ? (home.score ?? 0) : ''}
      </span>

      {/* Home team */}
      <div className="sc-team">
        <TeamLogoCircle teamId={home.team.id} size={52} alt={home.team.name} />
        <span className="sc-record">{home.leagueRecord.wins}-{home.leagueRecord.losses}</span>
      </div>
    </div>
  );
}
