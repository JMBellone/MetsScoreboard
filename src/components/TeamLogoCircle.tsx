// Primary team colors for circular logo backgrounds
const TEAM_COLORS: Record<number, string> = {
  108: '#BA0021', // LAA
  109: '#A71930', // ARI
  110: '#DF4601', // BAL
  111: '#BD3039', // BOS
  112: '#0E3386', // CHC
  113: '#C6011F', // CIN
  114: '#E31937', // CLE
  115: '#333366', // COL
  116: '#0C2340', // DET
  117: '#EB6E1F', // HOU
  118: '#004687', // KC
  119: '#005A9C', // LAD
  120: '#AB0003', // WSH
  121: '#002D72', // NYM
  133: '#003831', // OAK
  134: '#27251F', // PIT
  135: '#2F241D', // SD
  136: '#0C2C56', // SEA
  137: '#27251F', // SF
  138: '#BA0C2F', // STL
  139: '#092C5C', // TB
  140: '#003278', // TEX
  141: '#134A8E', // TOR
  142: '#002B5C', // MIN
  143: '#E81828', // PHI
  144: '#13274F', // ATL
  145: '#27251F', // CWS
  146: '#00A3E0', // MIA
  147: '#003087', // NYY
  158: '#12284B', // MIL
};

interface Props {
  teamId: number;
  size?: number;
  alt?: string;
  grayscale?: boolean;
}

export function TeamLogoCircle({ teamId, size = 48, alt = '', grayscale = false }: Props) {
  const bgColor = TEAM_COLORS[teamId] ?? '#333';
  const imgSrc = `https://www.mlbstatic.com/team-logos/team-cap-on-dark/${teamId}.svg`;
  const fallback = `https://www.mlbstatic.com/team-logos/${teamId}.svg`;
  const imgSize = Math.round(size * 0.68);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        filter: grayscale ? 'grayscale(1) brightness(0.7)' : undefined,
      }}
    >
      <img
        src={imgSrc}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== fallback) img.src = fallback;
        }}
        alt={alt}
        width={imgSize}
        height={imgSize}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
