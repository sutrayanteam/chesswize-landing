import React, { useId } from 'react';

export type IconProps = {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
} & Omit<React.SVGProps<SVGSVGElement>, 'stroke' | 'fill' | 'width' | 'height' | 'viewBox' | 'strokeWidth'>;

const baseSvgProps = {
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  role: 'img' as const,
};

export function CheckMark({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" transform="rotate(45 12 12)" />
      <path d="M8.5 12.5 L11.5 15.5 L16.5 9.5" />
    </svg>
  );
}

export function SolidCheck({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
      <path d="M8 12.5 L11 15.5 L16.5 9.5" stroke="#ffffff" strokeWidth={strokeWidth + 0.4} />
    </svg>
  );
}

export function Shield({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* rook-inspired castellated top + shield body */}
      <path d="M6 5 L6 3 L9 3 L9 5 L11 5 L11 3 L13 3 L13 5 L15 5 L15 3 L18 3 L18 5 V11 C18 16.5 12 21 12 21 C12 21 6 16.5 6 11 Z" />
      {/* inner rook/crown detail */}
      <path d="M10 9 V12 L12 13 L14 12 V9" />
    </svg>
  );
}

export function Trophy({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <path d="M8 21 H16 M12 17 V21 M9 17 H15" />
      <path d="M5 3 H19 L17.5 10 C16.5 14.5 12 17 12 17 C12 17 7.5 14.5 6.5 10 L5 3 Z" />
      <path d="M5 5 C2 5 2 11 6.5 10" />
      <path d="M19 5 C22 5 22 11 17.5 10" />
      {/* subtle cup detail */}
      <path d="M9.5 7 H14.5" strokeOpacity="0.5" />
    </svg>
  );
}

export function TrophyGold({ size = 24, className, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden={ariaHidden} className={className} {...rest}>
      <defs>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
      <path d="M5 3 H19 L17.5 10 C16.5 14.5 12 17 12 17 C12 17 7.5 14.5 6.5 10 L5 3 Z" fill={`url(#gold-${id})`} stroke="#78350F" strokeWidth={1} strokeLinejoin="round" />
      <path d="M5 5 C2 5 2 11 6.5 10" fill="none" stroke={`url(#gold-${id})`} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M19 5 C22 5 22 11 17.5 10" fill="none" stroke={`url(#gold-${id})`} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M8 21 H16 M12 17 V21 M9.5 17 H14.5" fill="none" stroke="#78350F" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {/* cup highlight */}
      <path d="M8 5 Q 12 3.5 16 5" fill="none" stroke="#FFFBEB" strokeOpacity="0.7" strokeWidth={1} strokeLinecap="round" />
    </svg>
  );
}

