import type { UpcomingSlot } from '../types';
import { TeamLogoCircle } from './TeamLogoCircle';

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

            return (
              <div key={slot.date} className="upcoming-slot">
                {isOffDay ? (
                  <>
                    <div className="slot-logo-placeholder" />
                    <div className="slot-info">
                      <span className="slot-day">{formatSlotDay(slot.date)}</span>
                      <span className="slot-pitcher off-day">OFF DAY</span>
                    </div>
                  </>
                ) : (
                  <>
                    <TeamLogoCircle
                      teamId={opponent!.team.id}
                      size={52}
                      alt={opponent!.team.name}
                      grayscale={!metsIsHome}
                    />
                    <div className="slot-info">
                      <span className="slot-day">
                        {formatSlotDay(slot.date)} {formatSlotTime(game!.gameDate)}
                      </span>
                      <span className="slot-pitcher">
                        {metsPitcher ? getPitcherLastName(metsPitcher.fullName) : 'TBD'}
                      </span>
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
