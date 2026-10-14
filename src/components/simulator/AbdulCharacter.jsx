import React from 'react';

/**
 * AbdulCharacter - Abdul Basith
 * An expressive, beautifully crafted cartoon character component.
 * Features stylish hoodie, chibi glasses, articulated poses, recoil and dizzy animations.
 */
export default function AbdulCharacter({
  pose = 'idle', // 'idle' | 'punch_prep' | 'punch_recoil' | 'punch_dizzy' | 'snack' | 'innocent' | 'dog'
  className = '',
}) {
  return (
    <div className={`character-wrapper abdul-wrapper pose-${pose} ${className}`}>
      {/* Dizzy stars above head during punch_dizzy */}
      {pose === 'punch_dizzy' && (
        <div className="character-dizzy-stars" aria-hidden="true">
          <span className="star star-1">⭐</span>
          <span className="star star-2">💫</span>
          <span className="star star-3">⭐</span>
        </div>
      )}

      {/* Sweat drop during punch_prep */}
      {pose === 'punch_prep' && (
        <div className="character-sweat-drop abdul-sweat" aria-hidden="true">
          💦
        </div>
      )}

      {/* Ground Shadow */}
      <div className="character-shadow" />

      {/* Main SVG Character Body */}
      <svg
        viewBox="0 0 100 140"
        className="character-svg abdul-svg"
        width="100"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="abdulHoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8E2FF" />
            <stop offset="100%" stopColor="#75C6F5" />
          </linearGradient>
          <linearGradient id="abdulPantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3F3758" />
            <stop offset="100%" stopColor="#2A243C" />
          </linearGradient>
          <linearGradient id="abdulHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E2433" />
            <stop offset="100%" stopColor="#1B151F" />
          </linearGradient>
          <linearGradient id="abdulSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4EC" />
            <stop offset="100%" stopColor="#FFE0CE" />
          </linearGradient>
        </defs>

        {/* --- Legs --- */}
        <g className="abdul-legs">
          {/* Left Leg */}
          <g className="abdul-leg abdul-leg-left">
            <rect x="36" y="102" width="10" height="24" rx="4" fill="url(#abdulPantsGrad)" />
            {/* Sneaker */}
            <ellipse cx="40" cy="128" rx="8" ry="4.5" fill="#75C6F5" />
            <rect x="35" y="127" width="10" height="3" rx="1.5" fill="#FFFFFF" />
          </g>

          {/* Right Leg */}
          <g className="abdul-leg abdul-leg-right">
            <rect x="54" y="102" width="10" height="24" rx="4" fill="url(#abdulPantsGrad)" />
            {/* Sneaker */}
            <ellipse cx="58" cy="128" rx="8" ry="4.5" fill="#75C6F5" />
            <rect x="53" y="127" width="10" height="3" rx="1.5" fill="#FFFFFF" />
          </g>
        </g>

        {/* --- Back Arm (Right Arm in SVG coordinates, facing away) --- */}
        <g className="abdul-back-arm">
          {pose === 'punch_recoil' ? (
            <path
              d="M68 70 C76 65 84 62 88 56"
              fill="none"
              stroke="url(#abdulHoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          ) : pose === 'dog' ? (
            // Waving arm to friendly dog
            <g className="abdul-waving-arm">
              <path
                d="M68 70 C76 62 82 52 86 44"
                fill="none"
                stroke="url(#abdulHoodieGrad)"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <circle cx="87" cy="42" r="5" fill="url(#abdulSkinGrad)" />
            </g>
          ) : (
            <path
              d="M68 72 C74 80 76 90 74 94"
              fill="none"
              stroke="url(#abdulHoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* --- Torso & Hoodie --- */}
        <g className="abdul-torso">
          {/* Main Hoodie */}
          <path
            d="M32 68 Q50 66 68 68 L66 104 Q50 106 34 104 Z"
            fill="url(#abdulHoodieGrad)"
          />
          {/* Kangaroo Pocket */}
          <path
            d="M40 88 Q50 86 60 88 L58 100 Q50 102 42 100 Z"
            fill="#5DB9EE"
            opacity="0.8"
          />
          {/* Hoodie Strings */}
          <line x1="47" y1="68" x2="47" y2="78" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="53" y1="68" x2="53" y2="78" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* --- Neck --- */}
        <rect x="46" y="58" width="8" height="12" rx="3" fill="url(#abdulSkinGrad)" />

        {/* --- Head --- */}
        <g className="abdul-head">
          {/* Face */}
          <ellipse cx="50" cy="45" rx="22" ry="20" fill="url(#abdulSkinGrad)" />
          {/* Ears */}
          <ellipse cx="28" cy="46" rx="4" ry="5.5" fill="url(#abdulSkinGrad)" />
          <ellipse cx="72" cy="46" rx="4" ry="5.5" fill="url(#abdulSkinGrad)" />

          {/* Cheeks Blush (subtle) */}
          <ellipse cx="38" cy="50" rx="4" ry="2" fill="#FFAAA6" opacity="0.4" />
          <ellipse cx="62" cy="50" rx="4" ry="2" fill="#FFAAA6" opacity="0.4" />

          {/* Facial Expressions */}
          {pose === 'punch_dizzy' ? (
            // Dizzy spiral eyes @_@
            <g className="eyes-punch-dizzy">
              {/* Spiral Left */}
              <path
                d="M38 42 A3 3 0 1 1 42 42 A2 2 0 1 1 40 42"
                fill="none"
                stroke="#2E2433"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Spiral Right */}
              <path
                d="M58 42 A3 3 0 1 1 62 42 A2 2 0 1 1 60 42"
                fill="none"
                stroke="#2E2433"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Wobbly wavy mouth */}
              <path
                d="M45 52 Q47 50 50 52 Q53 54 55 52"
                fill="none"
                stroke="#2E2433"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ) : pose === 'punch_recoil' ? (
            // Recoil shock eyes > <
            <g className="eyes-punch-recoil">
              <path d="M36 40 L44 44 L36 48" fill="none" stroke="#2E2433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M64 40 L56 44 L64 48" fill="none" stroke="#2E2433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Open shocked mouth */}
              <ellipse cx="50" cy="53" rx="3.5" ry="4" fill="#3D2B4F" />
            </g>
          ) : pose === 'snack' ? (
            // Delighted foodie eyes ^ ^
            <g className="eyes-snack">
              <path d="M37 43 Q41 37 45 43" fill="none" stroke="#2E2433" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M55 43 Q59 37 63 43" fill="none" stroke="#2E2433" strokeWidth="2.5" strokeLinecap="round" />
              {/* Happy smiling mouth */}
              <path d="M46 50 Q50 56 54 50 Z" fill="#D15077" />
            </g>
          ) : pose === 'innocent' ? (
            // Amused eyebrow raise / skeptical gaze
            <g className="eyes-innocent-skeptic">
              <path d="M36 38 Q41 36 44 39" fill="none" stroke="#2E2433" strokeWidth="2" strokeLinecap="round" />
              <path d="M56 36 Q60 33 64 36" fill="none" stroke="#2E2433" strokeWidth="2.2" strokeLinecap="round" />
              <ellipse cx="41" cy="43" rx="3.5" ry="4" fill="#2E2433" />
              <ellipse cx="59" cy="42" rx="3.5" ry="4" fill="#2E2433" />
              <circle cx="40" cy="42" r="1.2" fill="#FFFFFF" />
              <circle cx="58" cy="41" r="1.2" fill="#FFFFFF" />
              {/* Smirking mouth */}
              <path d="M47 52 Q51 54 54 51" fill="none" stroke="#2E2433" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : pose === 'punch_prep' ? (
            // Worried / cautious eyes
            <g className="eyes-punch-prep">
              <path d="M37 38 L44 40" stroke="#2E2433" strokeWidth="2" strokeLinecap="round" />
              <path d="M63 38 L56 40" stroke="#2E2433" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="41" cy="43" rx="3.5" ry="4" fill="#2E2433" />
              <ellipse cx="59" cy="43" rx="3.5" ry="4" fill="#2E2433" />
              {/* Nervous flat mouth */}
              <path d="M47 52 L53 52" stroke="#2E2433" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            // Default cheerful eyes
            <g className="eyes-idle">
              <ellipse cx="41" cy="43" rx="3.5" ry="4.5" fill="#2E2433" />
              <ellipse cx="59" cy="43" rx="3.5" ry="4.5" fill="#2E2433" />
              <circle cx="42" cy="41.5" r="1.5" fill="#FFFFFF" />
              <circle cx="60" cy="41.5" r="1.5" fill="#FFFFFF" />
              {/* Friendly smile */}
              <path d="M47 51 Q50 54 53 51" fill="none" stroke="#2E2433" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Nose */}
          <circle cx="50" cy="47" r="1" fill="#E8A99B" />

          {/* Stylish Glasses */}
          <g
            className="abdul-glasses"
            transform={pose === 'punch_recoil' ? 'rotate(-6, 50, 43)' : ''}
          >
            {/* Left rim */}
            <circle cx="41" cy="43" r="7.5" fill="none" stroke="#3D2B4F" strokeWidth="1.8" />
            {/* Right rim */}
            <circle cx="59" cy="43" r="7.5" fill="none" stroke="#3D2B4F" strokeWidth="1.8" />
            {/* Bridge */}
            <path d="M48.5 43 Q50 41 51.5 43" fill="none" stroke="#3D2B4F" strokeWidth="1.8" />
            {/* Left temple */}
            <path d="M33.5 43 L28 41" stroke="#3D2B4F" strokeWidth="1.6" />
            {/* Right temple */}
            <path d="M66.5 43 L72 41" stroke="#3D2B4F" strokeWidth="1.6" />
          </g>

          {/* Stylish Dark Hair */}
          <path
            d="M26 38 C28 20 72 20 74 38 C70 33 65 31 58 33 C52 30 44 32 38 31 C32 32 28 35 26 38 Z"
            fill="url(#abdulHairGrad)"
          />
          {/* Hair texture strands */}
          <path d="M42 24 Q48 18 54 23" fill="none" stroke="#483B50" strokeWidth="1.5" />
          <path d="M34 28 Q38 23 44 26" fill="none" stroke="#483B50" strokeWidth="1.5" />
        </g>

        {/* --- Front Arm (Left Arm in SVG coordinates, facing Koma) --- */}
        <g className="abdul-front-arm">
          {pose === 'punch_recoil' ? (
            // Hands flying back in shock!
            <path
              d="M32 70 C24 64 18 60 14 55"
              fill="none"
              stroke="url(#abdulHoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          ) : pose === 'snack' ? (
            // Reaching out eagerly for fries
            <path
              d="M32 72 C22 74 14 70 10 65"
              fill="none"
              stroke="url(#abdulHoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          ) : (
            // Normal resting front arm
            <path
              d="M32 72 C26 80 24 90 26 94"
              fill="none"
              stroke="url(#abdulHoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>
    </div>
  );
}
