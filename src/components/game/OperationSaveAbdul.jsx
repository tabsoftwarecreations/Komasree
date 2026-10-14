import React, { useState, useEffect, useRef, useCallback } from 'react';
import './game.css';

/**
 * Mini-Koma Avatar for Mini-Game
 */
function MiniKoma({ isInvulnerable }) {
  return (
    <div className={`koma-player ${isInvulnerable ? 'invulnerable' : ''}`}>
      <svg viewBox="0 0 40 48" width="34" height="40" aria-label="Koma Character">
        <defs>
          <linearGradient id="miniKomaDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9EBE" />
            <stop offset="100%" stopColor="#FF6B99" />
          </linearGradient>
          <linearGradient id="miniKomaHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3F2B3E" />
            <stop offset="100%" stopColor="#251624" />
          </linearGradient>
          <linearGradient id="miniKomaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4EE" />
            <stop offset="100%" stopColor="#FFE3D4" />
          </linearGradient>
        </defs>
        {/* Back Hair */}
        <path d="M10 16 C8 26 8 36 12 40 C14 34 14 26 14 18 Z" fill="url(#miniKomaHair)" />
        <path d="M30 16 C32 26 32 36 28 40 C26 34 26 26 26 18 Z" fill="url(#miniKomaHair)" />
        {/* Legs */}
        <rect x="14" y="38" width="4" height="8" rx="2" fill="#FF5C94" />
        <rect x="22" y="38" width="4" height="8" rx="2" fill="#FF5C94" />
        {/* Dress */}
        <path d="M12 26 L10 38 Q20 40 30 38 L28 26 Z" fill="url(#miniKomaDress)" />
        <circle cx="20" cy="30" r="1.5" fill="#FFFFFF" />
        <circle cx="20" cy="34" r="1.5" fill="#FFFFFF" />
        {/* Head */}
        <circle cx="20" cy="18" r="9" fill="url(#miniKomaSkin)" />
        {/* Blush */}
        <circle cx="15" cy="20" r="1.8" fill="#FF8CB8" opacity="0.7" />
        <circle cx="25" cy="20" r="1.8" fill="#FF8CB8" opacity="0.7" />
        {/* Eyes */}
        <circle cx="16" cy="17" r="1.5" fill="#3D2B4F" />
        <circle cx="24" cy="17" r="1.5" fill="#3D2B4F" />
        <circle cx="16.5" cy="16.5" r="0.6" fill="#FFFFFF" />
        <circle cx="24.5" cy="16.5" r="0.6" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M19 21 Q20 22.5 21 21" stroke="#FF5C94" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Front Hair Bangs */}
        <path d="M11 15 C13 10 27 10 29 15 C26 13 22 15 20 13 C18 15 14 13 11 15 Z" fill="url(#miniKomaHair)" />
        {/* Pink Ribbon 🎀 */}
        <circle cx="26" cy="11" r="2.5" fill="#FF4081" />
        <circle cx="26" cy="11" r="1" fill="#FFA5C6" />
      </svg>
      <div className="player-nametag">Koma 👑</div>
    </div>
  );
}

/**
 * Stylized Colleague Avatar
 */
