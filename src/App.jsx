// src/App.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import './index.css';
import { openingMessage, debuggingStatus, finalMessage, birthdayRevealContent } from './data/birthdayContent';
import FriendshipSimulator from './components/simulator/FriendshipSimulator';
import OperationSaveAbdul from './components/game/OperationSaveAbdul';

// ─── Floating Particles ─────────────────────────
// Pre-generate particle configs outside of render to keep it pure
function generateParticleConfigs(count, colors) {
  return Array.from({ length: count }, (_, i) => ({
    size: 6 + Math.random() * 14,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 10,
    color: colors[i % colors.length],
  }));
}

const DEFAULT_PARTICLE_COLORS = ['#FFB8D4', '#D4C2FF', '#94DBFF', '#FFF3D1'];

function Particles({ colors = DEFAULT_PARTICLE_COLORS, count = 18 }) {
  const configs = React.useMemo(() => generateParticleConfigs(count, colors), [count, colors]);
  return (
    <div className="particles">
      {configs.map((cfg, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: cfg.size,
            height: cfg.size,
            left: `${cfg.left}%`,
            backgroundColor: cfg.color,
            animationDelay: `${cfg.delay}s`,
            animationDuration: `${cfg.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Scene Wrapper with Animations ─────────────────────────
function Scene({ bg, children }) {
  return (
    <motion.section
      className={`scene ${bg} scene-enter`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Particles />
      {children}
    </motion.section>
  );
}

// ─── Progress Dots ─────────────────────────
function ProgressDots({ total, current, onDotClick }) {
  return (
    <div className="progress-dots">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`progress-dot ${i === current ? 'active' : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Go to scene ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 1: OPENING
// ════════════════════════════════════════════════════════════
function OpeningScene({ goNext }) {
  return (
    <Scene bg="bg-opening">
      <motion.div
        className="content-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <span className="scene-emoji">🎀</span>
        <h1 className="scene-title">{openingMessage.greeting}</h1>
        <p className="scene-subtitle">
          I made something for you.<br />
          And no, it's not another boring birthday wish. 😂
        </p>
        <motion.button
          className="btn btn-primary"
          onClick={goNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          ✨ Discover Your Surprise
        </motion.button>
      </motion.div>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 2: FRIENDSHIP SIMULATOR
// ════════════════════════════════════════════════════════════
function FriendshipSimulatorScene({ goNext }) {
  return (
    <Scene bg="bg-simulator">
      <FriendshipSimulator goNext={goNext} />
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 3: SYSTEM DIAGNOSTICS (DARK TERMINAL)
// ════════════════════════════════════════════════════════════
function DebuggingScene({ goNext }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= debuggingStatus.length + 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <Scene bg="bg-debug">
      <motion.div
        className="content-card"
        style={{ background: 'transparent', border: 'none', boxShadow: 'none', backdropFilter: 'none' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="scene-emoji">💻</span>
        <h2 className="scene-title" style={{ color: '#E4D7F2' }}>KOMASREE.EXE</h2>
        <p className="scene-subtitle" style={{ color: '#9B8AAD' }}>Running system diagnostics...</p>

        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
          </div>

          {debuggingStatus.map((item, i) => (
            <motion.div
              key={i}
              className="terminal-line"
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <span className="terminal-label">{item.icon} {item.label}</span>
              <span className={item.result.includes('perfectly') ? 'terminal-ok' : item.result.includes('failure') ? 'terminal-error' : 'terminal-warn'}>
                [{item.result}]
              </span>
            </motion.div>
          ))}

          {visibleLines > debuggingStatus.length && (
            <motion.div
              className="terminal-error-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ⚠ ERROR 404: COMMON SENSE NOT FOUND
            </motion.div>
          )}
        </div>

        <motion.button
          className="btn btn-primary"
          onClick={goNext}
          style={{ marginTop: 'var(--space-lg)' }}
          whileTap={{ scale: 0.96 }}
        >
          🎂 Install Birthday Update
        </motion.button>
      </motion.div>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  BIRTHDAY CAKE SVG WITH 24 TOPPER & CANDLES
// ════════════════════════════════════════════════════════════
function BirthdayCake({ blown }) {
  return (
    <div className="cake-stage" aria-label="24th Birthday Cake">
      {!blown && <div className="candle-glow" />}
      <svg viewBox="0 0 160 140" width="150" height="135" className="birthday-cake-svg">
        <defs>
          <linearGradient id="cakeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
          <linearGradient id="cakeFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFE8F2" />
          </linearGradient>
          <linearGradient id="cakeBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB8D4" />
            <stop offset="100%" stopColor="#FF78A8" />
          </linearGradient>
          <linearGradient id="candleFlame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>
        </defs>

        {/* Plate / Stand */}
        <ellipse cx="80" cy="128" rx="68" ry="9" fill="#E6D9FF" />
        <ellipse cx="80" cy="126" rx="64" ry="7" fill="#FFFFFF" />

        {/* Bottom Tier */}
        <path d="M26 95 L26 120 Q80 132 134 120 L134 95 Q80 106 26 95 Z" fill="url(#cakeBase)" />
        <ellipse cx="80" cy="95" rx="54" ry="11" fill="url(#cakeFrosting)" />
        <path d="M26 95 Q35 106 44 97 Q53 108 62 98 Q71 109 80 97 Q89 108 98 98 Q107 109 116 97 Q125 107 134 95" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

        {/* Top Tier */}
        <path d="M42 66 L42 88 Q80 98 118 88 L118 66 Q80 76 42 66 Z" fill="url(#cakeBase)" />
        <ellipse cx="80" cy="66" rx="38" ry="9" fill="url(#cakeFrosting)" />
        <path d="M42 66 Q52 75 62 67 Q71 76 80 67 Q89 76 98 67 Q108 75 118 66" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

        {/* Golden Pearls */}
        <circle cx="56" cy="85" r="2.5" fill="#FFE082" />
        <circle cx="70" cy="87" r="2.5" fill="#FFE082" />
        <circle cx="80" cy="88" r="2.5" fill="#FFE082" />
        <circle cx="90" cy="87" r="2.5" fill="#FFE082" />
        <circle cx="104" cy="85" r="2.5" fill="#FFE082" />

        {/* Golden 24 Cake Topper */}
        <g className="cake-topper-24">
          <line x1="68" y1="46" x2="68" y2="62" stroke="#D7CCC8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="92" y1="46" x2="92" y2="62" stroke="#D7CCC8" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="52" y="16" width="56" height="32" rx="16" fill="url(#cakeGold)" stroke="#FFFFFF" strokeWidth="2" />
          <text x="80" y="38" textAnchor="middle" fontFamily="'Quicksand', 'Inter', sans-serif" fontWeight="900" fontSize="20" fill="#7A4100" letterSpacing="1">24</text>
        </g>

        {/* Candles */}
        <rect x="36" y="44" width="5" height="18" rx="2" fill="#94DBFF" />
        <rect x="119" y="44" width="5" height="18" rx="2" fill="#D4C2FF" />

        {!blown ? (
          <>
            <g className="candle-flame flame-left">
              <ellipse cx="38.5" cy="38" rx="3.5" ry="6" fill="url(#candleFlame)" />
              <ellipse cx="38.5" cy="39" rx="1.5" ry="3" fill="#FFFFFF" />
            </g>
            <g className="candle-flame flame-right">
              <ellipse cx="121.5" cy="38" rx="3.5" ry="6" fill="url(#candleFlame)" />
              <ellipse cx="121.5" cy="39" rx="1.5" ry="3" fill="#FFFFFF" />
            </g>
          </>
        ) : (
          <>
            <path d="M38 40 Q36 34 40 30" stroke="#B0BEC5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M121 40 Q124 34 120 30" stroke="#B0BEC5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
          </>
        )}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 4: BIRTHDAY REVEAL — BLOW THE CANDLES (24TH BIRTHDAY)
// ════════════════════════════════════════════════════════════
function BirthdayReveal({ goNext }) {
  const [blown, setBlown] = useState(false);

  const blowCandles = useCallback(() => {
    setBlown(true);
    const duration = 3500;
    const end = Date.now() + duration;
    const colors = ['#FF78A8', '#D4C2FF', '#FFB8D4', '#94DBFF', '#FFF3D1'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <Scene bg="bg-birthday">
      <motion.div
        className="content-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="birthday-milestone-badge">
          <span>✨</span> CHAPTER 24 UNLOCKED
        </div>

        <h1 className="scene-title" style={{ color: 'var(--pink-500)', fontSize: 'clamp(1.5rem, 5.5vw, 2.2rem)' }}>
          {birthdayRevealContent.title}
        </h1>

        <div className="birthday-full-name">{birthdayRevealContent.fullName}</div>
        <div className="birthday-date-tag">🗓️ {birthdayRevealContent.date}</div>

        <p className="scene-subtitle" style={{ marginBottom: 'var(--space-sm)' }}>
          {blown
            ? birthdayRevealContent.tagline
            : 'Close your eyes, make a wish for year 24, and blow out the candles.'}
        </p>

        <BirthdayCake blown={blown} />

        {!blown ? (
          <motion.button
            className="btn btn-primary"
            onClick={blowCandles}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={{ boxShadow: ['0 4px 16px rgba(255,92,148,0.3)', '0 4px 32px rgba(255,92,148,0.6)', '0 4px 16px rgba(255,92,148,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Blow the Candles
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="confetti-burst" style={{ marginBottom: 'var(--space-sm)' }}>🎊 🎈 🎉 🎁 💗</div>
            <motion.button
              className="btn btn-primary"
              onClick={goNext}
              whileTap={{ scale: 0.96 }}
            >
              Open Your Gifts →
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 5: MEMORY SCRAPBOOK
// ════════════════════════════════════════════════════════════
const memories = [
  {
    photo: '/photos/koma-portrait.jpg',
    caption: 'The one and only Komasree 💗',
    rotate: '-1deg',
    objectPosition: 'center 12%',
    badge: '👑 Star of the Day',
  },
  {
    photo: '/photos/koma-father.jpg',
    caption: "Daddy's girl forever — with her father ❤️",
    rotate: '1.5deg',
    objectPosition: 'center 10%',
    badge: '❤️ Family',
  },
  {
    photo: '/photos/koma-mother.jpg',
    caption: 'Moments of warmth & love with Amma 🌸',
    rotate: '-1.5deg',
    objectPosition: 'center 10%',
    badge: '🌸 Warmth',
  },
  {
    photo: '/photos/office-gang.png',
    caption: 'The office gang — our little family',
    rotate: '1deg',
    objectPosition: 'center 18%',
    span: 2,
    badge: '💼 Office Gang',
  },
  {
    photo: '/photos/birthday-celebration.jpg',
    caption: 'Birthday vibes with the crew 🎂',
    rotate: '-1.5deg',
    objectPosition: 'center 18%',
    badge: '🎂 Celebration',
  },
  {
    photo: '/photos/staircase-squad.jpg',
    caption: 'Staircase hangouts between meetings',
    rotate: '1.5deg',
    objectPosition: 'center 28%',
    span: 2,
    badge: '☕ Squad Goals',
  },
  {
    photo: '/photos/koma-childhood-ai.jpg',
    caption: 'Looking back at little Koma — childhood memories ✨',
    rotate: '-2deg',
    objectPosition: 'center 12%',
    badge: '✨ Nostalgia',
  },
  {
    photo: '/photos/koma-childhood.jpg',
    caption: 'Little Koma — where it all started 🥹',
    rotate: '1.5deg',
    objectPosition: 'center 15%',
    badge: '🥹 Precious',
  },
  {
    photo: '/photos/retro-koma.jpg',
    caption: "Back to the 80's — Koma edition 🎸",
    rotate: '-1deg',
    objectPosition: 'center 10%',
    badge: '🎸 Retro Vibes',
  },
  {
    photo: '/photos/friendship-bracelet.jpg',
    caption: 'A little something made with love',
    rotate: '1deg',
    objectPosition: 'center 45%',
    badge: '🎀 Forever Friends',
  },
];

function MemoryScrapbook({ goNext }) {
  return (
    <Scene bg="bg-scrapbook">
      <span className="scene-emoji" style={{ position: 'relative', zIndex: 1 }}>📸</span>
      <h2 className="scene-title" style={{ position: 'relative', zIndex: 1, marginBottom: 'var(--space-sm)' }}>Little Moments, Big Memories</h2>
      <p className="scene-subtitle" style={{ position: 'relative', zIndex: 1 }}>Every great friendship is made of tiny, hilarious moments.</p>

      <div className="scrapbook-grid" style={{ position: 'relative', zIndex: 1 }}>
        {memories.map((m, i) => (
          <motion.div
            key={i}
            className={`scrapbook-item ${m.span === 2 ? 'span-2' : ''}`}
            style={{ '--rotate': m.rotate }}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: parseFloat(m.rotate) }}
            transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="scrapbook-photo-wrapper">
              {m.badge && <span className="scrapbook-badge">{m.badge}</span>}
              <img
                src={m.photo}
                alt={m.caption}
                className="scrapbook-photo"
                style={{ objectPosition: m.objectPosition || 'center 15%' }}
                loading="lazy"
              />
            </div>
            <span className="scrapbook-caption">{m.caption}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="btn btn-primary"
        style={{ marginTop: 'var(--space-xl)', position: 'relative', zIndex: 1 }}
        onClick={goNext}
        whileTap={{ scale: 0.96 }}
      >
        Continue →
      </motion.button>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 6: PLAYABLE MINI-GAME — OPERATION: SAVE ABDUL
// ════════════════════════════════════════════════════════════
function OperationSaveAbdulScene({ goNext }) {
  return (
    <Scene bg="bg-game">
      <OperationSaveAbdul goNext={goNext} />
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 7: PERSONAL LETTER
// ════════════════════════════════════════════════════════════
function PersonalLetter({ goNext }) {
  return (
    <Scene bg="bg-letter">
      <div className="letter-container">
        <motion.div
          className="envelope-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="birthday-milestone-badge" style={{ marginBottom: 'var(--space-xs)' }}>
            <span>💌</span> CHAPTER 24: A LITTLE WISH FOR KOMA
          </div>
          <span className="envelope-icon" style={{ display: 'block', margin: '4px 0' }}>💌</span>
          <h2 className="scene-title" style={{ marginTop: 'var(--space-xs)' }}>Okay, Koma. Jokes aside...</h2>
        </motion.div>

        <motion.div
          className="letter-paper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="letter-greeting">Dear Koma,</div>
          <div className="letter-body">
            <p>From randomly coming all the way just to punch me to treating us during our snack breaks, you have your own special way of making ordinary days memorable.</p>
            <p>We fight, we tease each other, and sometimes we laugh at the most ridiculous things. And honestly, those little moments are some of the things that make our friendship special.</p>
            <p>I hope this birthday brings you lots of happiness, peaceful days, genuine smiles, and beautiful memories.</p>
            <p>Whenever life gets a little difficult, I hope you remember that there are people around you who genuinely care about you and wish good things for you.</p>
            <p>Keep being the funny, unpredictable Koma we know.</p>
            <p>And please, for the love of everyone in the office, try not to give our team leader any more debugging work. 😂</p>
            <p style={{ fontWeight: 700, color: 'var(--pink-500)', marginTop: 'var(--space-lg)' }}>
              Happy Birthday, Komasree! 🎂💗
            </p>
          </div>
          <div className="letter-signature">— Abdul Basith</div>
        </motion.div>

        <motion.button
          className="btn btn-primary"
          style={{ marginTop: 'var(--space-xl)' }}
          onClick={goNext}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          See what the gang says →
        </motion.button>
      </div>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 7: COLLEAGUE WISHES
// ════════════════════════════════════════════════════════════
const colleagueWishes = [
  {
    name: 'The Office Gang',
    role: 'Your Favorite Colleagues',
    avatar: '👥',
    avatarBg: 'linear-gradient(135deg, #FFB8D4, #D4C2FF)',
    text: 'Happy Birthday, Koma! The office is never boring when you\'re around. Keep being the amazing person you are! 🎉',
  },
  {
    name: 'Team Leader',
    role: 'Your Patient Team Lead',
    avatar: '👨‍💼',
    avatarBg: 'linear-gradient(135deg, #94DBFF, #D4C2FF)',
    text: 'Happy Birthday, Komasree! May this year bring you fewer bugs and more successful deployments. Also, please stop breaking the build. 😂',
  },
  {
    name: 'The Chai Group',
    role: 'Your Daily Chai Partners',
    avatar: '☕',
    avatarBg: 'linear-gradient(135deg, #FFF3D1, #FFB8D4)',
    text: 'Birthday cheers to the one who makes every chai break worth looking forward to! You deserve the world, Koma. 💗',
  },
];

function ColleagueWishes({ goNext }) {
  return (
    <Scene bg="bg-wishes">
      <span className="scene-emoji" style={{ position: 'relative', zIndex: 1 }}>❤️</span>
      <h2 className="scene-title" style={{ position: 'relative', zIndex: 1, marginBottom: 'var(--space-sm)' }}>
        A Little Love from Your Office Gang
      </h2>
      <p className="scene-subtitle" style={{ position: 'relative', zIndex: 1 }}>
        Some words from the people who tolerate— er, adore you. 😂
      </p>

      <div className="wishes-grid" style={{ position: 'relative', zIndex: 1 }}>
        {colleagueWishes.map((wish, i) => (
          <motion.div
            key={i}
            className="wish-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="wish-card-header">
              <div className="wish-avatar" style={{ background: wish.avatarBg }}>
                {wish.avatar}
              </div>
              <div>
                <div className="wish-name">{wish.name}</div>
                <div className="wish-role">{wish.role}</div>
              </div>
            </div>
            <p className="wish-text">"{wish.text}"</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="btn btn-primary"
        style={{ marginTop: 'var(--space-xl)', position: 'relative', zIndex: 1 }}
        onClick={goNext}
        whileTap={{ scale: 0.96 }}
      >
        One last thing... →
      </motion.button>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE 8: GRAND FINALE
// ════════════════════════════════════════════════════════════
function FinalCelebration({ restart }) {
  const [reliveKey, setReliveKey] = useState(0);

  const fireCelebration = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#FF78A8', '#D4C2FF', '#FFB8D4', '#94DBFF', '#FFF3D1', '#C6F6D5'];

    // Center star burst
    confetti({
      particleCount: 45,
      spread: 90,
      origin: { x: 0.5, y: 0.45 },
      colors,
    });

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  useEffect(() => {
    fireCelebration();
  }, [fireCelebration]);

  const handleReliveCelebration = useCallback(() => {
    setReliveKey((k) => k + 1);
    fireCelebration();
  }, [fireCelebration]);

  return (
    <Scene bg="bg-final">
      <motion.div
        className="content-card"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          className="birthday-milestone-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span>🎀</span> MILESTONE CELEBRATION
        </motion.div>

        <motion.div
          key={reliveKey}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ fontSize: '3.5rem', margin: 'var(--space-xs) 0' }}
        >
          🎂
        </motion.div>

        <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--pink-500)', marginBottom: '2px' }}>
          {finalMessage.title}
        </div>

        <motion.h1
          className="final-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{ marginBottom: '2px' }}
        >
          {finalMessage.birthday}
        </motion.h1>

        <div className="birthday-full-name" style={{ fontSize: '1.25rem', marginBottom: '2px' }}>
          {finalMessage.fullName}
        </div>
        <div className="birthday-date-tag" style={{ marginBottom: 'var(--space-sm)' }}>
          🗓️ {finalMessage.date}
        </div>

        <motion.p
          className="final-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {finalMessage.subtitle}
        </motion.p>

        <motion.p
          className="scene-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{ fontWeight: 500 }}
        >
          {finalMessage.closing}
        </motion.p>

        <motion.p
          className="final-joke"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          {finalMessage.joke}
        </motion.p>

        {/* Complete replay experience buttons */}
        <motion.div
          className="final-actions-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            marginTop: 'var(--space-md)',
            width: '100%',
          }}
        >
          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={handleReliveCelebration}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            style={{ width: '100%', maxWidth: '320px' }}
          >
            RELIVE THE FINAL CELEBRATION 🎉
          </motion.button>

          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={restart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            style={{ width: '100%', maxWidth: '320px' }}
          >
            EXPERIENCE THE SURPRISE AGAIN 💗
          </motion.button>
        </motion.div>

        <motion.p
          className="final-signature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          {finalMessage.signature} {finalMessage.author}
        </motion.p>
      </motion.div>
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════
//  MAIN APP — Scene Router
// ════════════════════════════════════════════════════════════
const scenes = [
  OpeningScene,
  FriendshipSimulatorScene,
  DebuggingScene,
  BirthdayReveal,
  MemoryScrapbook,
  OperationSaveAbdulScene,
  PersonalLetter,
  ColleagueWishes,
  FinalCelebration,
];

function App() {
  const [idx, setIdx] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);
  const CurrentScene = scenes[idx];

  const goNext = useCallback(() => {
    setIdx((i) => Math.min(i + 1, scenes.length - 1));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goBack = useCallback(() => {
    setIdx((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const restart = useCallback(() => {
    setSessionKey((k) => k + 1);
    setIdx(0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goTo = useCallback((i) => {
    setIdx(i);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <CurrentScene
          key={`${idx}-${sessionKey}`}
          goNext={goNext}
          goBack={goBack}
          restart={restart}
        />
      </AnimatePresence>
      <ProgressDots total={scenes.length} current={idx} onDotClick={goTo} />
    </>
  );
}

export default App;
