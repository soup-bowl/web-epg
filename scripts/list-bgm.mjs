import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bgmDir = process.argv[2] ?? join(root, 'public', 'bgm')

await mkdir(bgmDir, { recursive: true })
const files = (await readdir(bgmDir)).filter((name) => name.toLowerCase().endsWith('.mp3')).sort()
const tracks = files.map((name) => `/bgm/${encodeURIComponent(name)}`)

await writeFile(join(bgmDir, 'playlist.json'), `${JSON.stringify({ tracks }, null, 2)}\n`)