function ColleagueAvatar({ colleague, isFound, showGreeting }) {
  return (
    <div className={`colleague-entity ${isFound ? 'found' : 'unfound'}`}>
      {/* Speech bubble when discovered or approached */}
      {showGreeting && (
        <div className="colleague-speech-bubble" role="tooltip">
          {colleague.greeting}
        </div>
      )}

      {/* Character illustration */}
      <div className="colleague-svg-box">
        <svg viewBox="0 0 40 46" width="34" height="39" aria-label={colleague.name}>
          <defs>
            <linearGradient id={`skin-${colleague.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF4EE" />
              <stop offset="100%" stopColor="#FFE0CE" />
            </linearGradient>
            <linearGradient id={`shirt-${colleague.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colleague.color} />
              <stop offset="100%" stopColor={colleague.secondaryColor} />
            </linearGradient>
          </defs>

          {/* Body/Shirt */}
          <path d="M11 26 L9 39 Q20 41 31 39 L29 26 Z" fill={`url(#shirt-${colleague.id})`} />
          <rect x="14" y="38" width="4" height="6" rx="1.5" fill="#374151" />
          <rect x="22" y="38" width="4" height="6" rx="1.5" fill="#374151" />

          {/* Head */}
          <circle cx="20" cy="18" r="9" fill={`url(#skin-${colleague.id})`} />

          {/* Distinct Hair & Features by Colleague */}
          {colleague.id === 'srujan' && (
            <>
              {/* Srujan: Smart tech hair side-swept */}
              <path d="M11 17 C11 9 29 8 30 15 C26 12 21 14 18 13 C14 14 12 15 11 17 Z" fill="#1E293B" />
              <circle cx="16" cy="17" r="1.4" fill="#1E293B" />
              <circle cx="24" cy="17" r="1.4" fill="#1E293B" />
              <circle cx="20" cy="30" r="2.5" fill="#3B82F6" />
            </>
          )}

          {colleague.id === 'prajwal' && (
            <>
              {/* Prajwal: Cool styled dark hair & sunglasses */}
              <path d="M10 16 C11 7 28 7 30 15 C26 11 22 13 18 12 C13 13 11 15 10 16 Z" fill="#111827" />
              {/* Cool shades */}
              <rect x="13" y="15" width="6" height="4" rx="1" fill="#111827" />
              <rect x="21" y="15" width="6" height="4" rx="1" fill="#111827" />
              <line x1="19" y1="17" x2="21" y2="17" stroke="#111827" strokeWidth="1" />
            </>
          )}

          {colleague.id === 'hency' && (
            <>
              {/* Hency: Soft brown side pony & cute clip */}
              <path d="M10 16 C9 8 31 8 30 16 C26 13 22 14 19 13 C14 14 12 15 10 16 Z" fill="#4B382A" />
              <path d="M29 16 C33 22 33 29 30 32 C28 28 28 20 28 16 Z" fill="#4B382A" />
              <circle cx="28" cy="16" r="2" fill="#EC4899" />
              <circle cx="16" cy="17" r="1.4" fill="#3D2B4F" />
              <circle cx="24" cy="17" r="1.4" fill="#3D2B4F" />
              <circle cx="15" cy="20" r="1.5" fill="#F472B6" opacity="0.6" />
              <circle cx="25" cy="20" r="1.5" fill="#F472B6" opacity="0.6" />
            </>
          )}

          {colleague.id === 'manikanta' && (
            <>
              {/* Manikanta: Energetic chestnut short hair */}
              <path d="M11 16 C11 8 29 8 29 16 C25 12 21 13 17 12 C14 13 12 15 11 16 Z" fill="#78350F" />
              <circle cx="16" cy="17" r="1.4" fill="#1F2937" />
              <circle cx="24" cy="17" r="1.4" fill="#1F2937" />
              <circle cx="20" cy="31" r="2.5" fill="#F59E0B" />
            </>
          )}

          {colleague.id === 'abdul' && (
            <>
              {/* Abdul Basith: Dark hair & developer spectacles */}
              <path d="M11 16 C11 8 29 7 29 16 C25 12 22 13 18 12 C14 13 12 15 11 16 Z" fill="#0F172A" />
              {/* Specs */}
              <circle cx="16" cy="17" r="2.8" stroke="#0F172A" strokeWidth="1" fill="none" />
              <circle cx="24" cy="17" r="2.8" stroke="#0F172A" strokeWidth="1" fill="none" />
              <line x1="18.8" y1="17" x2="21.2" y2="17" stroke="#0F172A" strokeWidth="1" />
              <circle cx="16" cy="17" r="1.2" fill="#0F172A" />
              <circle cx="24" cy="17" r="1.2" fill="#0F172A" />
            </>
          )}

          {/* Friendly Smile */}
          <path d="M18 22 Q20 23.5 22 22" stroke="#E11D48" strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Colleague Nametag Badge */}
      <div className={`colleague-nametag ${isFound ? 'found' : ''}`}>
        <span>{isFound ? '✅' : colleague.badge}</span>
        <span>{colleague.name}</span>
      </div>
    </div>
  );
}

