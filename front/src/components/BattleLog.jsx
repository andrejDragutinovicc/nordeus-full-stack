import { useEffect, useRef } from 'react';

function BattleLog({ entries }) {
  const logRef = useRef(null);

  useEffect(() => {
    // Scroll only the log box itself — never the browser window
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries]);

  if (!entries.length) {
    return <div className="battle-log log-empty" ref={logRef}>Choose a move to begin.</div>;
  }

  const visible = entries.slice(-8);

  return (
    <div className="battle-log" ref={logRef}>
      <div className="battle-log-label">Battle Log</div>
      {visible.map((entry, i) => (
        <div key={`${entry}-${i}`} className="battle-log-entry">
          {entry}
        </div>
      ))}
    </div>
  );
}

export default BattleLog;
