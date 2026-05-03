const MONSTER_IMAGES = {
  1: '/monsters/monster1.png',
  2: '/monsters/monster2.png',
  3: '/monsters/monster3.jpg',
  4: '/monsters/monster4.png',
  5: '/monsters/monster5.png',
};

export const HERO_IMAGE = '/monsters/hero.png';

export function getMonsterImage(monsterId) {
  return MONSTER_IMAGES[monsterId] ?? null;
}
