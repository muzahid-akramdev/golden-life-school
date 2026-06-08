interface LogoProps {
  size?: number
  className?: string
}

export default function SchoolLogo({ size = 60, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="#1D5FA8" stroke="#162B54" strokeWidth="2"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="#D97706" strokeWidth="1.5"/>

      {/* Book shape */}
      <rect x="28" y="38" width="44" height="32" rx="2" fill="white" opacity="0.15"/>
      <rect x="28" y="38" width="21" height="32" rx="2" fill="white" opacity="0.9"/>
      <rect x="51" y="38" width="21" height="32" rx="2" fill="#E8F0FB" opacity="0.9"/>
      <line x1="50" y1="38" x2="50" y2="70" stroke="#1D5FA8" strokeWidth="1"/>

      {/* Book pages lines */}
      <line x1="33" y1="47" x2="46" y2="47" stroke="#1D5FA8" strokeWidth="1.2" opacity="0.6"/>
      <line x1="33" y1="52" x2="46" y2="52" stroke="#1D5FA8" strokeWidth="1.2" opacity="0.6"/>
      <line x1="33" y1="57" x2="46" y2="57" stroke="#1D5FA8" strokeWidth="1.2" opacity="0.6"/>
      <line x1="54" y1="47" x2="67" y2="47" stroke="#1D5FA8" strokeWidth="1.2" opacity="0.6"/>
      <line x1="54" y1="52" x2="67" y2="52" stroke="#1D5FA8" strokeWidth="1.2" opacity="0.6"/>
      <line x1="54" y1="57" x2="67" y2="57" stroke="#1D5FA8" strokeWidth="1.2" opacity="0.6"/>

      {/* Torch/flame above book */}
      <ellipse cx="50" cy="32" rx="5" ry="7" fill="#D97706"/>
      <ellipse cx="50" cy="34" rx="3" ry="4" fill="#FEF3C7"/>
      <rect x="48" y="37" width="4" height="5" fill="#D97706"/>

      {/* Stars */}
      <circle cx="22" cy="30" r="2" fill="#D97706"/>
      <circle cx="78" cy="30" r="2" fill="#D97706"/>
      <circle cx="18" cy="52" r="1.5" fill="#D97706" opacity="0.7"/>
      <circle cx="82" cy="52" r="1.5" fill="#D97706" opacity="0.7"/>

      {/* GL text */}
      <text x="50" y="88" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontFamily="serif" fontWeight="700" letterSpacing="2">GL</text>
    </svg>
  )
}
