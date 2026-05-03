import { useEffect, useState } from 'react';
import MoveButton from './MoveButton.jsx';
import BattleLog from './BattleLog.jsx';
import HealthBar from './HealthBar.jsx';
import XpBar from './XpBar.jsx';
import { getMonsterImage, HERO_IMAGE } from '../utils/monsterImages.js';

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
  return '👾';
}

function CharacterImage({ src, alt, fallback }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return <span className="combatant-avatar-fallback">{fallback}</span>;
  }
  return <img src={src} alt={alt} onError={() => setError(true)} />;
}

function DamageNumbers({ numbers, target }) {
  return (
    <>
      {numbers
        .filter((n) => n.target === target)
        .map((n) => (
          <div
            key={n.id}
            className={`damage-text type-${n.type}`}
            style={{ left: `${n.x}%`, top: '20%' }}
          >
            {n.type === 'damage' ? `-${n.value}` : `+${n.value}`}
          </div>
        ))}
    </>
  );
}

// ── Side-view forest arena background ────────────────────────────────────────
// Static SVG — never animates, never moves.
function ArenaBg() {
  // Cobble joint x-positions along the path
  const cobbleJoints = [45, 90, 140, 188, 238, 285, 335, 382, 430, 478, 528, 576, 624, 672, 720, 768];
  // Grass tuft x-positions along the ground edge
  const grassTufts   = [18, 72, 130, 192, 255, 318, 382, 448, 515, 580, 645, 710, 770];
  // Mid-distance tree trunk positions (always visible even with slice cropping)
  const midTrunks    = [
    { x: 70,  y: 55, w: 34, h: 230 },
    { x: 180, y: 70, w: 26, h: 215 },
    { x: 620, y: 60, w: 30, h: 225 },
    { x: 720, y: 50, w: 36, h: 235 },
  ];

  return (
    <svg
      viewBox="0 0 800 280"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        {/* Sky-to-canopy gradient */}
        <linearGradient id="bsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#040b03" />
          <stop offset="42%"  stopColor="#0d2208" />
          <stop offset="78%"  stopColor="#152e0a" />
          <stop offset="100%" stopColor="#1a380c" />
        </linearGradient>
        {/* Ground plane gradient */}
        <linearGradient id="bsGnd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2a5018" />
          <stop offset="55%"  stopColor="#1c3c0c" />
          <stop offset="100%" stopColor="#0e2006" />
        </linearGradient>
        {/* Atmospheric mist near ground */}
        <linearGradient id="bsMist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(50,90,30,0)"    />
          <stop offset="100%" stopColor="rgba(30,60,15,0.28)" />
        </linearGradient>
        {/* Edge vignette */}
        <radialGradient id="bsVig" cx="50%" cy="50%" r="72%">
          <stop offset="48%"  stopColor="rgba(0,0,0,0)"   />
          <stop offset="100%" stopColor="rgba(0,0,0,0.62)" />
        </radialGradient>
      </defs>

      {/* ── Sky ── */}
      <rect x="0" y="0" width="800" height="280" fill="url(#bsSky)" />

      {/* ── Distant tree canopy — back layer (lighter, bluer) ── */}
      <path
        d="M0 125 Q22 100 44 118 Q66 88 88 112 Q112 78 136 106
           Q160 82 186 106 Q210 68 234 98 Q258 76 284 100
           Q310 62 334 94 Q358 72 384 98 Q410 58 434 90
           Q458 70 484 94 Q510 58 534 88 Q558 70 584 94
           Q610 56 634 88 Q658 68 684 92 Q710 58 734 88
           Q758 68 784 90 L800 92 L800 280 L0 280 Z"
        fill="#0b1c07"
        opacity="0.65"
      />

      {/* ── Mid tree canopy — closer layer (darker) ── */}
      <path
        d="M0 162 Q14 145 28 158 Q48 132 68 152 Q90 128 112 150
           Q136 134 158 154 Q180 122 204 148 Q228 130 252 152
           Q278 116 304 146 Q328 128 352 150 Q378 114 404 144
           Q428 126 452 148 Q478 112 504 144 Q528 126 552 148
           Q578 114 604 144 Q628 126 652 148 Q678 112 704 144
           Q728 126 752 148 Q778 114 800 142 L800 280 L0 280 Z"
        fill="#070f05"
        opacity="0.88"
      />

      {/* ── Mid-distance tree trunks ── */}
      {midTrunks.map((t, i) => (
        <g key={`trunk-${i}`}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} fill="#030a02" rx="3" opacity="0.9" />
          {/* Bark highlight strip */}
          <rect x={t.x + 3} y={t.y} width={Math.max(3, t.w * 0.2)} height={t.h} fill="#0a1808" opacity="0.5" rx="2" />
        </g>
      ))}

      {/* ── Ground plane ── */}
      <rect x="0" y="215" width="800" height="65" fill="url(#bsGnd)" />

      {/* ── Grass edge strip ── */}
      <rect x="0" y="215" width="800" height="18" fill="#285a16" opacity="0.9" />

      {/* ── Grass tufts on the edge ── */}
      {grassTufts.map((x, i) => (
        <g key={`gt-${i}`} stroke="#3a8020" strokeWidth="1.5" strokeLinecap="round">
          <line x1={x - 4} y1="215" x2={x - 7} y2="202" />
          <line x1={x}     y1="215" x2={x}     y2="199" />
          <line x1={x + 4} y1="215" x2={x + 7} y2="202" />
        </g>
      ))}

      {/* ── Stone cobble path ── */}
      <rect x="0" y="233" width="800" height="47" fill="#6a5430" />
      {/* Path shading layer */}
      <rect x="0" y="233" width="800" height="47" fill="#3a2810" opacity="0.28" />
      {/* Center highlight */}
      <rect x="0" y="233" width="800" height="5"  fill="#8a7248" opacity="0.48" />
      {/* Horizontal mortar line */}
      <line x1="0" y1="254" x2="800" y2="254" stroke="#2a1c08" strokeWidth="1.5" opacity="0.38" />
      {/* Vertical cobble joints */}
      {cobbleJoints.map((x, i) => (
        <line key={`cj-${i}`} x1={x} y1="233" x2={x + 7} y2="280"
          stroke="#2a1c08" strokeWidth="1.8" opacity="0.42" />
      ))}

      {/* ── Atmospheric mist (near ground) ── */}
      <rect x="0" y="178" width="800" height="85" fill="url(#bsMist)" />

      {/* ── Readability overlay (slightly darkens background for text/UI legibility) ── */}
      <rect x="0" y="0" width="800" height="280" fill="rgba(0,6,0,0.2)" />

      {/* ── Edge vignette ── */}
      <rect x="0" y="0" width="800" height="280" fill="url(#bsVig)" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

function BattleScreen({
  battleState,
  heroMoves,
  heroEquippedMoves = [],
  learnedMove,
  levelUpEvent,
  onMove,
  disabled,
  loading,
  battleLog,
  result,
  onContinue,
  error,
  animState = {},
  floatingNumbers = [],
}) {
  const { heroAttacking, monsterAttacking, heroHit, monsterHit } = animState;

  // Keyboard shortcuts: 1–N for regular moves, N+1 onwards for equipped moves
  useEffect(() => {
    const handleKey = (e) => {
      if (disabled || result) return;
      const index = parseInt(e.key, 10) - 1;
      if (index >= 0 && index < heroMoves.length) {
        onMove(heroMoves[index]);
      } else if (index >= heroMoves.length && index < heroMoves.length + heroEquippedMoves.length) {
        onMove(heroEquippedMoves[index - heroMoves.length]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [disabled, result, heroMoves, heroEquippedMoves, onMove]);

  // Animation classes apply ONLY to the character figure — never to the card or stats
  const heroFigureClass = [
    'character-figure',
    heroAttacking ? 'char-attack-right' : '',
    heroHit       ? 'char-hit'          : '',
  ].filter(Boolean).join(' ');

  const monsterFigureClass = [
    'character-figure',
    monsterAttacking ? 'char-attack-left' : '',
    monsterHit       ? 'char-hit'         : '',
  ].filter(Boolean).join(' ');

  const statusText = loading
    ? '⌛ Enemy is thinking...'
    : result
    ? result === 'Victory'
      ? '🏆 You are victorious!'
      : '💀 You have fallen...'
    : `${battleState.monster.name} awaits your move.`;

  return (
    <section className="screen-panel battle-screen">

      {/* ── Header (static UI) ── */}
      <div className="battle-header">
        <h2>Battle</h2>
        <div className="battle-status">{statusText}</div>
      </div>

      {/* ── Arena ── */}
      <div className="battle-arena">

        {/* LAYER 1 — Scene: background + character figures */}
        <div className="battle-scene">

          {/* Background (static, never receives any animation) */}
          <div className="battle-bg" aria-hidden="true">
            <ArenaBg />
          </div>

          {/* Level-up banner (shown briefly mid-turn, centered over the scene) */}
          {levelUpEvent && (
            <div className="levelup-banner">
              <div className="levelup-level">LEVEL {levelUpEvent.newLevel}</div>
              <div className="levelup-title">Level Up!</div>
              {levelUpEvent.hpIncrease > 0 && (
                <div className="levelup-stat">+{levelUpEvent.hpIncrease} Max HP</div>
              )}
            </div>
          )}

          {/* Characters layer (absolutely fills scene) */}
          <div className="arena-combatants">

            {/* HERO — LEFT */}
            <div className="arena-slot slot-hero">
              <div className="character-stand">
                {/* ↓ ONLY this element animates */}
                <div className={heroFigureClass}>
                  <CharacterImage src={HERO_IMAGE} alt="Hero" fallback="⚔️" />
                </div>
                <div className="character-shadow-disc" />
                <div className="damage-layer">
                  <DamageNumbers numbers={floatingNumbers} target="hero" />
                </div>
              </div>
            </div>

            {/* MONSTER — RIGHT */}
            <div className="arena-slot slot-monster">
              <div className="character-stand">
                {/* ↓ ONLY this element animates */}
                <div className={monsterFigureClass}>
                  <CharacterImage
                    src={getMonsterImage(battleState.monster.id)}
                    alt={battleState.monster.name}
                    fallback={getMonsterIcon(battleState.monster.type, battleState.monster.name)}
                  />
                </div>
                <div className="character-shadow-disc" />
                <div className="damage-layer">
                  <DamageNumbers numbers={floatingNumbers} target="monster" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 2 — Stats row (static, never animates) */}
        <div className="battle-stats-row">
          <div className="combatant-stats stats-hero">
            <div className="combatant-label">Hero</div>
            <div className="combatant-name">{battleState.hero.name}</div>
            <HealthBar
              currentHp={battleState.hero.currentHp}
              maxHp={battleState.hero.hp}
              variant="hero"
            />
            {battleState.hero.stats?.lvlUpXp != null && (
              <XpBar
                currentXp={battleState.hero.xp ?? 0}
                lvlUpXp={battleState.hero.stats.lvlUpXp}
              />
            )}
          </div>
          <div className="combatant-stats stats-monster">
            <div className="combatant-label">Monster</div>
            <div className="combatant-name">{battleState.monster.name}</div>
            <HealthBar
              currentHp={battleState.monster.currentHp}
              maxHp={battleState.monster.hp}
              variant="monster"
            />
          </div>
        </div>
      </div>

      {/* ── Move buttons ── */}
      <div className="moves-section">
        <div className="moves-label">Choose Your Move</div>
        <div className="moves-grid">
          {heroMoves.map((move, i) => (
            <MoveButton
              key={move}
              move={move}
              onClick={onMove}
              disabled={disabled || !!result}
              keyBinding={i + 1}
            />
          ))}
        </div>

        {heroEquippedMoves.length > 0 && (
          <>
            <div className="moves-separator">
              <span>Learned Abilities</span>
            </div>
            <div className="moves-grid">
              {heroEquippedMoves.map((move, i) => (
                <MoveButton
                  key={move}
                  move={move}
                  onClick={onMove}
                  disabled={disabled || !!result}
                  keyBinding={heroMoves.length + i + 1}
                  equipped
                />
              ))}
            </div>
          </>
        )}

        {loading && <div className="turn-loading">Enemy is thinking...</div>}
        {error   && <div className="error-note">{error}</div>}
      </div>

      {/* ── Battle log ── */}
      <BattleLog entries={battleLog} />

      {/* ── Victory / Defeat overlay ── */}
      {result && (
        <div className="battle-result-overlay">
          <div className="result-emoji">
            {result === 'Victory' ? '🏆' : '💀'}
          </div>
          <div className={`result-title ${result === 'Victory' ? 'victory' : 'defeat'}`}>
            {result === 'Victory' ? 'Victory!' : 'Defeat!'}
          </div>
          {result === 'Victory' && learnedMove && (
            <div className="learned-move-banner">
              <span className="learned-move-icon">✨</span>
              <span className="learned-move-label">You learned</span>
              <span className="learned-move-name">{learnedMove}</span>
            </div>
          )}
          <button className="primary-button" onClick={onContinue}>
            Return to Map
          </button>
        </div>
      )}
    </section>
  );
}

export default BattleScreen;
