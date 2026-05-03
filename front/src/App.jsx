import { useEffect, useMemo, useState } from 'react';
import { startGame, playTurn } from './api/gameApi.js';
import { getBattleStatus, mapApiState, normalizeBattleState, formatBattleLogStep } from './utils/gameHelpers.js';
import MainMenu from './components/MainMenu.jsx';
import MapScreen from './components/MapScreen.jsx';
import BattleScreen from './components/BattleScreen.jsx';

const initialState = {
  hero: null,
  monsters: [],
  currentMonsterIndex: 0,
  currentBattleState: null,
  battleLog: [],
  screen: 'menu',
  loading: false,
  error: '',
  battleResult: null,
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const ANIM_RESET = { heroAttacking: false, monsterAttacking: false, heroHit: false, monsterHit: false };

function App() {
  const [hero, setHero] = useState(initialState.hero);
  const [monsters, setMonsters] = useState(initialState.monsters);
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(initialState.currentMonsterIndex);
  const [currentBattleState, setCurrentBattleState] = useState(initialState.currentBattleState);
  const [battleLog, setBattleLog] = useState(initialState.battleLog);
  const [screen, setScreen] = useState(initialState.screen);
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [battleResult, setBattleResult] = useState(initialState.battleResult);
  const [animState, setAnimState] = useState(ANIM_RESET);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [learnedMove, setLearnedMove] = useState(null);
  const [levelUpEvent, setLevelUpEvent] = useState(null);

  const currentMonster = useMemo(() => monsters[currentMonsterIndex] || null, [monsters, currentMonsterIndex]);

  useEffect(() => {
    if (!hero || !monsters.length) return;
    if (screen === 'battle' && currentBattleState) {
      const status = getBattleStatus(currentBattleState);
      if (status === 'hero-dead') setBattleResult('Defeat');
      if (status === 'monster-dead') setBattleResult('Victory');
    }
  }, [currentBattleState, hero, monsters, screen]);

  const addDamageNumber = (target, value, type) => {
    const id = `${Date.now()}-${Math.random()}`;
    const x = 22 + Math.floor(Math.random() * 45);
    setFloatingNumbers((prev) => [...prev, { id, target, value, type, x }]);
    setTimeout(() => {
      setFloatingNumbers((prev) => prev.filter((n) => n.id !== id));
    }, 1400);
  };

  const startRun = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await startGame();
      const mapped = mapApiState(data.hero, data.monsters);
      setHero(mapped.hero);
      setMonsters(mapped.monsters);
      setCurrentMonsterIndex(0);
      setCurrentBattleState(null);
      setBattleLog([]);
      setBattleResult(null);
      setScreen('map');
    } catch (err) {
      setError('Unable to start run. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const restartRun = () => {
    setHero(initialState.hero);
    setMonsters(initialState.monsters);
    setCurrentMonsterIndex(initialState.currentMonsterIndex);
    setCurrentBattleState(initialState.currentBattleState);
    setBattleLog(initialState.battleLog);
    setScreen('menu');
    setBattleResult(initialState.battleResult);
    setError('');
    setAnimState(ANIM_RESET);
    setFloatingNumbers([]);
    setLearnedMove(null);
    setLevelUpEvent(null);
  };

  const enterBattle = (monsterIndex) => {
    if (!hero || !monsters[monsterIndex]) return;
    if (monsterIndex !== currentMonsterIndex) return;
    const monster = monsters[monsterIndex];
    setCurrentBattleState({ hero: { ...hero }, monster: { ...monster } });
    setBattleLog([]);
    setBattleResult(null);
    setAnimState(ANIM_RESET);
    setFloatingNumbers([]);
    setScreen('battle');
  };

  const handleMove = async (moveName) => {
    if (!currentBattleState || battleResult || loading) return;
    setError('');
    setLoading(true);
    setAnimState((s) => ({ ...s, heroAttacking: true }));

    try {
      const response = await playTurn(currentBattleState, moveName);
      const nextBattleState = normalizeBattleState(response.battleState);
      const newEntries = (response.battleSteps || []).map(formatBattleLogStep);
      const status = getBattleStatus(nextBattleState);

      const heroName = currentBattleState.hero.name;
      const monsterName = currentBattleState.monster.name;
      const steps = response.battleSteps || [];

      const damageToMonster = steps
        .filter((s) => s.applyTo === monsterName && s.effect === 'DAMAGE')
        .reduce((sum, s) => sum + s.value, 0);

      const damageToHero = steps
        .filter((s) => s.applyTo === heroName && s.effect === 'DAMAGE')
        .reduce((sum, s) => sum + s.value, 0);

      const healToHero = steps
        .filter((s) => s.applyTo === heroName && s.effect === 'HEAL')
        .reduce((sum, s) => sum + s.value, 0);

      // Hero attack animation complete → monster gets hit
      await delay(320);
      setAnimState((s) => ({ ...s, heroAttacking: false, monsterHit: true }));
      if (damageToMonster > 0) addDamageNumber('monster', damageToMonster, 'damage');

      await delay(480);
      setAnimState((s) => ({ ...s, monsterHit: false }));

      // Level-up notification (show briefly between hero attack and monster counter)
      if (response.lvlUp && response.lvlUp !== 0) {
        const hpIncrease = (nextBattleState.hero.currentHp + damageToHero) - currentBattleState.hero.currentHp;
        setLevelUpEvent({ newLevel: response.lvlUp, hpIncrease: Math.max(0, hpIncrease) });
        await delay(1600);
        setLevelUpEvent(null);
        await delay(300);
      }

      // Monster counter-attack (only if battle is still ongoing)
      if (status === 'ongoing') {
        if (damageToHero > 0) {
          await delay(260);
          setAnimState((s) => ({ ...s, monsterAttacking: true }));
          await delay(340);
          setAnimState((s) => ({ ...s, monsterAttacking: false, heroHit: true }));
          addDamageNumber('hero', damageToHero, 'damage');
          await delay(480);
          setAnimState((s) => ({ ...s, heroHit: false }));
        }
        if (healToHero > 0) {
          addDamageNumber('hero', healToHero, 'heal');
        }
      }

      // State updates after all animations
      setCurrentBattleState(nextBattleState);
      setBattleLog((prev) => [...prev, ...newEntries]);

      if (status === 'hero-dead') {
        setHero((prev) => prev && { ...prev, currentHp: nextBattleState.hero.currentHp });
      }
      if (status === 'monster-dead') {
        setMonsters((prev) =>
          prev.map((m, i) =>
            i === currentMonsterIndex ? { ...m, currentHp: 0, defeated: true } : m
          )
        );
        setHero((prev) => prev && {
          ...prev,
          ...nextBattleState.hero,
          currentHp: nextBattleState.hero.hp,
        });
        if (response.equippedMove) {
          setLearnedMove(response.equippedMove);
        }
      }
    } catch (err) {
      setError('Action failed. Try again.');
      console.error(err);
      setAnimState(ANIM_RESET);
    } finally {
      setLoading(false);
    }
  };

  const finishBattle = () => {
    if (!hero) return;
    if (battleResult === 'Victory') {
      setCurrentMonsterIndex((prev) => Math.min(prev + 1, monsters.length - 1));
    }
    setScreen('map');
    setBattleResult(null);
    setCurrentBattleState(null);
    setAnimState(ANIM_RESET);
    setFloatingNumbers([]);
    setLearnedMove(null);
    setLevelUpEvent(null);
  };

  const heroProps = hero ? { ...hero } : null;

  return (
    <div className="app-shell">
      <header className="page-header">
        <h1>⚔ RPG Gauntlet ⚔</h1>
      </header>
      <main className="content-area">
        {screen === 'menu' && <MainMenu onStart={startRun} loading={loading} />}
        {screen === 'map' && (
          <MapScreen
            hero={heroProps}
            monsters={monsters}
            currentMonsterIndex={currentMonsterIndex}
            onSelectMonster={enterBattle}
            loading={loading}
            onRestart={restartRun}
          />
        )}
        {screen === 'battle' && currentBattleState && (
          <BattleScreen
            battleState={currentBattleState}
            heroMoves={heroProps?.moves || []}
            heroEquippedMoves={heroProps?.equippedMoves || []}
            learnedMove={learnedMove}
            levelUpEvent={levelUpEvent}
            onMove={handleMove}
            disabled={loading}
            loading={loading}
            battleLog={battleLog}
            result={battleResult}
            onContinue={finishBattle}
            error={error}
            animState={animState}
            floatingNumbers={floatingNumbers}
          />
        )}
        {error && screen !== 'battle' && <div className="error-banner">{error}</div>}
      </main>
      <footer className="page-footer">Powered by React + Vite</footer>
    </div>
  );
}

export default App;
