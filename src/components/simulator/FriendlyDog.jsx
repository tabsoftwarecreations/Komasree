import React from 'react';

/**
 * FriendlyDog - Adorable, completely non-threatening puppy illustration.
 * Features wagging tail, friendly smiling mouth with tongue, walking/sitting cycle.
 */
export default function FriendlyDog({
  isSitting = false,
  className = '',
}) {
  return (
    <div className={`friendly-dog-wrapper ${isSitting ? 'dog-sitting' : 'dog-walking'} ${className}`}>
      {/* Ground Shadow */}
      <div className="dog-shadow" />

      <svg
        viewBox="0 0 90 75"
        className="dog-svg"
        width="80"
        height="68"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dogFurGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC875" />
            <stop offset="100%" stopColor="#FFA640" />
          </linearGradient>
          <linearGradient id="dogBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4E0" />
            <stop offset="100%" stopColor="#FFE4BF" />
          </linearGradient>
        </defs>

        {/* --- Wagging Tail --- */}
        <g className="dog-tail">
          <path
            d="M62 42 C72 35 78 26 76 20 C72 16 66 22 60 30"
            fill="url(#dogFurGrad)"
            stroke="#E08320"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        {/* --- Back Paws --- */}
        <g className="dog-paws-back">
          {/* Back Left Paw */}
          <ellipse cx="58" cy="62" rx="6" ry="4" fill="url(#dogFurGrad)" />
          {/* Back Right Paw */}
          <ellipse cx="48" cy="62" rx="6" ry="4" fill="url(#dogFurGrad)" />
        </g>

        {/* --- Body --- */}
        <ellipse cx="46" cy="46" rx="20" ry="15" fill="url(#dogFurGrad)" />
        {/* Soft lighter chest/belly */}
        <ellipse cx="38" cy="48" rx="12" ry="10" fill="url(#dogBellyGrad)" />

        {/* --- Front Paws --- */}
        <g className="dog-paws-front">
          {/* Front Left Paw */}
          <rect x="28" y="50" width="7" height="15" rx="3.5" fill="url(#dogFurGrad)" />
          <ellipse cx="31.5" cy="64" rx="5" ry="3.5" fill="url(#dogFurGrad)" />
          {/* Front Right Paw */}
          <rect x="38" y="50" width="7" height="15" rx="3.5" fill="url(#dogFurGrad)" />
          <ellipse cx="41.5" cy="64" rx="5" ry="3.5" fill="url(#dogFurGrad)" />
        </g>

        {/* --- Red Cute Collar with Golden Bell --- */}
        <path d="M22 36 Q30 40 38 36" stroke="#FF4767" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="30" cy="39" r="3" fill="#FFD700" stroke="#CC9900" strokeWidth="0.8" />

        {/* --- Head --- */}
        <g className="dog-head">
          {/* Head Base */}
          <circle cx="26" cy="26" rx="15" ry="14" fill="url(#dogFurGrad)" />

          {/* Floppy Left Ear */}
          <path
            d="M16 18 C12 22 8 30 11 36 C13 38 18 36 18 28 Z"
            fill="#E08A28"
          />
          {/* Floppy Right Ear */}
          <path
            d="M36 18 C40 22 44 30 41 36 C39 38 34 36 34 28 Z"
            fill="#E08A28"
          />

          {/* Snout */}
          <ellipse cx="23" cy="29" rx="8" ry="6" fill="url(#dogBellyGrad)" />

          {/* Cute Nose */}
          <ellipse cx="21" cy="26" rx="3" ry="2.2" fill="#3D2B4F" />

          {/* Smiling Open Mouth with Tongue */}
          <path d="M19 29 Q22 33 25 29" fill="none" stroke="#3D2B4F" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M21 31 C21 36 25 36 25 31 Z"
            fill="#FF7A9E"
            stroke="#E05075"
            strokeWidth="0.8"
          />

          {/* Sparkly Happy Puppy Eyes */}
          <ellipse cx="20" cy="21" rx="3" ry="3.5" fill="#3D2B4F" />
          <circle cx="21" cy="20" r="1.2" fill="#FFFFFF" />
          <ellipse cx="30" cy="21" rx="3" ry="3.5" fill="#3D2B4F" />
          <circle cx="31" cy="20" r="1.2" fill="#FFFFFF" />

          {/* Cute Cheeks */}
          <circle cx="15" cy="27" r="2.5" fill="#FFA5A5" opacity="0.6" />
          <circle cx="33" cy="27" r="2.5" fill="#FFA5A5" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
