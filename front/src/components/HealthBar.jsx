function HealthBar({ currentHp, maxHp, variant = 'hero' }) {
  const pct = maxHp > 0 ? Math.max(0, Math.min(100, (currentHp / maxHp) * 100)) : 0;
  const isLow = pct < 25;

  return (
    <div className="health-bar-wrapper">
      <div className="health-bar-meta">
        <span>HP</span>
        <span>{currentHp} / {maxHp}</span>
      </div>
      <div className="health-bar-track">
        <div
          className={`health-bar-fill fill-${variant} ${isLow ? 'fill-low' : ''}`}
          style={{ width: `${pct}%` }}
        />
        <div className="health-bar-text">{Math.round(pct)}%</div>
      </div>
    </div>
  );
}

export default HealthBar;
