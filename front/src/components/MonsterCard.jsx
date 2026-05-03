function MonsterCard({ monster, active, locked, onClick }) {
  const hpPercent = Math.max(0, Math.min(100, (monster.currentHp / monster.hp) * 100));
  const statusLabel = monster.defeated ? 'Defeated' : locked ? 'Locked' : active ? 'Active' : 'Upcoming';

  return (
    <button
      className={`monster-card info-card ${active ? 'active-card' : ''} ${monster.defeated ? 'defeated-card' : ''}`}
      onClick={onClick}
      disabled={locked || monster.defeated}
    >
      <div className="card-title">Encounter {monster.position}</div>
      <div className="monster-row">
        <div>
          <strong>{monster.name}</strong>
          <div className="small-text">{monster.type || 'Monster'}</div>
        </div>
        <div className="status-label">{statusLabel}</div>
      </div>
      <div className="hp-label">HP {monster.currentHp}/{monster.hp}</div>
      <div className="hp-meta">{hpPercent}% of max HP</div>
      <div className="hp-bar monster-bar">
        <div className="hp-bar-fill" style={{ width: `${hpPercent}%` }} />
        <div className="hp-bar-text">{monster.currentHp}/{monster.hp}</div>
      </div>
    </button>
  );
}

export default MonsterCard;
