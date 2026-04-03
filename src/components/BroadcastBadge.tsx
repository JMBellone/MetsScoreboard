import React from 'react';

// Inline SVG icons for known broadcast channels
function SnyIcon() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/1/1c/SNY_logo.svg"
      alt="SNY"
      width="20"
      height="20"
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }}
    />
  );
}

function WpixIcon() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/7d/WPIXTV.png"
      alt="PIX11"
      width="20"
      height="20"
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }}
    />
  );
}

function EspnIcon() {
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="36" height="36" rx="6" fill="#cc0000" />
      <text x="18" y="23" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="-0.5">ESPN</text>
    </svg>
  );
}

function FoxIcon() {
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="36" height="36" rx="6" fill="#002244" />
      <text x="18" y="23" textAnchor="middle" fill="#ffd700" fontSize="14" fontWeight="900" fontFamily="Arial, sans-serif">FOX</text>
    </svg>
  );
}

function MlbNetworkIcon() {
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="36" height="36" rx="6" fill="#002244" />
      <text x="18" y="15" textAnchor="middle" fill="#c8102e" fontSize="11" fontWeight="900" fontFamily="Arial, sans-serif">MLB</text>
      <text x="18" y="28" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.5">NETWORK</text>
    </svg>
  );
}

function AppleTvIcon() {
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="36" height="36" rx="6" fill="#1c1c1e" />
      {/* Apple logo path */}
      <path d="M21.5 10.5c.9-1.1.8-2.3.8-2.3s-1.1.1-2.1.8c-.9.6-1.4 1.6-1.3 2.4 1.1.1 1.8-.4 2.6-.9z" fill="white" />
      <path d="M24.5 19c0-2.7 2.2-4 2.2-4s-1.2-1.7-3-1.7c-1.3 0-2 .7-2.8.7-.9 0-1.8-.7-2.9-.7-2.1 0-4.1 1.8-4.1 5.1 0 2 .8 4.2 1.8 5.6.8 1.1 1.6 2 2.7 2 1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.1 0 1.9-1 2.6-2 .5-.8.9-1.6 1.1-2.5-2.4-.7-3.2-3.2-3.2-3.5z" fill="white" />
    </svg>
  );
}

function PeacockIcon() {
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="36" height="36" rx="6" fill="#000000" />
      <text x="18" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif">NBC</text>
      <text x="18" y="28" textAnchor="middle" fill="#00a650" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif">PEACOCK</text>
    </svg>
  );
}

function GenericTvIcon({ name }: { name: string }) {
  const abbr = name.replace(/\s+/g, '').slice(0, 3).toUpperCase();
  return (
    <svg viewBox="0 0 36 36" width="20" height="20" style={{ display: 'block', flexShrink: 0 }}>
      <rect width="36" height="36" rx="6" fill="#2a3a5a" />
      <text x="18" y="23" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">{abbr}</text>
    </svg>
  );
}

const CHANNEL_ICONS: Record<string, () => React.ReactElement> = {
  'SNY': SnyIcon,
  'WPIX': WpixIcon,
  'ESPN': EspnIcon,
  'ESPN2': EspnIcon,
  'FOX': FoxIcon,
  'FS1': FoxIcon,
  'MLB Network': MlbNetworkIcon,
  'Apple TV+': AppleTvIcon,
  'Peacock': PeacockIcon,
  'NBC': PeacockIcon,
};

interface Props {
  channel: string;
}

export function BroadcastBadge({ channel }: Props) {
  const IconComponent = CHANNEL_ICONS[channel];
  return (
    <div className="broadcast-badge">
      {IconComponent ? <IconComponent /> : <GenericTvIcon name={channel} />}
      <span className="broadcast-badge-name">{channel}</span>
    </div>
  );
}
