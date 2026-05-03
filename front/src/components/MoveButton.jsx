function MoveButton({ move, onClick, disabled, keyBinding, equipped }) {
  return (
    <button
      className={`move-button${equipped ? ' move-equipped' : ''}`}
      onClick={() => onClick(move)}
      disabled={disabled}
    >
      <span className="move-key-badge">[{keyBinding}]</span>
      {move}
    </button>
  );
}

export default MoveButton;
