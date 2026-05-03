function XpBar({ currentXp, lvlUpXp }) {
  const pct = lvlUpXp > 0 ? Math.max(0, Math.min(100, (currentXp / lvlUpXp) * 100)) : 0;

  return (
    <div className="xp-bar-wrapper">
      <div className="xp-bar-meta">
        <span>XP</span>
        <span>{currentXp} / {lvlUpXp}</span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
        <div className="xp-bar-text">{Math.round(pct)}%</div>
      </div>
    </div>
  );
}

export default XpBar;
