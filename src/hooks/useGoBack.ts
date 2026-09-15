import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function useGoBack() {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    if (location.key === 'default') {
      navigate('/')
      return
    }
    navigate(-1)
  }

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

  return goBack
}
