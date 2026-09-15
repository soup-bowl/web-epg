import publicUrl from '../publicUrl.ts'

type TabIconProps = {
  icon: string
}

const common = {
  className: 'header__tab-icon',
  viewBox: '0 0 48 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  'aria-hidden': true,
} as const

function isImageIcon(icon: string) {
  return (
    icon.startsWith('/') ||
    icon.startsWith('http://') ||
    icon.startsWith('https://') ||
    icon.startsWith('data:')
  )
}

export default function TabIcon({ icon }: TabIconProps) {
  if (isImageIcon(icon)) {
    return <img className="header__tab-icon" src={publicUrl(icon)} alt="" />
  }

  if (icon === 'tv-guide') {
    return (
      <svg {...common}>
        <rect x="6" y="6" width="36" height="24" rx="2" />
        <path d="M16 36h16" />
        <path d="M18 14h6v10h-6z" fill="currentColor" stroke="none" />
        <path d="M28 14h8" />
        <path d="M28 20h8" />
        <path d="M28 26h6" />
      </svg>
    )
  }

  if (icon === 'box-office') {
    return (
      <svg {...common}>
        <path d="M8 14h32v16H8z" />
        <path d="M8 22h32" />
        <circle cx="14" cy="22" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="34" cy="22" r="2.2" fill="currentColor" stroke="none" />
        <path d="M16 8h16l-3 6H19z" />
      </svg>
    )
  }

  if (icon === 'services') {
    return (
      <svg {...common}>
        <rect x="12" y="6" width="24" height="28" rx="1.5" />
        <path d="M18 14h12" />
        <path d="M18 20h12" />
        <path d="M18 26h8" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M10 12h12v16H10z" />
      <path d="M26 12h12v16H26z" />
      <path d="M22 16l4 4-4 4" />
      <path d="M26 24l-4-4 4-4" />
    </svg>
  )
}
