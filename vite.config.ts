import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function withTrailingSlash(value: string) {
  return value.endsWith('/') ? value : `${value}/`
}

export default defineConfig({
  plugins: [react()],
  base: withTrailingSlash(process.env.VITE_BASE || '/'),
})
