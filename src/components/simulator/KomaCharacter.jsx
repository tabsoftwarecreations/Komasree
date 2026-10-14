import React from 'react';

/**
 * KomaCharacter - Komareddy Santhi Sree (Koma)
 * An expressive, beautifully crafted cartoon character component.
 * Supports dynamic poses, facial expressions, articulated arms, and running animation.
 */
export default function KomaCharacter({
  pose = 'idle', // 'idle' | 'punch_prep' | 'punch_strike' | 'snack' | 'innocent' | 'dog_alert' | 'dog_run' | 'dog_peek'
  className = '',
}) {
  return (
    <div className={`character-wrapper koma-wrapper pose-${pose} ${className}`}>
      {/* Halo for innocent pose */}
      {pose === 'innocent' && (
        <div className="character-halo" aria-hidden="true">
          <svg viewBox="0 0 60 25" width="50" height="20">
            <ellipse cx="30" cy="12" rx="24" ry="7" fill="none" stroke="#FFD700" strokeWidth="4" />
            <ellipse cx="30" cy="12" rx="24" ry="7" fill="none" stroke="#FFF7B2" strokeWidth="2" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* Alert mark for dog alert pose */}
      {pose === 'dog_alert' && (
        <div className="character-alert-bubble" aria-hidden="true">
          <span>❗</span>
        </div>
      )}

      {/* Sweat drop for dog alert / dog run */}
      {(pose === 'dog_alert' || pose === 'dog_run') && (
        <div className="character-sweat-drop" aria-hidden="true">
          💦
        </div>
      )}

      {/* Ground Shadow */}
      <div className="character-shadow" />

      {/* Main SVG Character Body */}
      <svg
        viewBox="0 0 100 140"
        className="character-svg koma-svg"
        width="100"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="komaDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9EBE" />
            <stop offset="100%" stopColor="#FF6B99" />
          </linearGradient>
          <linearGradient id="komaHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3F2B3E" />
            <stop offset="100%" stopColor="#251624" />
          </linearGradient>
          <linearGradient id="komaSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4EE" />
            <stop offset="100%" stopColor="#FFE3D4" />
          </linearGradient>
          <linearGradient id="gloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4869" />
            <stop offset="100%" stopColor="#D9163D" />
          </linearGradient>
        </defs>

        {/* --- Back Hair --- */}
        <path
          d="M26 35 C20 52 18 78 22 92 C28 97 38 98 42 90 C34 78 35 55 35 38 Z"
          fill="url(#komaHairGrad)"
        />
        <path
          d="M74 35 C80 52 82 78 78 92 C72 97 62 98 58 90 C66 78 65 55 65 38 Z"
          fill="url(#komaHairGrad)"
        />

        {/* --- Left Arm (Back Arm) --- */}
        <g className="koma-left-arm">
          {pose === 'dog_run' ? (
            <path
              d="M32 75 C24 82 15 88 12 78 C10 70 20 68 28 72 Z"
              fill="url(#komaSkinGrad)"
              stroke="#E8A99B"
              strokeWidth="1"
            />
          ) : (
            <path
              d="M32 75 C26 84 22 92 25 96 C29 100 35 94 36 86 Z"
              fill="url(#komaSkinGrad)"
              stroke="#E8A99B"
              strokeWidth="1"
            />
          )}
        </g>

        {/* --- Legs --- */}
        <g className="koma-legs">
          {/* Left Leg */}
          <g className="koma-leg koma-leg-left">
            <rect x="36" y="105" width="9" height="22" rx="4.5" fill="url(#komaSkinGrad)" />
            {/* White sock & pink shoe */}
            <rect x="35" y="118" width="11" height="5" rx="2" fill="#FFFFFF" />
            <ellipse cx="40" cy="128" rx="8" ry="4.5" fill="#FF5C94" />
          </g>

          {/* Right Leg */}
          <g className="koma-leg koma-leg-right">
            <rect x="55" y="105" width="9" height="22" rx="4.5" fill="url(#komaSkinGrad)" />
            {/* White sock & pink shoe */}
            <rect x="54" y="118" width="11" height="5" rx="2" fill="#FFFFFF" />
            <ellipse cx="60" cy="128" rx="8" ry="4.5" fill="#FF5C94" />
          </g>
        </g>

        {/* --- Torso & Dress --- */}
        <g className="koma-torso">
          {/* Dress Body */}
          <path
            d="M35 70 Q50 68 65 70 L72 106 Q50 110 28 106 Z"
            fill="url(#komaDressGrad)"
          />
          {/* White Peter Pan Collar */}
          <path
            d="M40 70 C44 75 49 75 50 71 C51 75 56 75 60 70"
            fill="#FFFFFF"
            stroke="#FFB8D4"
            strokeWidth="1.5"
          />
          {/* Cute decorative button/heart */}
          <circle cx="50" cy="82" r="2.5" fill="#FFFFFF" />
          <circle cx="50" cy="92" r="2.5" fill="#FFFFFF" />
        </g>

        {/* --- Neck --- */}
        <rect x="46" y="60" width="8" height="12" rx="3" fill="url(#komaSkinGrad)" />

        {/* --- Head --- */}
        <g className="koma-head">
          {/* Face */}
          <ellipse cx="50" cy="46" rx="23" ry="21" fill="url(#komaSkinGrad)" />
          {/* Ears */}
          <ellipse cx="27" cy="48" rx="4" ry="5.5" fill="url(#komaSkinGrad)" />
          <ellipse cx="73" cy="48" rx="4" ry="5.5" fill="url(#komaSkinGrad)" />

          {/* Cheeks Blush */}
          <ellipse cx="37" cy="52" rx="4.5" ry="2.5" fill="#FF94B8" opacity="0.65" />
          <ellipse cx="63" cy="52" rx="4.5" ry="2.5" fill="#FF94B8" opacity="0.65" />

          {/* Facial Expressions */}
          {pose === 'innocent' && (
            // Innocent: big wide doe eyes looking up & shy smile
            <g className="eyes-innocent">
              <ellipse cx="40" cy="43" rx="4.5" ry="5.5" fill="#362235" />
              <ellipse cx="60" cy="43" rx="4.5" ry="5.5" fill="#362235" />
              {/* Star sparkles in eyes */}
              <circle cx="41.5" cy="41" r="2" fill="#FFFFFF" />
              <circle cx="61.5" cy="41" r="2" fill="#FFFFFF" />
              <circle cx="38.5" cy="45" r="1" fill="#FFFFFF" />
              <circle cx="58.5" cy="45" r="1" fill="#FFFFFF" />
              {/* Sweet innocent smile */}
              <path d="M47 53 Q50 56 53 53" fill="none" stroke="#D15077" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {pose === 'punch_prep' && (
            // Playful smirk & mischievous wink/eyes
            <g className="eyes-punch-prep">
              <path d="M36 43 Q40 39 44 43" fill="none" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="60" cy="42" rx="4" ry="4.5" fill="#362235" />
              <circle cx="61" cy="41" r="1.5" fill="#FFFFFF" />
              {/* Smirk */}
              <path d="M47 53 Q52 56 55 52" fill="none" stroke="#D15077" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          )}

          {pose === 'punch_strike' && (
            // Determined cute battle cry expression!
            <g className="eyes-punch-strike">
              <path d="M36 41 L44 44" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M64 41 L56 44" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" />
              {/* Excited open mouth */}
              <path d="M46 51 Q50 58 54 51 Z" fill="#D15077" />
            </g>
          )}

          {pose === 'dog_alert' && (
            // Wide surprised eyes O.O
            <g className="eyes-dog-alert">
              <ellipse cx="40" cy="43" rx="5" ry="6" fill="#FFFFFF" stroke="#362235" strokeWidth="2" />
              <circle cx="40" cy="43" r="2.5" fill="#362235" />
              <ellipse cx="60" cy="43" rx="5" ry="6" fill="#FFFFFF" stroke="#362235" strokeWidth="2" />
              <circle cx="60" cy="43" r="2.5" fill="#362235" />
              {/* Shocked O mouth */}
              <ellipse cx="50" cy="54" rx="3" ry="4" fill="#D15077" />
            </g>
          )}

          {pose === 'dog_run' && (
            // Anime panic eyes > <
            <g className="eyes-dog-run">
              <path d="M36 40 L44 44 L36 48" fill="none" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M64 40 L56 44 L64 48" fill="none" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Screaming open mouth */}
              <ellipse cx="50" cy="54" rx="4.5" ry="5.5" fill="#D15077" />
            </g>
          )}

          {pose === 'dog_peek' && (
            // Relieved/nervous eyes looking back
            <g className="eyes-dog-peek">
              <ellipse cx="40" cy="43" rx="4" ry="4.5" fill="#362235" />
              <ellipse cx="60" cy="43" rx="4" ry="4.5" fill="#362235" />
              <circle cx="42" cy="42" r="1.5" fill="#FFFFFF" />
              <circle cx="62" cy="42" r="1.5" fill="#FFFFFF" />
              <path d="M47 53 Q50 55 53 53" fill="none" stroke="#D15077" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {pose === 'snack' && (
            // Joyful smiling eyes ^ ^
            <g className="eyes-snack">
              <path d="M36 44 Q40 38 44 44" fill="none" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M56 44 Q60 38 64 44" fill="none" stroke="#362235" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M46 52 Q50 57 54 52" fill="none" stroke="#D15077" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          )}

          {pose === 'idle' && (
            // Default cheerful eyes
            <g className="eyes-idle">
              <ellipse cx="40" cy="43" rx="4" ry="5" fill="#362235" />
              <ellipse cx="60" cy="43" rx="4" ry="5" fill="#362235" />
              <circle cx="41.5" cy="41.5" r="1.8" fill="#FFFFFF" />
              <circle cx="61.5" cy="41.5" r="1.8" fill="#FFFFFF" />
              <circle cx="39" cy="45" r="0.8" fill="#FFFFFF" />
              <circle cx="59" cy="45" r="0.8" fill="#FFFFFF" />
              {/* Sweet smile */}
              <path d="M47 53 Q50 56 53 53" fill="none" stroke="#D15077" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Nose */}
          <circle cx="50" cy="48.5" r="1" fill="#E8A99B" />

          {/* Front Hair Bangs */}
          <path
            d="M26 40 C30 25 70 25 74 40 C68 36 60 40 50 36 C40 40 32 36 26 40 Z"
            fill="url(#komaHairGrad)"
          />
          {/* Side bangs */}
          <path d="M26 40 C28 48 30 56 32 60 C30 54 28 46 26 40 Z" fill="url(#komaHairGrad)" />
          <path d="M74 40 C72 48 70 56 68 60 C70 54 72 46 74 40 Z" fill="url(#komaHairGrad)" />

          {/* Signature Pink Ribbon 🎀 */}
          <g className="koma-ribbon" transform="translate(62, 22) scale(0.9)">
            {/* Left bow loop */}
            <path d="M0 8 C-8 2 -12 12 -2 14 Z" fill="#FF5C94" stroke="#D9286C" strokeWidth="1" />
            {/* Right bow loop */}
            <path d="M4 8 C12 2 16 12 6 14 Z" fill="#FF5C94" stroke="#D9286C" strokeWidth="1" />
            {/* Bow center knot */}
            <circle cx="2" cy="10" r="3.5" fill="#FFA5C6" stroke="#D9286C" strokeWidth="1" />
            {/* Ribbon ribbons hanging */}
            <path d="M-1 12 L-4 22 L0 20 Z" fill="#FF5C94" />
            <path d="M5 12 L8 22 L4 20 Z" fill="#FF5C94" />
          </g>
        </g>

        {/* --- Right Arm (Action Arm) --- */}
        <g className="koma-right-arm">
          {pose === 'punch_prep' && (
            // Pulled back with red boxing glove
            <g transform="translate(10, 0)">
              <path
                d="M65 72 C60 76 56 84 58 90"
                fill="none"
                stroke="url(#komaSkinGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Boxing Glove */}
              <circle cx="56" cy="92" r="8.5" fill="url(#gloveGrad)" stroke="#B30F30" strokeWidth="1.5" />
              <ellipse cx="53" cy="94" rx="4" ry="5" fill="#FF7894" />
            </g>
          )}

          {pose === 'punch_strike' && (
            // Lunged forward punch!
            <g className="punch-arm-strike">
              <path
                d="M65 72 L92 72"
                stroke="url(#komaSkinGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Speed lines */}
              <path d="M68 66 L86 66" stroke="#FFA3BF" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M70 78 L88 78" stroke="#FFA3BF" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Boxing Glove landing forward */}
              <circle cx="96" cy="72" r="10" fill="url(#gloveGrad)" stroke="#B30F30" strokeWidth="1.5" />
              <ellipse cx="98" cy="70" rx="4" ry="5.5" fill="#FF7894" />
            </g>
          )}

          {pose === 'snack' && (
            // Gesturing happily forward
            <path
              d="M65 74 C75 75 84 68 86 62"
              fill="none"
              stroke="url(#komaSkinGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}

          {pose === 'dog_run' && (
            // Arm pumping in sprint motion
            <path
              d="M65 74 C75 80 82 86 86 78"
              fill="none"
              stroke="url(#komaSkinGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}

          {(pose === 'idle' || pose === 'innocent' || pose === 'dog_alert' || pose === 'dog_peek') && (
            // Relaxed / natural front arm
            <path
              d="M65 74 C72 82 74 92 72 96"
              fill="none"
              stroke="url(#komaSkinGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>
    </div>
  );
}
