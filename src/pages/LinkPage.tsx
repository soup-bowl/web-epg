import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GuidePageShell from '../components/GuidePageShell.tsx'
import type { MenuLink } from '../types.ts'
import './LinkPage.css'

type LinkPageProps = {
  title: string
  description?: string
  link: MenuLink
}

export default function LinkPage({ title, description, link }: LinkPageProps) {
  const navigate = useNavigate()
  const bannerRef = useRef<HTMLButtonElement>(null)

  const goToLink = () => {
    if (/^https?:\/\//.test(link.route)) {
      window.location.assign(link.route)
      return
    }
    navigate(link.route, { state: { label: link.label } })
  }

  useEffect(() => {
    bannerRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return
      }
      const target = event.target as HTMLElement | null
      if (target?.closest('button')) {
        return
      }
      event.preventDefault()
      if (/^https?:\/\//.test(link.route)) {
        window.location.assign(link.route)
        return
      }
      navigate(link.route, { state: { label: link.label } })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [link.route, link.label, navigate])

  return (
    <GuidePageShell title={title} autoFocus={false}>
      {description ? (
        <div className="link-page__body">
          <p className="link-page__description">{description}</p>
        </div>
      ) : null}
      <button
        ref={bannerRef}
        type="button"
        className="link-page__banner"
        onClick={goToLink}
      >
        <span className="link-page__banner-label">{link.label}</span>
        <span className="link-page__banner-action">
          <span>Press</span>
          <span className="link-page__select">SELECT</span>
          <span>to view</span>
        </span>
      </button>
    </GuidePageShell>
  )
}
