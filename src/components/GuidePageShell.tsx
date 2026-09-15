import { useEffect, useRef, type ReactNode } from 'react'
import Header from './Header.tsx'
import BackUpHint from './BackUpHint.tsx'
import useGoBack from '../hooks/useGoBack.ts'
import './GuidePageShell.css'

type GuidePageShellProps = {
  title: string
  children: ReactNode
  autoFocus?: boolean
}

export default function GuidePageShell({ title, children, autoFocus = true }: GuidePageShellProps) {
  const goBack = useGoBack()
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoFocus) {
      pageRef.current?.focus()
    }
  }, [autoFocus])

  return (
    <div ref={pageRef} className="guide-shell" tabIndex={-1}>
      <Header />
      <main className="guide-shell__main">
        <section className="guide-shell__panel" aria-labelledby="guide-shell-title">
          <h1 id="guide-shell-title" className="guide-shell__title">
            {title}
          </h1>
          {children}
        </section>
      </main>
      <BackUpHint onBack={goBack} />
    </div>
  )
}
