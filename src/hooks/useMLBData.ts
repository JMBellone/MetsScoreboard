import { useState, useEffect, useCallback } from 'react';
import type { Game, UpcomingSlot, TeamRecord } from '../types';

const METS_ID = 121;
const NL_EAST_DIVISION_ID = 204;
const BASE_URL = 'https://statsapi.mlb.com/api/v1';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

function daysAhead(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export interface MLBData {
  latestGame: Game | null;
  upcomingSlots: UpcomingSlot[];
  standings: TeamRecord[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useMLBData(): MLBData {
  const [latestGame, setLatestGame] = useState<Game | null>(null);
  const [upcomingSlots, setUpcomingSlots] = useState<UpcomingSlot[]>([]);
  const [standings, setStandings] = useState<TeamRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [scheduleRes, standingsRes] = await Promise.all([
        fetch(
          `${BASE_URL}/schedule?teamId=${METS_ID}&sportId=1` +
          `&startDate=${daysAgo(7)}&endDate=${daysAhead(14)}` +
          `&hydrate=team,linescore,venue,probablePitcher,broadcasts&gameTypes=R,S`
        ),
        fetch(
          `${BASE_URL}/standings?leagueId=104&season=${new Date().getFullYear()}` +
          `&standingsTypes=regularSeason&hydrate=team,record`
        ),
      ]);

      const scheduleData = await scheduleRes.json();
      const standingsData = await standingsRes.json();

      // Flatten all games
      const allGames: Game[] = [];
      for (const date of scheduleData.dates ?? []) {
        for (const game of date.games ?? []) {
          allGames.push(game);
        }
      }

      const todayStr = today();

      // Latest completed or in-progress game
      const finished = allGames.filter(
        (g) => g.status.abstractGameState === 'Final' || g.status.abstractGameState === 'Live'
      );
      const liveToday = allGames.find(
        (g) => g.officialDate === todayStr && g.status.abstractGameState === 'Live'
      );
      setLatestGame(liveToday ?? (finished.length > 0 ? finished[finished.length - 1] : null));

      // Build 3 day slots starting from today
      const slots: UpcomingSlot[] = [];
      for (let i = 0; i < 3; i++) {
        const dateStr = daysAhead(i);
        const game = allGames.find((g) => g.officialDate === dateStr) ?? null;
        slots.push({ date: dateStr, game });
      }
      setUpcomingSlots(slots);

      // NL East standings
      const nlEastRecord = standingsData.records?.find(
        (r: { division?: { id: number } }) => r.division?.id === NL_EAST_DIVISION_ID
      );
      setStandings(nlEastRecord?.teamRecords ?? []);

      setLastUpdated(new Date());
    } catch (e) {
      setError('Failed to load MLB data.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { latestGame, upcomingSlots, standings, loading, error, lastUpdated, refresh: fetchData };
}
