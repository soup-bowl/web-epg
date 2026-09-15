import './BackUpHint.css'

type BackUpHintProps = {
  onBack: () => void
}

export default function BackUpHint({ onBack }: BackUpHintProps) {
  return (
    <p className="backup-hint">
      <span>Press</span>
      <button type="button" className="backup-hint__key" onClick={onBack}>
        BACK UP
      </button>
      <span>to return</span>
    </p>
  )
}