/**
 * Mini-Dog Obstacle
 */
function MiniDog() {
  return (
    <div className="game-dog-obstacle">
      <svg viewBox="0 0 36 30" width="30" height="25" aria-label="Puppy Obstacle">
        <defs>
          <linearGradient id="miniDogFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC875" />
            <stop offset="100%" stopColor="#FFA640" />
          </linearGradient>
        </defs>
        <path d="M26 16 C31 12 33 8 31 6" stroke="#E08320" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="19" cy="18" rx="9" ry="7" fill="url(#miniDogFur)" />
        <ellipse cx="13" cy="25" rx="2.5" ry="2" fill="url(#miniDogFur)" />
        <ellipse cx="23" cy="25" rx="2.5" ry="2" fill="url(#miniDogFur)" />
        <circle cx="10" cy="12" r="6" fill="url(#miniDogFur)" />
        <path d="M6 8 C4 11 3 15 5 16" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="8" cy="11" r="1" fill="#3D2B4F" />
        <circle cx="12" cy="11" r="1" fill="#3D2B4F" />
        <circle cx="10" cy="14" r="1" fill="#3D2B4F" />
        <path d="M8 17 Q11 19 14 17" stroke="#FF4767" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ─── The Five Office Colleagues Configuration ───
const COLLEAGUES = [
  {
    id: 'srujan',
    name: 'Srujan',
    badge: '🎯',
    color: '#1E3A8A',
    secondaryColor: '#3B82F6',
    xRatio: 0.16,
    yRatio: 0.22,
    greeting: "Mission accepted! Let's find the snacks! 🎯",
  },
  {
    id: 'prajwal',
    name: 'Prajwal',
    badge: '😎',
    color: '#065F46',
    secondaryColor: '#10B981',
    xRatio: 0.84,
    yRatio: 0.22,
    greeting: "Another office mission? I'm in! 😎",
  },
  {
    id: 'abdul',
    name: 'Abdul Basith',
    badge: '💻',
    color: '#881337',
    secondaryColor: '#E11D48',
    xRatio: 0.50,
    yRatio: 0.24,
    greeting: "Wait... I thought I was supposed to be the developer, not part of the mission! 😂",
  },
  {
    id: 'hency',
    name: 'Hency',
    badge: '💗',
    color: '#6B21A8',
    secondaryColor: '#A855F7',
    xRatio: 0.16,
    yRatio: 0.65,
    greeting: "Birthday mission activated! 💗",
  },
  {
    id: 'manikanta',
    name: 'Manikanta',
    badge: '🚀',
    color: '#B45309',
    secondaryColor: '#F59E0B',
    xRatio: 0.84,
    yRatio: 0.65,
    greeting: "Teamwork makes the mission work! 🚀",
  },
];

const SNACK_EMOJIS = ['🍟', '🍔', '🧁', '🧋', '🍦', '🍕'];

export default function OperationSaveAbdul({ goNext }) {
  // Game states: 'intro' | 'playing' | 'paused' | 'gameover'
  const [gameState, setGameState] = useState('intro');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds round duration
  const [snacksCollected, setSnacksCollected] = useState(0);
  const [foundColleagues, setFoundColleagues] = useState([]);
  const [activeGreetingId, setActiveGreetingId] = useState(null);
  const [showGangRoster, setShowGangRoster] = useState(false);

  // Entities state
  const [playerPos, setPlayerPos] = useState({ x: 180, y: 220 });
  const [isInvulnerable, setIsInvulnerable] = useState(false);
  const [snacks, setSnacks] = useState([
    { id: 1, x: 120, y: 130, emoji: '🍟' },
    { id: 2, x: 240, y: 130, emoji: '🍔' },
  ]);
  const [floatingScores, setFloatingScores] = useState([]);
  const [collisionPuff, setCollisionPuff] = useState(null);

  // Input keys tracking
  const keysRef = useRef({ up: false, down: false, left: false, right: false });

  // Arena dimensions ref
  const arenaRef = useRef(null);
  const arenaBounds = useRef({ width: 360, height: 280 });

  // Game loop animation frame ID
  const animFrameId = useRef(null);
  const lastTimeRef = useRef(0);

  // Refs for loop state to avoid race conditions
  const playerPosRef = useRef({ x: 180, y: 220 });
  const isInvulnRef = useRef(false);
  const foundColleaguesRef = useRef([]);
  const dogRef = useRef({ x: 50, y: 125, vx: 55, vy: 0 }); // Patrolling dog

  // Update arena bounds on mount/resize
  useEffect(() => {
    const updateBounds = () => {
      if (arenaRef.current) {
        const rect = arenaRef.current.getBoundingClientRect();
        arenaBounds.current = { width: rect.width, height: rect.height };
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [gameState]);

  // Handle Visibility Change (Auto-pause when tab is backgrounded)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && gameState === 'playing') {
        setGameState('paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [gameState]);

  // Handle Desktop Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.code) || e.key === 'ArrowUp') {
        keysRef.current.up = true;
        e.preventDefault();
      }
      if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.code) || e.key === 'ArrowDown') {
        keysRef.current.down = true;
        e.preventDefault();
      }
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code) || e.key === 'ArrowLeft') {
        keysRef.current.left = true;
        e.preventDefault();
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code) || e.key === 'ArrowRight') {
        keysRef.current.right = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.code) || e.key === 'ArrowUp') {
        keysRef.current.up = false;
      }
      if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.code) || e.key === 'ArrowDown') {
        keysRef.current.down = false;
      }
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code) || e.key === 'ArrowLeft') {
        keysRef.current.left = false;
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code) || e.key === 'ArrowRight') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Timer Countdown (1 second intervals)
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Main Game Loop (Movement, Collision, Discovery)
  useEffect(() => {
    if (gameState !== 'playing') return;

    lastTimeRef.current = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const { width, height } = arenaBounds.current;
      const speed = 195; // px per second

      // 1. Move Player
      let newX = playerPosRef.current.x;
      let newY = playerPosRef.current.y;

      if (keysRef.current.up) newY -= speed * dt;
      if (keysRef.current.down) newY += speed * dt;
      if (keysRef.current.left) newX -= speed * dt;
      if (keysRef.current.right) newX += speed * dt;

      // Clamp Player inside arena bounds
      newX = Math.max(18, Math.min(width - 18, newX));
      newY = Math.max(22, Math.min(height - 22, newY));

      playerPosRef.current = { x: newX, y: newY };
      setPlayerPos({ x: newX, y: newY });

      // 2. Move Patrolling Dog Obstacle
      const dog = dogRef.current;
      dog.x += dog.vx * dt;
      if (dog.x <= 35) {
        dog.x = 35;
        dog.vx = Math.abs(dog.vx);
      } else if (dog.x >= width - 35) {
        dog.x = width - 35;
        dog.vx = -Math.abs(dog.vx);
      }

      // 3. Dog-Player Collision Detection
      if (!isInvulnRef.current) {
        const dogDist = Math.hypot(newX - dog.x, newY - dog.y);
        if (dogDist < 26) {
          isInvulnRef.current = true;
          setIsInvulnerable(true);
          setCollisionPuff({ x: newX, y: newY });

          setLives((prevLives) => {
            const nextLives = prevLives - 1;
            if (nextLives <= 0) {
              setGameState('gameover');
            }
            return nextLives;
          });

          // 1.2s invulnerability grace period
          setTimeout(() => {
            isInvulnRef.current = false;
            setIsInvulnerable(false);
          }, 1200);

          setTimeout(() => setCollisionPuff(null), 600);
        }
      }

      // 4. Colleague Discovery Check
      COLLEAGUES.forEach((colleague) => {
        const cx = colleague.xRatio * width;
        const cy = colleague.yRatio * height;
        const dist = Math.hypot(newX - cx, newY - cy);

        if (dist < 32) {
          // If colleague not yet found, award +20 points and mark found
          if (!foundColleaguesRef.current.includes(colleague.id)) {
            foundColleaguesRef.current = [...foundColleaguesRef.current, colleague.id];
            setFoundColleagues([...foundColleaguesRef.current]);

            // Award 20 points
            setScore((s) => s + 20);

            // Floating +20 label
            const floatId = Date.now() + Math.random();
            setFloatingScores((f) => [
              ...f,
              { id: floatId, x: cx, y: cy - 10, text: `+20 ${colleague.name}! ✨` },
            ]);
            setTimeout(() => {
              setFloatingScores((f) => f.filter((item) => item.id !== floatId));
            }, 850);

            // Show colleague's speech bubble
            setActiveGreetingId(colleague.id);
            setTimeout(() => {
              setActiveGreetingId((curr) => (curr === colleague.id ? null : curr));
            }, 3000);
          }
        }
      });

      // 5. Snack Collection Check
      setSnacks((currentSnacks) => {
        let collected = false;
        const remaining = currentSnacks.filter((snack) => {
          const dist = Math.hypot(newX - snack.x, newY - snack.y);
          if (dist < 26) {
            collected = true;
            // Add +10 score
            setScore((s) => s + 10);
            setSnacksCollected((c) => c + 1);

            // Floating +10 label
            const floatId = Date.now() + Math.random();
            setFloatingScores((f) => [
              ...f,
              { id: floatId, x: snack.x, y: snack.y, text: '+10' },
            ]);
            setTimeout(() => {
              setFloatingScores((f) => f.filter((item) => item.id !== floatId));
            }, 750);

            return false;
          }
          return true;
        });

        // Respawn snack at open safe location
        if (collected) {
          const randEmoji = SNACK_EMOJIS[Math.floor(Math.random() * SNACK_EMOJIS.length)];
          const spawnX = 40 + Math.random() * (width - 80);
          const spawnY = 40 + Math.random() * (height - 80);
          return [...remaining, { id: Date.now(), x: spawnX, y: spawnY, emoji: randEmoji }];
        }

        return currentSnacks;
      });

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [gameState]);

  // Start / Restart Game
  const startGame = useCallback(() => {
    const { width, height } = arenaBounds.current;
    setScore(0);
    setLives(3);
    setTimeLeft(60); // 60s round
    setSnacksCollected(0);
    setFoundColleagues([]);
    foundColleaguesRef.current = [];
    setActiveGreetingId(null);
    setShowGangRoster(false);

    // Initial position: Bottom-center
    setPlayerPos({ x: width / 2, y: height - 36 });
    playerPosRef.current = { x: width / 2, y: height - 36 };
    isInvulnRef.current = false;
    setIsInvulnerable(false);

    // Initial dog patrol
    dogRef.current = { x: 50, y: height * 0.44, vx: 55, vy: 0 };

    // Initial snacks
    setSnacks([
      { id: 1, x: width * 0.35, y: height * 0.44, emoji: '🍟' },
      { id: 2, x: width * 0.65, y: height * 0.44, emoji: '🍔' },
    ]);
    setFloatingScores([]);
    setCollisionPuff(null);
    setGameState('playing');
  }, []);

  // Pause / Resume
  const togglePause = useCallback(() => {
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  }, []);

  // Mobile D-Pad handlers
  const handleDpadStart = useCallback((dir) => {
    keysRef.current[dir] = true;
  }, []);

  const handleDpadEnd = useCallback((dir) => {
    keysRef.current[dir] = false;
  }, []);

  return (
    <div className="game-wrapper">
      {/* ─── SCREEN 1: MISSION BRIEFING (INTRO SCREEN) ─── */}
      {gameState === 'intro' && (
        <div className="game-screen-card">
          <div className="game-milestone-badge">
            <span>🚨</span> MISSION BRIEFING 🚨
          </div>

          <h2 className="game-title">KOMA & THE OFFICE GANG 🎮</h2>
          <p className="game-subtitle">
            One birthday girl. Five office colleagues. One completely unnecessary office mission. 😂
          </p>

          <div className="mission-briefing-box">
            <p className="mission-briefing-lead">
              <strong>Agent Komasree, your office gang needs you!</strong>
            </p>
            <p className="mission-briefing-text">
              Your mission: collect the snack tokens, meet your teammates, and survive the most unnecessarily complicated office mission ever created. 😂
            </p>

            <div className="briefing-colleagues-list">
              <span className="briefing-colleagues-label">Your Teammates to Find:</span>
              <div className="briefing-colleagues-tags">
                {COLLEAGUES.map((c) => (
                  <span key={c.id} className="briefing-tag">
                    {c.badge} {c.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="mission-disclaimer">
              ✨ <em>All characters and events in this game are fictional, friendly office humour created for Komasree's birthday.</em>
            </p>
          </div>

          <div className="game-instructions">
            <div className="game-instructions-row">
              <span className="game-instructions-icon">👥</span>
              <span><strong>Find 5 Teammates:</strong> +20 points each (100 pts total)</span>
            </div>
            <div className="game-instructions-row">
              <span className="game-instructions-icon">🍟</span>
              <span><strong>Collect Snacks:</strong> +10 points each</span>
            </div>
            <div className="game-instructions-row">
              <span className="game-instructions-icon">🐶</span>
              <span><strong>Avoid Friendly Puppy:</strong> 3 lives (💗💗💗)</span>
            </div>
            <div className="game-instructions-row">
              <span className="game-instructions-icon">⏱️</span>
              <span><strong>Mission Timer:</strong> 60 seconds on the clock</span>
            </div>
          </div>

          <div className="game-actions-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={startGame}
              style={{ width: '100%', maxWidth: '280px' }}
            >
              START THE MISSION 🚀
            </button>

            <button
              type="button"
              className="btn btn-nav"
              onClick={goNext}
              style={{ margin: 0, textDecoration: 'underline' }}
            >
              Skip to Birthday Letter →
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: ACTIVE GAMEPLAY / PAUSED ─── */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div>
          {/* Top Status Bar (HUD) */}
          <div className="game-hud" role="status" aria-label="Game Status">
            <div className="hud-item hud-score">
              <span>⭐</span>
              <span>{score} PTS</span>
            </div>

            <div className="hud-item hud-lives" aria-label={`${lives} lives remaining`}>
              {[1, 2, 3].map((heart) => (
                <span
                  key={heart}
                  className={`hud-heart ${heart > lives ? 'lost' : ''}`}
                >
                  💗
                </span>
              ))}
            </div>

            <div className="hud-item hud-timer">
              <span>⏱️</span>
              <span>{timeLeft}s</span>
            </div>

            <button
              type="button"
              className="btn-hud-control"
              onClick={togglePause}
              aria-label={gameState === 'playing' ? 'Pause Game' : 'Resume Game'}
            >
              {gameState === 'playing' ? '⏸️' : '▶️'}
            </button>
          </div>

          {/* Teammate Progress Bar / Checklist */}
          <div className="teammate-progress-bar">
            <div className="teammate-progress-header">
              <span>OFFICE GANG FOUND:</span>
              <strong className="teammate-count-badge">
                {foundColleagues.length} / 5
              </strong>
            </div>
            <div className="teammate-badges-row">
              {COLLEAGUES.map((c) => {
                const isFound = foundColleagues.includes(c.id);
                return (
                  <span
                    key={c.id}
                    className={`teammate-pill ${isFound ? 'found' : 'pending'}`}
                  >
                    <span>{isFound ? '✅' : c.badge}</span>
                    <span>{c.name.split(' ')[0]}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Interactive Game Arena */}
          <div className="game-arena" ref={arenaRef}>
            {/* The 5 Office Colleagues on Stage */}
            {COLLEAGUES.map((colleague) => {
              const { width, height } = arenaBounds.current;
              const posX = colleague.xRatio * width;
              const posY = colleague.yRatio * height;
              const isFound = foundColleagues.includes(colleague.id);
              const showGreeting = activeGreetingId === colleague.id;

              return (
                <div
                  key={colleague.id}
                  className="game-entity"
                  style={{ left: `${posX}px`, top: `${posY}px` }}
                >
                  <ColleagueAvatar
                    colleague={colleague}
                    isFound={isFound}
                    showGreeting={showGreeting}
                  />
                </div>
              );
            })}

            {/* Collectible Snacks */}
            {snacks.map((snack) => (
              <div
                key={snack.id}
                className="game-entity game-snack"
                style={{ left: `${snack.x}px`, top: `${snack.y}px` }}
              >
                <span style={{ fontSize: '1.45rem' }}>{snack.emoji}</span>
              </div>
            ))}

            {/* Floating Score Popups (+10, +20) */}
            {floatingScores.map((float) => (
              <div
                key={float.id}
                className="floating-score"
                style={{ left: `${float.x}px`, top: `${float.y}px` }}
              >
                {float.text}
              </div>
            ))}

            {/* Collision Puff reaction */}
            {collisionPuff && (
              <div
                className="collision-puff"
                style={{ left: `${collisionPuff.x}px`, top: `${collisionPuff.y}px` }}
              >
                💨
              </div>
            )}

            {/* Koma Player Avatar */}
            <div
              className="game-entity"
              style={{ left: `${playerPos.x}px`, top: `${playerPos.y}px` }}
            >
              <MiniKoma isInvulnerable={isInvulnerable} />
            </div>

            {/* Harmless Patrolling Puppy Obstacle */}
            <div
              className="game-entity"
              style={{ left: `${dogRef.current.x}px`, top: `${dogRef.current.y}px` }}
            >
              <MiniDog />
            </div>

            {/* Paused Overlay */}
            {gameState === 'paused' && (
              <div className="game-pause-overlay">
                <div className="pause-title">MISSION PAUSED ⏸️</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Take a breath, Agent Koma! The office gang is waiting for you.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={togglePause}
                  style={{ minWidth: '180px' }}
                >
                  ▶️ Resume Mission
                </button>
              </div>
            )}
          </div>

          {/* On-Screen Mobile D-Pad Controls */}
          <div className="game-dpad" role="group" aria-label="Directional Controls">
            <button
              type="button"
              className="dpad-btn dpad-up"
              onPointerDown={() => handleDpadStart('up')}
              onPointerUp={() => handleDpadEnd('up')}
              onPointerLeave={() => handleDpadEnd('up')}
              aria-label="Move Up"
            >
              ▲
            </button>
            <button
              type="button"
              className="dpad-btn dpad-left"
              onPointerDown={() => handleDpadStart('left')}
              onPointerUp={() => handleDpadEnd('left')}
              onPointerLeave={() => handleDpadEnd('left')}
              aria-label="Move Left"
            >
              ◀
            </button>
            <button
              type="button"
              className="dpad-btn dpad-down"
              onPointerDown={() => handleDpadStart('down')}
              onPointerUp={() => handleDpadEnd('down')}
              onPointerLeave={() => handleDpadEnd('down')}
              aria-label="Move Down"
            >
              ▼
            </button>
            <button
              type="button"
              className="dpad-btn dpad-right"
              onPointerDown={() => handleDpadStart('right')}
              onPointerUp={() => handleDpadEnd('right')}
              onPointerLeave={() => handleDpadEnd('right')}
              aria-label="Move Right"
            >
              ▶
            </button>
          </div>

          <div className="desktop-controls-hint">
            Desktop: Use Arrow Keys (← ↑ → ↓) or WASD to move Koma
          </div>
        </div>
      )}

      {/* ─── SCREEN 3: MISSION REPORT (RESULT SCREEN) ─── */}
      {gameState === 'gameover' && (
        <div className="game-screen-card">
          <div className="game-milestone-badge">
            <span>🎉</span> MISSION REPORT: KOMA'S OFFICE GANG
          </div>

          {/* Conditional Result Heading & Message */}
          {foundColleagues.length === 5 ? (
            <>
              <div style={{ fontSize: '3rem', margin: '4px 0' }}>🏆</div>
              <h2 className="game-title" style={{ color: '#D81B60' }}>
                OFFICE GANG UNITED! 🏆
              </h2>
              <p className="game-subtitle" style={{ marginTop: '8px', lineHeight: 1.55 }}>
                Komasree has successfully assembled the whole gang! Srujan, Prajwal, Hency, Manikanta, and Abdul Basith are officially part of this birthday mission. Now someone please arrange the snacks. 😂💗
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: '3rem', margin: '4px 0' }}>😂</div>
              <h2 className="game-title">
                MISSION PARTIALLY COMPLETE! 😂
              </h2>
              <p className="game-subtitle" style={{ marginTop: '8px', lineHeight: 1.55 }}>
                Not everyone made it to the meeting, Koma! But the birthday mission still counts. The office gang sends you lots of happiness and birthday wishes. 💗
              </p>
            </>
          )}

          {/* Statistics Summary */}
          <div className="game-result-stats">
            <div className="result-stat-box">
              <div className="stat-label">Final Score</div>
              <div className="stat-value">{score}</div>
            </div>
            <div className="result-stat-box">
              <div className="stat-label">Gang Found</div>
              <div className="stat-value">{foundColleagues.length}/5</div>
            </div>
            <div className="result-stat-box">
              <div className="stat-label">Snacks Rescued</div>
              <div className="stat-value">{snacksCollected}</div>
            </div>
            <div className="result-stat-box">
              <div className="stat-label">Lives Left</div>
              <div className="stat-value">{lives}/3</div>
            </div>
          </div>

          {/* View Office Gang Modal / Expanded Card */}
          {showGangRoster && (
            <div className="gang-roster-view">
              <div className="gang-roster-header">
                <strong>THE OFFICE GANG ROSTER 👥</strong>
                <button
                  type="button"
                  className="btn-roster-close"
                  onClick={() => setShowGangRoster(false)}
                  aria-label="Close Roster"
                >
                  ✕
                </button>
              </div>
              <div className="gang-roster-grid">
                {COLLEAGUES.map((c) => {
                  const wasFound = foundColleagues.includes(c.id);
                  return (
                    <div key={c.id} className="gang-roster-card">
                      <div className="gang-roster-badge">{c.badge}</div>
                      <div className="gang-roster-details">
                        <div className="gang-roster-name">
                          {c.name} {wasFound && <span className="roster-tag-found">Found ✅</span>}
                        </div>
                        <div className="gang-roster-quote">"{c.greeting}"</div>
                      </div>
                    </div>
                  );
                })}
                <div className="gang-roster-card koma-card">
                  <div className="gang-roster-badge">👑</div>
                  <div className="gang-roster-details">
                    <div className="gang-roster-name">Komasree 🎀</div>
                    <div className="gang-roster-quote">"The Birthday Girl & Chief Snack Officer ✨"</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="game-actions-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={goNext}
              style={{ width: '100%', maxWidth: '290px' }}
            >
              CONTINUE THE SURPRISE 💌
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={startGame}
              style={{ width: '100%', maxWidth: '290px' }}
            >
              PLAY AGAIN 🔄
            </button>

            <button
              type="button"
              className="btn btn-nav"
              onClick={() => setShowGangRoster((prev) => !prev)}
              style={{ margin: 0, textDecoration: 'underline' }}
            >
              {showGangRoster ? 'HIDE OFFICE GANG ROSTER 👥' : 'VIEW OFFICE GANG AGAIN 👥'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
