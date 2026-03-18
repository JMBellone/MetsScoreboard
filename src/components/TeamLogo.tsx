interface Props {
  teamId: number;
  size?: number;
  alt?: string;
  dark?: boolean;
}

export function TeamLogo({ teamId, size = 48, alt = '', dark = false }: Props) {
  const variant = dark ? 'team-cap-on-dark' : 'team-cap-on-light';
  const src = `https://www.mlbstatic.com/team-logos/${variant}/${teamId}.svg`;
  const fallback = `https://www.mlbstatic.com/team-logos/${teamId}.svg`;

  return (
    <img
      src={src}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== fallback) img.src = fallback;
      }}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
}
