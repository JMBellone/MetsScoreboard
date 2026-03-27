import type { TeamRecord } from '../types';
import { TeamLogoCircle } from './TeamLogoCircle';

const NL_EAST_IDS = [121, 144, 146, 143, 120];
const METS_ID = 121;

interface Props {
  standings: TeamRecord[];
}

function formatGB(val: string): string {
  return val === '-' || val === '0.0' ? '—' : val;
}

function getLastTen(record: TeamRecord): string {
  const split = record.records?.splitRecords?.find((r) => r.type === 'lastTen');
  return split ? `${split.wins}-${split.losses}` : '—';
}

export function Standings({ standings }: Props) {
  const nlEast = standings
    .filter((r) => NL_EAST_IDS.includes(r.team.id))
    .sort((a, b) => parseInt(a.divisionRank) - parseInt(b.divisionRank));

  return (
    <div className="card standings-card">
      <div className="standings-title">NL EAST STANDINGS</div>
      {nlEast.length === 0 ? (
        <div className="no-data">Standings unavailable</div>
      ) : (
        <table className="standings-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>W</th>
              <th>L</th>
              <th>DIV</th>
              <th>WC</th>
              <th>STRK</th>
              <th>L10</th>
            </tr>
          </thead>
          <tbody>
            {nlEast.map((record) => (
              <tr key={record.team.id} className={record.team.id === METS_ID ? 'mets-row' : ''}>
                <td className="col-rank">{record.divisionRank}</td>
                <td className="col-logo">
                  <TeamLogoCircle teamId={record.team.id} size={28} alt={record.team.name} />
                </td>
                <td>{record.leagueRecord.wins}</td>
                <td>{record.leagueRecord.losses}</td>
                <td>{formatGB(record.gamesBack)}</td>
                <td>{formatGB(record.wildCardGamesBack ?? '-')}</td>
                <td>{record.streak?.streakCode ?? '—'}</td>
                <td>{getLastTen(record)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
