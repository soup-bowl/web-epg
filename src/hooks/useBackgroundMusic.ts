import { useEffect } from 'react'
import publicUrl from '../publicUrl.ts'

type Playlist = {
  tracks?: string[]
}

let booted = false

function shuffle(tracks: string[]) {
  const order = [...tracks]
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    const current = order[index]
    const other = order[swap]
    if (current === undefined || other === undefined) {
      continue
    }
    order[index] = other
    order[swap] = current
  }
  return order
}

function reshuffle(tracks: string[], last: string | undefined) {
  if (tracks.length < 2) {
    return [...tracks]
  }

  const order = shuffle(tracks)
  if (last && order[0] === last) {
    const swapWith = 1 + Math.floor(Math.random() * (order.length - 1))
    const first = order[0]
    const other = order[swapWith]
    if (first !== undefined && other !== undefined) {
      order[0] = other
      order[swapWith] = first
    }
  }
  return order
}

function boot() {
  if (booted) {
    return
  }
  booted = true

  void fetch(publicUrl('/bgm/playlist.json'))
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not load playlist')
      }
      return response.json() as Promise<Playlist>
    })
    .then((data) => {
      const tracks = (data.tracks ?? []).filter((track) => track.length > 0)
      if (tracks.length === 0) {
        return
      }

      const audio = new Audio()
      audio.preload = 'auto'

      let order = shuffle(tracks)
      let index = 0
      const unlockEvents = ['pointerdown', 'keydown'] as const

      const unlock = () => {
        void audio.play().catch(() => {})
        for (const eventName of unlockEvents) {
          window.removeEventListener(eventName, unlock)
        }
      }

      const playCurrent = () => {
        const track = order[index]
        if (!track) {
          return
        }
        audio.src = publicUrl(track)
        void audio.play().catch(() => {
          for (const eventName of unlockEvents) {
            window.addEventListener(eventName, unlock)
          }
        })
      }

      audio.addEventListener('ended', () => {
        index += 1
        if (index >= order.length) {
          order = reshuffle(tracks, order.at(-1))
          index = 0
        }
        playCurrent()
      })

      playCurrent()
    })
    .catch(() => {
      /* No playlist yet — Docker/local list-bgm can generate one later. */
    })
}

export default function useBackgroundMusic() {
  useEffect(() => {
    boot()
  }, [])
}
