/** Decorative chart for the System Health card (right column), inspired by the dashboard reference. */
export function TodosInsightChartPanel() {
  const barXs: number[] = [];
  const barHeights: number[] = [];
  const startX = 46;
  const endX = 398;
  const n = 44;
  const step = (endX - startX) / n;
  for (let i = 0; i < n; i++) {
    barXs.push(startX + i * step + step * 0.12);
    barHeights.push(10 + (i * 11 + (i % 5) * 9 + (i % 3) * 6) % 42);
  }

  const baseY = 228;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="todosInsightGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        </pattern>
        <linearGradient id="todosInsightBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="#d1d5db" />
      <rect width="400" height="240" fill="url(#todosInsightGrid)" opacity={0.6} />
      {[54, 92, 130].map((y) => (
        <line
          key={y}
          x1="40"
          y1={y}
          x2="398"
          y2={y}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.6"
        />
      ))}
      <text x="6" y="58" fill="rgba(255,255,255,0.5)" fontSize="8.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        6,000
      </text>
      <text x="6" y="96" fill="rgba(255,255,255,0.45)" fontSize="8.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        4,000
      </text>
      <text x="6" y="134" fill="rgba(255,255,255,0.38)" fontSize="8.5" fontFamily="ui-sans-serif, system-ui, sans-serif">
        2,000
      </text>
      <polyline
        fill="none"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="44,118 78,92 112,102 148,78 182,94 218,68 252,82 286,58 320,72 354,54 386,48"
      />
      <polyline
        fill="none"
        stroke="rgba(241,245,249,0.85)"
        strokeWidth="0.95"
        strokeLinecap="round"
        points="44,138 82,112 118,124 156,96 192,112 228,88 264,102 298,76 332,94 366,82 394,70"
      />
      <polyline
        fill="none"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
        strokeLinecap="round"
        points="44,98 92,128 138,86 176,112 218,72 256,100 296,78 332,108 370,88 394,98"
      />
      {[
        [78, 92],
        [148, 78],
        [218, 68],
        [286, 58],
        [354, 54],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.4" fill="rgba(255,255,255,0.9)" opacity={0.85} />
      ))}
      {barXs.map((x, i) => {
        const h = barHeights[i] ?? 12;
        const bw = Math.max(2.2, step * 0.55);
        return (
          <rect
            key={i}
            x={x}
            y={baseY - h}
            width={bw}
            height={h}
            fill="url(#todosInsightBar)"
            rx={0.35}
            opacity={0.88}
          />
        );
      })}
    </svg>
  );
}
