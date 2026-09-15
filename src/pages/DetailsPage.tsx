import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header.tsx'
import './DetailsPage.css'

type DetailsPageProps = {
  title: string
  description: string
}

export default function DetailsPage({ title, description }: DetailsPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)

  const goBack = () => {
    if (location.key === 'default') {
      navigate('/')
      return
    }
    navigate(-1)
  }

  useEffect(() => {
    pageRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Backspace') {
        event.preventDefault()
        if (location.key === 'default') {
          navigate('/')
        } else {
          navigate(-1)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [location.key, navigate])

  return (
    <div ref={pageRef} className="details-page" tabIndex={-1}>
      <Header />
      <main className="details-page__main">
        <section className="details-page__panel" aria-labelledby="details-title">
          <h1 id="details-title" className="details-page__title">
            {title}
          </h1>
          <div className="details-page__body">
            <p className="details-page__description">{description}</p>
          </div>
        </section>
      </main>
      <p className="details-page__hint">
        <span>Press</span>
        <button type="button" className="details-page__backup" onClick={goBack}>
          BACK UP
        </button>
        <span>to return</span>
      </p>
    </div>
  )
}