export function SealBadge({ size = 24, className, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden={ariaHidden} className={className} {...rest}>
      <defs>
        <linearGradient id={`seal-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      {/* 8-pointed star */}
      <path d="M 12 1.5 L 14.6 5.3 L 19.1 4.4 L 18.2 8.9 L 22 11.5 L 18.2 14.1 L 19.1 18.6 L 14.6 17.7 L 12 21.5 L 9.4 17.7 L 4.9 18.6 L 5.8 14.1 L 2 11.5 L 5.8 8.9 L 4.9 4.4 L 9.4 5.3 Z" fill={`url(#seal-${id})`} stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.5" strokeLinejoin="round" />
      {/* crown inside */}
      <path d="M 8.5 14 H 15.5 V 12.5 L 14 13.5 L 13 11.5 L 12 13 L 11 11.5 L 10 13.5 L 8.5 12.5 Z" fill="#ffffff" fillOpacity="0.92" stroke="none" />
    </svg>
  );
}

export function BrainChess({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* head silhouette */}
      <path d="M5 11 C5 6.5 8.5 3.5 12 3.5 C15.5 3.5 19 6.5 19 11 C19 13.3 18 15.2 16.5 16.5 V20.5 H8 V17.5 C8 17 7.8 16.8 7.4 16.5 C6 15.3 5 13.3 5 11 Z" />
      {/* knight horse head inside — stylized */}
      <path d="M10 15 V11.5 C10 10.5 10.5 9.5 11.5 9 L12.5 7.5 L14 8.5 C14.5 9.5 14.5 10.5 14 11.5 V12 L15 12.5 L14.5 14.5 L13.5 14 V15 Z" fill="currentColor" fillOpacity="0.15" />
      {/* eye */}
      <circle cx="12.8" cy="10.2" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Target({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      {/* chessboard 2x2 at center */}
      <rect x="10.5" y="10.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
      <rect x="12" y="12" width="1.5" height="1.5" fill="currentColor" stroke="none" />
      <rect x="10.5" y="10.5" width="3" height="3" strokeWidth={strokeWidth * 0.7} />
    </svg>
  );
}

export function BookOpen({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <path d="M 2.5 5.5 C 2.5 5.5 6 4 11.5 5.5 L 11.5 20 C 6 18.5 2.5 20 2.5 20 Z" />
      <path d="M 21.5 5.5 C 21.5 5.5 18 4 12.5 5.5 L 12.5 20 C 18 18.5 21.5 20 21.5 20 Z" />
      <path d="M 5 9 H 9" strokeOpacity="0.5" />
      <path d="M 5 12 H 9" strokeOpacity="0.5" />
      <path d="M 15 9 H 19" strokeOpacity="0.5" />
      <path d="M 15 12 H 19" strokeOpacity="0.5" />
    </svg>
  );
}

export function PlayCircle({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M 10 8.5 L 15.5 12 L 10 15.5 Z" fill="currentColor" />
      {/* rec dot */}
      <circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CalendarCheck({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M 8 3 V 7 M 16 3 V 7" />
      <path d="M 3.5 10 H 20.5" />
      <path d="M 8.5 15 L 11 17.5 L 15.5 12.5" />
    </svg>
  );
}

export function SparkStar({ size = 24, className, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden={ariaHidden} className={className} {...rest}>
      <defs>
        <linearGradient id={`star-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <path d="M 12 2.5 L 14.6 8.8 L 21.5 9.3 L 16.2 13.8 L 17.8 20.5 L 12 16.9 L 6.2 20.5 L 7.8 13.8 L 2.5 9.3 L 9.4 8.8 Z" fill={`url(#star-${id})`} stroke="none" />
      {/* inner highlight */}
      <path d="M 9 7.5 L 12 5 L 13 7" stroke="#ffffff" strokeOpacity="0.35" strokeWidth={1} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Benefit pill icons — one per micro-concept ─── */

// FOCUS: a targeting eye — almond-shaped eye, iris, pupil, four crosshair ticks outside
export function FocusIcon({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* eye outline */}
      <path d="M 2.5 12 C 5 7 8.5 5 12 5 C 15.5 5 19 7 21.5 12 C 19 17 15.5 19 12 19 C 8.5 19 5 17 2.5 12 Z" />
      {/* iris */}
      <circle cx="12" cy="12" r="3.2" />
      {/* pupil */}
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      {/* crosshair ticks */}
      <path d="M 12 2.5 V 3.5 M 12 20.5 V 21.5 M 1 12 H 2 M 22 12 H 23" strokeWidth={strokeWidth * 0.9} />
      {/* iris highlight */}
      <circle cx="13.3" cy="10.8" r="0.5" fill="currentColor" stroke="none" opacity="0.55" />
    </svg>
  );
}

// LOGIC: three interconnected nodes forming a triangular decision graph
export function LogicIcon({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* connection lines (behind nodes) */}
      <path d="M 12 6.5 L 6.5 17 M 12 6.5 L 17.5 17 M 6.5 17 H 17.5" strokeOpacity="0.55" />
      {/* root node */}
      <circle cx="12" cy="5" r="2.4" fill="currentColor" stroke="none" />
      {/* left child */}
      <circle cx="6" cy="18" r="2.4" />
      {/* right child */}
      <circle cx="18" cy="18" r="2.4" />
      {/* decision marker inside root */}
      <path d="M 11 4.6 L 12 5.5 L 13.4 4.2" stroke="#ffffff" strokeWidth={strokeWidth * 0.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// MATH: a framed operator grid (+ − × =) like a calculator face
export function MathIcon({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* frame */}
      <rect x="3" y="3" width="18" height="18" rx="3.2" />
      {/* divider cross */}
      <path d="M 12 5 V 19 M 5 12 H 19" strokeOpacity="0.4" />
      {/* plus (top-left) */}
      <path d="M 7 8.5 V 10.5 M 6 9.5 H 8" />
      {/* minus (top-right) */}
      <path d="M 15.5 9.5 H 17.5" />
      {/* multiply × (bottom-left) */}
      <path d="M 6.2 14.3 L 8 16.1 M 8 14.3 L 6.2 16.1" />
      {/* equals = (bottom-right) */}
      <path d="M 15.5 14.5 H 17.5 M 15.5 16 H 17.5" />
    </svg>
  );
}

// PATIENCE: hourglass with top & bottom sand + a single falling grain through the neck
export function PatienceIcon({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* top and bottom caps */}
      <path d="M 6 3 H 18 M 6 21 H 18" />
      {/* outer hourglass silhouette */}
      <path d="M 7 3 V 6 C 7 8 12 10.5 12 12 C 12 13.5 7 16 7 18 V 21" />
      <path d="M 17 3 V 6 C 17 8 12 10.5 12 12 C 12 13.5 17 16 17 18 V 21" />
      {/* top sand (filled triangle) */}
      <path d="M 8.2 5 H 15.8 L 12 10 Z" fill="currentColor" stroke="none" opacity="0.75" />
      {/* bottom sand heap */}
      <path d="M 8.2 19 H 15.8 Q 12 17 12 14.5 Q 12 17 8.2 19 Z" fill="currentColor" stroke="none" opacity="0.75" />
      {/* falling grain */}
      <circle cx="12" cy="12.8" r="0.45" fill="currentColor" stroke="none" />
    </svg>
  );
}

// CONFIDENCE: a mountain peak with a flag planted at the summit
export function ConfidenceIcon({ size = 24, className, strokeWidth = 1.8, 'aria-hidden': ariaHidden = true, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseSvgProps} strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} {...rest}>
      {/* back/smaller mountain */}
      <path d="M 3 20 L 9 11 L 13 17" strokeOpacity="0.5" />
      {/* main mountain */}
      <path d="M 2 20 H 22 L 15 6.5 L 10.5 14 L 8 11.5 L 2 20 Z" />
      {/* snow cap */}
      <path d="M 13.2 10 L 15 6.5 L 16.8 10 Z" fill="currentColor" stroke="none" />
      {/* flag pole */}
      <path d="M 15 6.5 V 2.5" />
      {/* flag */}
      <path d="M 15 2.7 L 18.5 3.6 L 15 4.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
