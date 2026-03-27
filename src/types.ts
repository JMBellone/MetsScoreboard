export interface Team {
  id: number;
  name: string;
  abbreviation: string;
  teamName: string;
}

export interface ProbablePitcher {
  id: number;
  fullName: string;
  lastName?: string;
}

export interface GameTeam {
  team: Team;
  score?: number;
  isWinner?: boolean;
  leagueRecord: { wins: number; losses: number };
  probablePitcher?: ProbablePitcher;
}

export interface GameStatus {
  abstractGameState: string; // Preview, Live, Final
  detailedState: string;
  statusCode: string;
}

export interface Game {
  gamePk: number;
  gameDate: string;
  officialDate: string;
  status: GameStatus;
  teams: {
    away: GameTeam;
    home: GameTeam;
  };
  venue?: { name: string };
  linescore?: {
    currentInning?: number;
    currentInningOrdinal?: string;
    inningHalf?: string;
  };
}

export interface UpcomingSlot {
  date: string;       // YYYY-MM-DD
  game: Game | null;  // null = off day
}

export interface TeamRecord {
  team: { id: number; name: string };
  divisionRank: string;
  leagueRecord: { wins: number; losses: number; pct: string };
  gamesBack: string;
  wildCardGamesBack: string;
  streak?: { streakCode: string };
}
