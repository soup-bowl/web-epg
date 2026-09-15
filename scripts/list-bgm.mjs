import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bgmDir = process.argv[2] ?? join(root, 'public', 'bgm')
const playlistPath = process.argv[3] ?? join(dirname(bgmDir), 'playlist.json')

let files = []
try {
  files = (await readdir(bgmDir)).filter((name) => name.toLowerCase().endsWith('.mp3')).sort()
} catch (error) {
  if (error?.code !== 'ENOENT') {
    throw error
  }
}

const tracks = files.map((name) => `/bgm/${encodeURIComponent(name)}`)

await mkdir(dirname(playlistPath), { recursive: true })
await writeFile(playlistPath, `${JSON.stringify({ tracks }, null, 2)}\n`)
