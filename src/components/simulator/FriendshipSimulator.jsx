import React, { useState, useEffect, useRef, useCallback } from 'react';
import KomaCharacter from './KomaCharacter';
import AbdulCharacter from './AbdulCharacter';
import FriendlyDog from './FriendlyDog';
import './simulator.css';

/**
 * FriendshipSimulator Component
 * Interactive character animation playground for Koma & Abdul.
 * Implements 4 complete choreographed cartoon sequences:
 * 1. PUNCH ABDUL 🥊
 * 2. SNACK BREAK 🍟
 * 3. ACT INNOCENT 😇
 * 4. DOG ENCOUNTER 🐶
 */
export default function FriendshipSimulator({ goNext }) {
  // Simulator Animation State
  const [activeAction, setActiveAction] = useState(null);
  const [komaPose, setKomaPose] = useState('idle');
  const [abdulPose, setAbdulPose] = useState('idle');
  const [isStageShaking, setIsStageShaking] = useState(false);
  const [showComicImpact, setShowComicImpact] = useState(false);
  const [showSnackProps, setShowSnackProps] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showTLNotification, setShowTLNotification] = useState(false);
  const [showKomaBubble, setShowKomaBubble] = useState(false);
  const [showCaseStamp, setShowCaseStamp] = useState(false);
  const [dogEntered, setDogEntered] = useState(false);
  const [dogSitting, setDogSitting] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);

  // Store active timer IDs for clean interruption handling
  const timersRef = useRef([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Reset all temporary visual elements
  const resetVisuals = useCallback(() => {
    clearAllTimers();
    setIsStageShaking(false);
    setShowComicImpact(false);
    setShowSnackProps(false);
    setShowReceipt(false);
    setShowTLNotification(false);
    setShowKomaBubble(false);
    setShowCaseStamp(false);
    setDogEntered(false);
    setDogSitting(false);
    setShowDust(false);
  }, [clearAllTimers]);

  // ─── ACTION 1: PUNCH ABDUL 🥊 ─────────────────────────
  const triggerPunch = useCallback(() => {
    resetVisuals();
    setActiveAction('punch');
    setResultMessage(null);

    // Phase 1: Preparation (0ms - 350ms)
    setKomaPose('punch_prep');
    setAbdulPose('punch_prep');

    // Phase 2: Lunge & Strike (350ms)
    addTimer(() => {
      setKomaPose('punch_strike');
      setAbdulPose('punch_recoil');
      setIsStageShaking(true);
      setShowComicImpact(true);
    }, 350);

    // Phase 3: Settle shake (620ms)
    addTimer(() => {
      setIsStageShaking(false);
    }, 620);

    // Phase 4: Abdul Dizzy & Impact clears (850ms)
    addTimer(() => {
      setShowComicImpact(false);
      setKomaPose('idle');
      setAbdulPose('punch_dizzy');
    }, 850);

    // Phase 5: Recovery & Result (1700ms)
    addTimer(() => {
      setAbdulPose('idle');
      setResultMessage({
        emoji: '💥',
        text: 'CRITICAL HIT! 💥 Abdul Basith has been reminded why he should never argue with Koma.',
      });
    }, 1700);
  }, [resetVisuals, addTimer]);

  // ─── ACTION 2: SNACK BREAK 🍟 ─────────────────────────
  const triggerSnack = useCallback(() => {
    resetVisuals();
    setActiveAction('snack');
    setResultMessage(null);

    // Phase 1: Characters turn towards snack (0ms)
    setKomaPose('snack');
    setAbdulPose('snack');
    setShowSnackProps(true);

    // Phase 2: Receipt slides down (850ms)
    addTimer(() => {
      setShowReceipt(true);
    }, 850);

    // Phase 3: Final result message (1500ms)
    addTimer(() => {
      setResultMessage({
        emoji: '🍟',
        text: "Transaction successful! Koma has sponsored another snack break. Abdul Basith's wallet remains untouched. 😂",
      });
    }, 1500);
  }, [resetVisuals, addTimer]);

  // ─── ACTION 3: ACT INNOCENT 😇 ────────────────────────
  const triggerInnocent = useCallback(() => {
    resetVisuals();
    setActiveAction('innocent');
    setResultMessage(null);

    // Phase 1: Suspicious moment, halo appears (0ms)
    setKomaPose('innocent');
    setAbdulPose('innocent');

    // Phase 2: Team leader dialogue notification appears (500ms)
    addTimer(() => {
      setShowTLNotification(true);
    }, 500);

    // Phase 3: Koma's innocent reply bubble appears (1500ms)
    addTimer(() => {
      setShowKomaBubble(true);
    }, 1500);

    // Phase 4: Punchline stamp lands (2500ms)
    addTimer(() => {
      setShowCaseStamp(true);
    }, 2500);

    // Phase 5: Final Result (3200ms)
    addTimer(() => {
      setResultMessage({
        emoji: '😇',
        text: 'Team leader: Koma, can you explain what happened here?\nKoma: Actually, sir... 👀\nCase status: Still under investigation. 😂',
      });
    }, 3200);
  }, [resetVisuals, addTimer]);

  // ─── ACTION 4: DOG ENCOUNTER 🐶 ───────────────────────
  const triggerDog = useCallback(() => {
    resetVisuals();
    setActiveAction('dog');
    setResultMessage(null);

    // Phase 1: Peaceful start (0ms)
    setKomaPose('idle');
    setAbdulPose('idle');

    // Phase 2: Dog trots into scene from right (300ms)
    addTimer(() => {
      setDogEntered(true);
    }, 300);

    // Phase 3: Koma notices the dog! (1200ms)
    addTimer(() => {
      setKomaPose('dog_alert');
      setAbdulPose('dog'); // Abdul waves happily
    }, 1200);

    // Phase 4: Comical escape! Koma sprints left (1700ms)
    addTimer(() => {
      setKomaPose('dog_run');
      setShowDust(true);
    }, 1700);

    // Phase 5: Dog happily sits down (2500ms)
    addTimer(() => {
      setShowDust(false);
      setDogSitting(true);
    }, 2500);

    // Phase 6: Koma peeks back safely from the left edge (2700ms)
    addTimer(() => {
      setKomaPose('dog_peek');
    }, 2700);

    // Phase 7: Result text (3300ms)
    addTimer(() => {
      setResultMessage({
        emoji: '🐕',
        text: 'WARNING: UNEXPECTED DOG DETECTED! Komasree.exe has stopped responding. 🐕😂',
      });
    }, 3300);
  }, [resetVisuals, addTimer]);

  return (
    <div className="content-card simulator-card">
      <span className="scene-emoji">⚔️</span>
      <h2 className="scene-title">The Koma vs. Abdul Simulator</h2>
      <p className="scene-subtitle">Choose your action wisely, Koma.</p>

      {/* ─── Animated Character Stage ─── */}
      <div
        className={`simulator-stage ${isStageShaking ? 'stage-shake' : ''}`}
        aria-live="polite"
      >
        {/* Koma on Left */}
        <KomaCharacter pose={komaPose} />

        {/* Abdul on Right */}
        <AbdulCharacter pose={abdulPose} />

        {/* Friendly Dog (Enters during dog encounter) */}
        {activeAction === 'dog' && (
          <FriendlyDog
            isSitting={dogSitting}
            className={dogEntered ? 'dog-entered' : ''}
          />
        )}

        {/* Dust Puff FX during Dog Sprint */}
        {showDust && <span className="running-dust" aria-hidden="true">💨</span>}

        {/* Comic Impact POW! Starburst during Punch */}
        {showComicImpact && (
          <div className="comic-impact-fx" aria-hidden="true">
            <div className="impact-starburst">
              <span>POW!</span>
              <span>💥</span>
            </div>
          </div>
        )}

        {/* Snack Prop (Fries) during Snack Break */}
        {showSnackProps && (
          <div className="snack-container" aria-hidden="true">
            <span className="snack-sparkles">✨🍟✨</span>
            <svg viewBox="0 0 60 65" width="55" height="60">
              <defs>
                <linearGradient id="fryBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF4F64" />
                  <stop offset="100%" stopColor="#D91632" />
                </linearGradient>
                <linearGradient id="fryGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="100%" stopColor="#F5B300" />
                </linearGradient>
              </defs>
              {/* Crispy French Fries sticking out */}
              <rect x="14" y="8" width="6" height="32" rx="2" fill="url(#fryGold)" transform="rotate(-8 17 24)" />
              <rect x="23" y="4" width="7" height="35" rx="2" fill="url(#fryGold)" transform="rotate(-2 26 21)" />
              <rect x="33" y="6" width="6" height="33" rx="2" fill="url(#fryGold)" transform="rotate(6 36 22)" />
              <rect x="41" y="10" width="6" height="30" rx="2" fill="url(#fryGold)" transform="rotate(14 44 25)" />
              {/* Red Fry Box */}
              <path d="M10 26 L16 58 Q30 62 44 58 L50 26 Q30 32 10 26 Z" fill="url(#fryBoxGrad)" />
              {/* Kawaii Face on box */}
              <circle cx="26" cy="44" r="1.8" fill="#FFFFFF" />
              <circle cx="34" cy="44" r="1.8" fill="#FFFFFF" />
              <path d="M28 47 Q30 50 32 47" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* Fictional Snack Break Receipt */}
        {showReceipt && (
          <div className="receipt-card" role="region" aria-label="Snack Receipt">
            <div className="receipt-header">🧾 SNACK BREAK RECEIPT</div>
            <div className="receipt-row">
              <span>Sponsored by:</span>
              <strong>Koma 💗</strong>
            </div>
            <div className="receipt-row">
              <span>Beneficiary:</span>
              <strong>Abdul Basith</strong>
            </div>
            <div className="receipt-row">
              <span>Status:</span>
              <span>Transaction successful!</span>
            </div>
            <div className="receipt-footer">
              Abdul's wallet remains untouched. 😂
            </div>
          </div>
        )}

        {/* Team Leader Dialogue Notification */}
        {showTLNotification && (
          <div className="team-leader-alert" role="status">
            <div className="tl-header">
              <span>📢</span>
              <span>Team Leader</span>
            </div>
            <div className="tl-body">
              "Koma, can you explain what happened here?"
            </div>
          </div>
        )}

        {/* Koma's Speech Bubble */}
        {showKomaBubble && (
          <div className="koma-speech-bubble" role="status">
            Actually, sir... 👀
          </div>
        )}

        {/* Case Status Investigation Stamp */}
        {showCaseStamp && (
          <div className="case-status-stamp" role="status">
            <div className="stamp-title">CASE STATUS</div>
            <div className="stamp-sub">Still under investigation. 😂</div>
          </div>
        )}
      </div>

      {/* ─── Action Buttons Grid ─── */}
      <div className="action-grid" role="group" aria-label="Friendship Simulator Actions">
        <button
          type="button"
          className={`btn btn-action ${activeAction === 'punch' ? 'btn-action-active' : ''}`}
          onClick={triggerPunch}
          aria-label="Punch Abdul"
        >
          🥊 Punch Abdul
        </button>

        <button
          type="button"
          className={`btn btn-action ${activeAction === 'snack' ? 'btn-action-active' : ''}`}
          onClick={triggerSnack}
          aria-label="Snack Break"
        >
          🍟 Snack Break
        </button>

        <button
          type="button"
          className={`btn btn-action ${activeAction === 'innocent' ? 'btn-action-active' : ''}`}
          onClick={triggerInnocent}
          aria-label="Act Innocent"
        >
          😇 Act Innocent
        </button>

        <button
          type="button"
          className={`btn btn-action ${activeAction === 'dog' ? 'btn-action-active' : ''}`}
          onClick={triggerDog}
          aria-label="Dog Encounter"
        >
          🐶 Dog Encounter
        </button>
      </div>

      {/* ─── Result Text Popup ─── */}
      {resultMessage && (
        <div
          key={resultMessage.text}
          className="reaction-popup simulator-reaction-popup"
          role="status"
        >
          <span className="reaction-popup-emoji">
            {resultMessage.emoji}
          </span>
          <div className="reaction-popup-text">
            {resultMessage.text}
          </div>
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary"
        onClick={goNext}
      >
        Continue the Adventure →
      </button>
    </div>
  );
}
