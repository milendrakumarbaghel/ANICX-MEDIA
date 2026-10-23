/**
 * Local preview server that mirrors Netlify's static hosting rules:
 *   /about → dist/about/index.html, unknown paths → dist/404.html (status 404).
 * (`vite preview` would serve the homepage HTML for every route instead.)
 *
 * Usage: npm run preview  [PORT=4173]
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
const port = Number(process.env.PORT ?? 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

async function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '')
  const candidates = [join(dist, safe), join(dist, safe, 'index.html')]
  for (const file of candidates) {
    if (!file.startsWith(dist)) continue
    try {
      if ((await stat(file)).isFile()) return file
    } catch {
      // try next candidate
    }
  }
  return null
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost')
  const file = await resolveFile(pathname)
  const target = file ?? join(dist, '404.html')
  res.writeHead(file ? 200 : 404, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream' })
  createReadStream(target).pipe(res)
}).listen(port, () => console.log(`Preview: http://localhost:${port}`))
