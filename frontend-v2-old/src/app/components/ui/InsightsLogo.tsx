type Props = {
  size?: number
  className?: string
}

export default function InsightsLogo({ size = 20, className }: Props) {
  return (
    <div
      className={`rounded-md bg-[#111] flex items-center justify-center shrink-0 ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 14 14" width={size * 0.68} height={size * 0.68} fill="none" aria-hidden>
        <circle cx="3.5" cy="3.5" r="1.8" fill="white" />
        <circle cx="10.5" cy="7" r="1.8" fill="white" />
        <circle cx="3.5" cy="10.5" r="1.8" fill="white" />
        <line x1="5" y1="4.2" x2="9" y2="6.4" stroke="white" strokeWidth="1" />
        <line x1="5" y1="9.8" x2="9" y2="7.6" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  )
}
