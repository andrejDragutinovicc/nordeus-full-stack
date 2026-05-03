import HeroCard from './HeroCard.jsx';
import { getMonsterImage } from '../utils/monsterImages.js';

// Horizontal node positions: left → right, varying Y for natural feel
// Boss node (index 4) is slightly larger
const NODE_POSITIONS = [
  { x: 120, y: 200, r: 38 },
  { x: 305, y: 132, r: 38 },
  { x: 500, y: 182, r: 38 },
  { x: 695, y: 122, r: 38 },
  { x: 880, y: 192, r: 42 },
];

// Build a smooth cubic-bezier path segment between two nodes
// Control points are horizontal tangents at each node, creating an S-curve
function buildPathD(a, b) {
  const dx = (b.x - a.x) * 0.4;
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`;
}

function getMonsterIcon(type, name) {
  const t = (type || '').toLowerCase();
  const n = (name || '').toLowerCase();
  if (t.includes('dragon') || n.includes('dragon')) return '🐉';
  if (t.includes('wolf')   || n.includes('wolf'))   return '🐺';
  if (t.includes('spider') || n.includes('spider')) return '🕷️';
  if (t.includes('goblin') || n.includes('goblin')) return '👺';
  if (t.includes('troll')  || n.includes('troll'))  return '👹';
  if (t.includes('orc')    || n.includes('orc'))    return '👹';
  if (t.includes('skeleton') || n.includes('skeleton')) return '💀';
  if (t.includes('zombie') || n.includes('zombie')) return '🧟';
  if (t.includes('witch')  || n.includes('witch'))  return '🧙';
  if (t.includes('slime')  || n.includes('slime'))  return '🟢';
  return '👾';
}

// ── Static decorative elements ──────────────────────────────────────────────

const TREES = [
  { cx: 28,  cy: 90,  r: 48 },
  { cx: 14,  cy: 58,  r: 30 },
  { cx: 62,  cy: 68,  r: 22 },
  { cx: 972, cy: 88,  r: 52 },
  { cx: 990, cy: 56,  r: 32 },
  { cx: 938, cy: 65,  r: 24 },
];

const ROCKS = [
  { cx: 62,  cy: 260, rx: 15, ry: 9,  fill: '#5a5245' },
  { cx: 87,  cy: 254, rx: 10, ry: 6,  fill: '#6a6258' },
  { cx: 72,  cy: 265, rx: 6,  ry: 4,  fill: '#4a4438' },
  { cx: 208, cy: 222, rx: 12, ry: 7,  fill: '#524a3e' },
  { cx: 225, cy: 228, rx: 7,  ry: 4,  fill: '#625a4e' },
  { cx: 400, cy: 262, rx: 16, ry: 9,  fill: '#5a5245' },
  { cx: 424, cy: 256, rx: 9,  ry: 5,  fill: '#6a6258' },
  { cx: 613, cy: 244, rx: 13, ry: 8,  fill: '#524a3e' },
  { cx: 632, cy: 250, rx: 8,  ry: 5,  fill: '#6a6258' },
  { cx: 804, cy: 258, rx: 14, ry: 8,  fill: '#5a5245' },
  { cx: 824, cy: 263, rx: 8,  ry: 5,  fill: '#4a4438' },
  { cx: 957, cy: 262, rx: 11, ry: 7,  fill: '#6a6258' },
];

const FLOWERS = [
  { cx: 152, cy: 250, r: 4, color: '#f8e840' },
  { cx: 162, cy: 244, r: 3, color: '#ffa820' },
  { cx: 332, cy: 238, r: 4, color: '#ff8aaa' },
  { cx: 342, cy: 244, r: 3, color: '#ffaacc' },
  { cx: 540, cy: 255, r: 4, color: '#f8e840' },
  { cx: 555, cy: 248, r: 3, color: '#ffa820' },
  { cx: 738, cy: 242, r: 4, color: '#aaddff' },
  { cx: 750, cy: 248, r: 3, color: '#88bbff' },
  { cx: 918, cy: 252, r: 4, color: '#ff8aaa' },
  { cx: 930, cy: 246, r: 3, color: '#ffaacc' },
];

const GRASS_TUFTS = [
  { x: 28,  y: 300 }, { x: 55,  y: 294 },
  { x: 108, y: 292 }, { x: 175, y: 298 },
  { x: 235, y: 290 }, { x: 310, y: 296 },
  { x: 382, y: 300 }, { x: 450, y: 292 },
  { x: 490, y: 298 }, { x: 558, y: 290 },
  { x: 618, y: 296 }, { x: 685, y: 300 },
  { x: 720, y: 292 }, { x: 795, y: 298 },
  { x: 844, y: 290 }, { x: 900, y: 296 },
  { x: 962, y: 300 }, { x: 985, y: 292 },
];

// ── Component ────────────────────────────────────────────────────────────────

function MapScreen({ hero, monsters, currentMonsterIndex, onSelectMonster, loading, onRestart }) {
  const activeNodes = NODE_POSITIONS.slice(0, monsters.length);

  return (
    <section className="screen-panel map-screen">
      <div className="map-header">
        <div>
          <h2>Run Map</h2>
          <p>Choose your next encounter.</p>
        </div>
        <button className="secondary-button" onClick={onRestart} disabled={loading}>
          Abandon Run
        </button>
      </div>

      <div className="map-path-container">
        <svg
          viewBox="0 0 1000 350"
          className="map-svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Sky-to-forest background gradient */}
            <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#071408" />
              <stop offset="35%"  stopColor="#12300a" />
              <stop offset="70%"  stopColor="#1a4210" />
              <stop offset="100%" stopColor="#0e2808" />
            </linearGradient>

            {/* Ground plane gradient */}
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1e4a12" stopOpacity="0" />
              <stop offset="100%" stopColor="#0a1e06" stopOpacity="1" />
            </linearGradient>

            {/* Radial vignette at edges */}
            <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
              <stop offset="55%"  stopColor="rgba(0,0,0,0)"   />
              <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
            </radialGradient>

            {/* Active node golden glow */}
            <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft drop shadow for all nodes */}
            <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(0,0,0,0.7)" />
            </filter>

            {/* Greyscale + dim for defeated nodes */}
            <filter id="defeatedFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feColorMatrix type="saturate" values="0.15" result="grey" />
              <feComponentTransfer in="grey">
                <feFuncR type="linear" slope="0.55" />
                <feFuncG type="linear" slope="0.55" />
                <feFuncB type="linear" slope="0.55" />
              </feComponentTransfer>
            </filter>

            {/* Clip circles for monster images */}
            {NODE_POSITIONS.map((node, i) => (
              <clipPath key={`clip-${i}`} id={`node-img-clip-${i}`}>
                <circle cx={node.x} cy={node.y} r={node.r - 2} />
              </clipPath>
            ))}
          </defs>

          {/* ── BACKGROUND ── */}
          <rect x="0" y="0" width="1000" height="350" fill="url(#mapBg)" />
          <rect x="0" y="240" width="1000" height="110" fill="url(#groundGrad)" />

          {/* ── TREE SILHOUETTES ── */}
          {TREES.map((t, i) => (
            <circle key={`tree-${i}`} cx={t.cx} cy={t.cy} r={t.r}
              fill="#071208" opacity="0.9" />
          ))}
          {/* Tree trunk stubs */}
          {TREES.filter((_, i) => i % 2 === 0).map((t, i) => (
            <rect key={`trunk-${i}`}
              x={t.cx - 4} y={t.cy + t.r - 4}
              width="8" height="14"
              fill="#2a1a08" opacity="0.7"
            />
          ))}

          {/* ── PATH LAYERS ── */}
          {/* 1. Deep shadow */}
          {activeNodes.slice(0, -1).map((node, i) => (
            <path key={`sh-${i}`}
              d={buildPathD(node, activeNodes[i + 1])}
              stroke="#1a0800" strokeWidth="36"
              fill="none" strokeLinecap="round"
            />
          ))}
          {/* 2. Dirt base */}
          {activeNodes.slice(0, -1).map((node, i) => (
            <path key={`dt-${i}`}
              d={buildPathD(node, activeNodes[i + 1])}
              stroke="#8a6a3a" strokeWidth="22"
              fill="none" strokeLinecap="round"
            />
          ))}
          {/* 3. Stone cobble texture (dashed overlay) */}
          {activeNodes.slice(0, -1).map((node, i) => (
            <path key={`co-${i}`}
              d={buildPathD(node, activeNodes[i + 1])}
              stroke="#6a5028" strokeWidth="22"
              strokeDasharray="10 18"
              fill="none" strokeLinecap="butt"
              opacity="0.28"
            />
          ))}
          {/* 4. Center highlight strip */}
          {activeNodes.slice(0, -1).map((node, i) => (
            <path key={`hl-${i}`}
              d={buildPathD(node, activeNodes[i + 1])}
              stroke="#b08a52" strokeWidth="6"
              fill="none" strokeLinecap="round"
              opacity="0.42"
            />
          ))}

          {/* ── DECORATIONS: ROCKS ── */}
          {ROCKS.map((rock, i) => (
            <g key={`rock-${i}`}>
              <ellipse cx={rock.cx + 2} cy={rock.cy + 3}
                rx={rock.rx} ry={rock.ry}
                fill="rgba(0,0,0,0.35)" />
              <ellipse cx={rock.cx} cy={rock.cy}
                rx={rock.rx} ry={rock.ry}
                fill={rock.fill} opacity="0.88" />
              <ellipse cx={rock.cx - rock.rx * 0.3} cy={rock.cy - rock.ry * 0.3}
                rx={rock.rx * 0.35} ry={rock.ry * 0.35}
                fill="rgba(255,255,255,0.12)" />
            </g>
          ))}

          {/* ── DECORATIONS: FLOWERS ── */}
          {FLOWERS.map((f, i) => (
            <g key={`flower-${i}`}>
              <line x1={f.cx} y1={f.cy + 3} x2={f.cx} y2={f.cy + 14}
                stroke="#4a8a22" strokeWidth="1.5" />
              <circle cx={f.cx} cy={f.cy} r={f.r + 1} fill={f.color} opacity="0.25" />
              <circle cx={f.cx} cy={f.cy} r={f.r} fill={f.color} opacity="0.95" />
            </g>
          ))}

          {/* ── DECORATIONS: GRASS TUFTS ── */}
          {GRASS_TUFTS.map((g, i) => (
            <g key={`grass-${i}`}
              stroke="#3a7820" strokeWidth="1.5" strokeLinecap="round">
              <line x1={g.x - 5} y1={g.y} x2={g.x - 9} y2={g.y - 12} />
              <line x1={g.x}     y1={g.y} x2={g.x}     y2={g.y - 15} />
              <line x1={g.x + 5} y1={g.y} x2={g.x + 9} y2={g.y - 12} />
            </g>
          ))}

          {/* ── START & BOSS MARKERS ── */}
          {monsters.length > 0 && (
            <text
              x={NODE_POSITIONS[0].x}
              y={NODE_POSITIONS[0].y - NODE_POSITIONS[0].r - 14}
              textAnchor="middle" fontSize="11"
              fontFamily="'Press Start 2P', monospace"
              fill="#4a9a2a" opacity="0.85"
              style={{ userSelect: 'none' }}
            >
              ◄ START
            </text>
          )}
          {monsters.length > 1 && (
            <>
              <text
                x={NODE_POSITIONS[monsters.length - 1].x}
                y={NODE_POSITIONS[monsters.length - 1].y - NODE_POSITIONS[monsters.length - 1].r - 26}
                textAnchor="middle" fontSize="18"
                fill="#c84b0c"
                style={{ userSelect: 'none' }}
              >
                ☠
              </text>
              <text
                x={NODE_POSITIONS[monsters.length - 1].x}
                y={NODE_POSITIONS[monsters.length - 1].y - NODE_POSITIONS[monsters.length - 1].r - 11}
                textAnchor="middle" fontSize="10"
                fontFamily="'Press Start 2P', monospace"
                fill="#c84b0c" opacity="0.85"
                style={{ userSelect: 'none' }}
              >
                BOSS
              </text>
            </>
          )}

          {/* ── VIGNETTE ── */}
          <rect x="0" y="0" width="1000" height="350" fill="url(#vignette)" />

          {/* ── MONSTER NODES ── */}
          {activeNodes.map((node, i) => {
            const monster = monsters[i];
            if (!monster) return null;

            const isDefeated = monster.defeated;
            const isActive   = i === currentMonsterIndex && !isDefeated;
            const isLocked   = !isDefeated && !isActive;
            const clickable  = isActive;

            const imgSrc     = getMonsterImage(monster.id);
            const icon       = getMonsterIcon(monster.type, monster.name);
            const labelY     = node.y + node.r + 20;
            const labelFontSize = 11;

            const borderColor = isDefeated ? '#3a4a2a'
              : isActive      ? '#f0c060'
              : '#3a2a10';
            const borderWidth = isActive ? 3.5 : 2;
            const nodeFilter  = isActive ? 'url(#nodeGlow)' : 'url(#nodeShadow)';
            const opacity     = isLocked ? 0.48 : 1;

            return (
              <g
                key={i}
                className={`map-node-group${clickable ? ' node-clickable' : ''}`}
                onClick={clickable ? () => onSelectMonster(i) : undefined}
                opacity={opacity}
              >
                {/* Pulsing outer aura ring for active node */}
                {isActive && (
                  <circle
                    cx={node.x} cy={node.y} r={node.r + 18}
                    fill="rgba(240,192,96,0.07)"
                    stroke="rgba(240,192,96,0.3)"
                    strokeWidth="2.5"
                    className="node-ring"
                  />
                )}

                {/* Cast shadow disc on ground */}
                <ellipse
                  cx={node.x} cy={node.y + node.r + 5}
                  rx={node.r * 0.82} ry={node.r * 0.22}
                  fill="rgba(0,0,0,0.55)"
                />

                {/* Main circle fill */}
                <circle
                  cx={node.x} cy={node.y} r={node.r}
                  fill={isDefeated ? '#1a2a12' : '#221608'}
                  filter={nodeFilter}
                />

                {/* Monster image or emoji/checkmark */}
                {isDefeated ? (
                  <>
                    {imgSrc && (
                      <image
                        href={imgSrc}
                        x={node.x - node.r + 2} y={node.y - node.r + 2}
                        width={(node.r - 2) * 2} height={(node.r - 2) * 2}
                        clipPath={`url(#node-img-clip-${i})`}
                        preserveAspectRatio="xMidYMid slice"
                        filter="url(#defeatedFilter)"
                      />
                    )}
                    <text
                      x={node.x} y={node.y}
                      textAnchor="middle" dominantBaseline="central"
                      fontSize={node.r * 1.1} fontWeight="bold"
                      fill="#88c844"
                      style={{ userSelect: 'none' }}
                    >
                      ✓
                    </text>
                  </>
                ) : imgSrc ? (
                  <image
                    href={imgSrc}
                    x={node.x - node.r + 2} y={node.y - node.r + 2}
                    width={(node.r - 2) * 2} height={(node.r - 2) * 2}
                    clipPath={`url(#node-img-clip-${i})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <text
                    x={node.x} y={node.y}
                    textAnchor="middle" dominantBaseline="central"
                    fontSize={node.r * 0.85}
                    fill="#e8d5b0"
                    style={{ userSelect: 'none' }}
                  >
                    {icon}
                  </text>
                )}

                {/* Border ring drawn on top of image */}
                <circle
                  cx={node.x} cy={node.y} r={node.r}
                  fill="none"
                  stroke={borderColor}
                  strokeWidth={borderWidth}
                />

                {/* Inner rim highlight */}
                {!isDefeated && (
                  <circle
                    cx={node.x} cy={node.y} r={node.r - borderWidth - 1}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                  />
                )}

                {/* Monster name label */}
                <text
                  x={node.x} y={labelY}
                  textAnchor="middle" fontSize={labelFontSize}
                  fontFamily="Cinzel, Georgia, serif"
                  fill={isDefeated ? '#4a6030' : isActive ? '#f0c060' : '#8a7050'}
                  fontWeight={isActive ? '700' : '400'}
                  style={{ userSelect: 'none' }}
                >
                  {monster.name}
                </text>

                {/* ▶ FIGHT prompt under active node */}
                {isActive && (
                  <text
                    x={node.x} y={labelY + 17}
                    textAnchor="middle" fontSize={9}
                    fontFamily="'Press Start 2P', monospace"
                    fill="#c8a040"
                    className="fight-label"
                    style={{ userSelect: 'none' }}
                  >
                    ▶ FIGHT
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hero panel */}
      <div className="map-hero-panel">
        <HeroCard hero={hero} />
      </div>
    </section>
  );
}

export default MapScreen;
