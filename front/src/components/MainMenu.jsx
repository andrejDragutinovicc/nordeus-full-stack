function MainMenu({ onStart, loading }) {
  return (
    <section className="main-menu">
      {/* Mario forest path scene */}
      <svg className="menu-scene" viewBox="0 0 800 230" xmlns="http://www.w3.org/2000/svg">
        {/* Sky */}
        <rect x="0" y="0" width="800" height="230" fill="#5C94FC" />

        {/* Clouds */}
        <g fill="white" opacity="0.95">
          <ellipse cx="105" cy="42" rx="48" ry="26" />
          <ellipse cx="78"  cy="55" rx="34" ry="21" />
          <ellipse cx="132" cy="55" rx="34" ry="21" />

          <ellipse cx="460" cy="32" rx="58" ry="30" />
          <ellipse cx="428" cy="48" rx="40" ry="24" />
          <ellipse cx="492" cy="48" rx="40" ry="24" />

          <ellipse cx="695" cy="48" rx="44" ry="24" />
          <ellipse cx="670" cy="62" rx="31" ry="19" />
          <ellipse cx="720" cy="62" rx="31" ry="19" />
        </g>

        {/* Far hills */}
        <ellipse cx="180" cy="195" rx="210" ry="72" fill="#52A829" opacity="0.65" />
        <ellipse cx="620" cy="200" rx="230" ry="68" fill="#52A829" opacity="0.55" />

        {/* Forest trees - LEFT side */}
        {/* Tree 1 large */}
        <rect x="18"  y="138" width="20" height="62" fill="#5A3000" />
        <ellipse cx="28"  cy="124" rx="32" ry="28" fill="#1A6000" />
        <ellipse cx="28"  cy="108" rx="23" ry="21" fill="#2A8A00" />

        {/* Tree 2 */}
        <rect x="68"  y="152" width="15" height="48" fill="#5A3000" />
        <ellipse cx="75"  cy="140" rx="25" ry="22" fill="#1A6000" />
        <ellipse cx="75"  cy="126" rx="18" ry="16" fill="#2A8A00" />

        {/* Tree 3 small */}
        <rect x="110" y="162" width="12" height="38" fill="#5A3000" />
        <ellipse cx="116" cy="152" rx="20" ry="18" fill="#1A6000" />
        <ellipse cx="116" cy="140" rx="14" ry="13" fill="#2A8A00" />

        {/* Forest trees - RIGHT side */}
        <rect x="730" y="138" width="20" height="62" fill="#5A3000" />
        <ellipse cx="740" cy="124" rx="32" ry="28" fill="#1A6000" />
        <ellipse cx="740" cy="108" rx="23" ry="21" fill="#2A8A00" />

        <rect x="683" y="150" width="15" height="50" fill="#5A3000" />
        <ellipse cx="690" cy="138" rx="25" ry="22" fill="#1A6000" />
        <ellipse cx="690" cy="124" rx="18" ry="16" fill="#2A8A00" />

        <rect x="645" y="160" width="12" height="40" fill="#5A3000" />
        <ellipse cx="651" cy="150" rx="20" ry="18" fill="#1A6000" />
        <ellipse cx="651" cy="138" rx="14" ry="13" fill="#2A8A00" />

        {/* Dirt path - perspective, wider near bottom */}
        <polygon points="320,200 480,200 448,148 352,148" fill="#C2956B" />
        {/* Path stones */}
        <ellipse cx="370" cy="188" rx="12" ry="5" fill="#A07848" opacity="0.6" />
        <ellipse cx="410" cy="178" rx="10" ry="4" fill="#A07848" opacity="0.6" />
        <ellipse cx="390" cy="167" rx="8"  ry="3" fill="#A07848" opacity="0.5" />
        {/* Path grass edges */}
        <polygon points="318,200 330,200 356,148 348,148" fill="#52A829" />
        <polygon points="470,200 482,200 452,148 444,148" fill="#52A829" />

        {/* Mushroom LEFT of path */}
        <rect x="290" y="182" width="9" height="18" fill="#E8D0A0" />
        <ellipse cx="294" cy="180" rx="16" ry="11" fill="#D82800" />
        <ellipse cx="285" cy="179" rx="4" ry="3" fill="white" opacity="0.9" />
        <ellipse cx="302" cy="177" rx="4" ry="3" fill="white" opacity="0.9" />

        {/* Mushroom RIGHT of path */}
        <rect x="500" y="178" width="9" height="22" fill="#E8D0A0" />
        <ellipse cx="504" cy="176" rx="16" ry="11" fill="#D82800" />
        <ellipse cx="496" cy="175" rx="4" ry="3" fill="white" opacity="0.9" />
        <ellipse cx="512" cy="173" rx="4" ry="3" fill="white" opacity="0.9" />

        {/* Coins above path */}
        <circle cx="368" cy="128" r="9" fill="#F8D800" stroke="#C88800" strokeWidth="1.5" />
        <circle cx="395" cy="120" r="9" fill="#F8D800" stroke="#C88800" strokeWidth="1.5" />
        <circle cx="422" cy="128" r="9" fill="#F8D800" stroke="#C88800" strokeWidth="1.5" />

        {/* ? block */}
        <rect x="375" y="92" width="30" height="30" rx="4" fill="#E8A800" stroke="#181018" strokeWidth="2" />
        <text x="390" y="113" textAnchor="middle" fontSize="18" fill="#181018" fontFamily="serif" fontWeight="bold">?</text>

        {/* Ground */}
        <rect x="0" y="200" width="800" height="30" fill="#52A829" />
        <rect x="0" y="215" width="800" height="15" fill="#8B4513" />
        {/* Brick lines on ground */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(i => (
          <rect key={i} x={i * 40} y="215" width="38" height="7" fill="none" stroke="#6B3000" strokeWidth="0.6" opacity="0.4" />
        ))}
      </svg>

      <div className="menu-body">
        <div className="menu-title">🍄 RPG Gauntlet 🍄</div>
        <p className="menu-subtitle">Defeat 5 enemies and rescue the kingdom!</p>
        <button className="primary-button" onClick={onStart} disabled={loading}>
          {loading ? '⏳ Loading...' : '▶ START GAME'}
        </button>
        <p className="hint-text">
          Backend required at <strong>http://localhost:8080</strong>
        </p>
      </div>
    </section>
  );
}

export default MainMenu;
