import type { UpcomingSlot, Broadcast } from '../types';
import { TeamLogoCircle } from './TeamLogoCircle';
import { BroadcastBadge } from './BroadcastBadge';

const METS_ID = 121;

interface Props {
  slots: UpcomingSlot[];
}

function formatSlotDay(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
}

function formatSlotTime(gameDate: string): string {
  const d = new Date(gameDate);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function getPitcherLastName(fullName: string): string {
  const parts = fullName.trim().split(' ');
  return parts[parts.length - 1];
}

function getMetsBroadcast(broadcasts: Broadcast[] | undefined, metsIsHome: boolean): string | null {
  if (!broadcasts) return null;
  const tvBroadcasts = broadcasts.filter((b) => b.type === 'TV');
  const metsSide = metsIsHome ? 'home' : 'away';
  const local = tvBroadcasts.find((b) => b.homeAway === metsSide);
  if (local) return local.name;
  const national = tvBroadcasts.find((b) => b.isNational);
  return national?.name ?? null;
}

function PitcherHeadshot({ pitcherId, size = 52 }: { pitcherId: number; size?: number }) {
  const src = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/w_213,q_auto:best/v1/people/${pitcherId}/headshot/silo/current`;
  return (
    <img
      src={src}
      alt="pitcher"
      width={size}
      style={{ display: 'block', flexShrink: 0 }}
    />
  );
}

export function UpcomingGames({ slots }: Props) {
  return (
    <div className="card upcoming-card">
      <div className="upcoming-title">UPCOMING SCHEDULE</div>
      <div className="upcoming-slots">
        {slots.length === 0 ? (
          <div className="no-data">No upcoming games</div>
        ) : (
          slots.map((slot) => {
            const isOffDay = !slot.game;
            const game = slot.game;
            const metsIsHome = game ? game.teams.home.team.id === METS_ID : false;
            const opponent = game ? (metsIsHome ? game.teams.away : game.teams.home) : null;
            const metsPitcher = game
              ? (metsIsHome ? game.teams.home.probablePitcher : game.teams.away.probablePitcher)
              : null;
            const broadcastOverrides: Record<string, string> = {
              '2026-04-09': 'SNY',
              '2026-04-15': 'ESPN',
            };
            const metsBroadcast = game
              ? (broadcastOverrides[slot.date] ?? getMetsBroadcast(game.broadcasts, metsIsHome))
              : null;

            return (
              <div key={slot.date} className="upcoming-slot">
                {isOffDay ? (
                  <div className="slot-info">
                    <span className="slot-day">{formatSlotDay(slot.date)}</span>
                    <span className="slot-pitcher off-day">OFF DAY</span>
                  </div>
                ) : (
                  <>
                    <div className="slot-logos">
                      {metsIsHome ? (
                        <>
                          <TeamLogoCircle
                            teamId={opponent!.team.id}
                            size={52}
                            alt={opponent!.team.name}
                          />
                          {metsPitcher ? (
                            <PitcherHeadshot pitcherId={metsPitcher.id} size={52} />
                          ) : (
                            <div className="slot-logo-placeholder" />
                          )}
                        </>
                      ) : (
                        <>
                          {metsPitcher ? (
                            <PitcherHeadshot pitcherId={metsPitcher.id} size={52} />
                          ) : (
                            <div className="slot-logo-placeholder" />
                          )}
                          <TeamLogoCircle
                            teamId={opponent!.team.id}
                            size={52}
                            alt={opponent!.team.name}
                          />
                        </>
                      )}
                    </div>
                    <div className="slot-info">
                      <span className="slot-day">
                        {formatSlotDay(slot.date)} {formatSlotTime(game!.gameDate)}
                      </span>
                      <span className="slot-pitcher">
                        {metsPitcher ? getPitcherLastName(metsPitcher.fullName) : 'TBD'}
                      </span>
                      {metsBroadcast && (
                        <BroadcastBadge channel={metsBroadcast} />
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
