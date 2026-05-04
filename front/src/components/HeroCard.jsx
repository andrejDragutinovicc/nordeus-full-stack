import { useState } from 'react';
import HealthBar from './HealthBar.jsx';
import XpBar from './XpBar.jsx';
import { HERO_IMAGE } from '../utils/monsterImages.js';

function HeroCard({ hero }) {
  const [imgError, setImgError] = useState(false);
  if (!hero) return null;

  return (
    <div className="hero-panel-map">
      <div className="hero-panel-map-title">Your Hero</div>
      <div className="hero-info-row">
        <div className="hero-avatar-icon">
          {!imgError ? (
            <img src={HERO_IMAGE} alt="Hero" onError={() => setImgError(true)} />
          ) : (
            <span>⚔️</span>
          )}
        </div>
        <div>
          <div className="hero-name">{hero.name}</div>
          <div className="hero-subtext">Level {hero.level} · XP {hero.xp}</div>
        </div>
      </div>
      <HealthBar currentHp={hero.currentHp} maxHp={hero.hp} variant="hero" />
      {hero.stats?.lvlUpXp != null && (
        <XpBar currentXp={hero.xp ?? 0} lvlUpXp={hero.stats.lvlUpXp} maxLevel={hero.level >= 4} />
      )}
    </div>
  );
}

export default HeroCard;
