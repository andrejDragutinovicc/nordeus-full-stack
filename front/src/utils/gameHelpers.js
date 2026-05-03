function normalizeCharacter(apiCharacter) {
  const currentHp = apiCharacter.currentHealth ?? apiCharacter.currentHp ?? 0;
  const maxHp = apiCharacter.stats?.health ?? apiCharacter.hp ?? 0;

  return {
    ...apiCharacter,
    currentHp,
    hp: maxHp,
    moves: apiCharacter.moves || [],
    equippedMoves: apiCharacter.equippedMoves || [],
  };
}

export function mapApiState(apiHero, apiMonsters) {
  return {
    hero: normalizeCharacter(apiHero),
    monsters: apiMonsters.map((monster, index) => ({
      ...normalizeCharacter(monster),
      defeated: monster.defeated || false,
      position: index + 1,
    })),
  };
}

export function normalizeBattleState(battleState) {
  return {
    hero: normalizeCharacter(battleState.hero),
    monster: normalizeCharacter(battleState.monster),
  };
}

export function formatBattleLogStep(step) {
  if (step.effect === 'DAMAGE') {
    return `${step.applyedBy} used ${step.moveName} and dealt ${step.value} damage to ${step.applyTo}`;
  }
  if (step.effect === 'HEAL') {
    return `${step.applyedBy} used ${step.moveName} and healed ${step.value} HP`;
  }
  return `${step.applyedBy} used ${step.moveName}`;
}

export function getBattleStatus(battleState) {
  if (!battleState) return null;
  if (battleState.hero.currentHp <= 0) return 'hero-dead';
  if (battleState.monster.currentHp <= 0) return 'monster-dead';
  return 'ongoing';
}
