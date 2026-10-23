/**
 * Static prerendering for every public route.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle):
 *   1. Renders each route to HTML with its own <title>, meta and Open Graph tags.
 *   2. Writes dist/<route>/index.html (plus dist/404.html for unknown URLs).
 *   3. Adds <link rel="modulepreload"> for the route's code-split chunk.
 *   4. Generates sitemap.xml and robots.txt.
 *
 * The browser then hydrates the static HTML, so pages are readable and indexable
 * without JavaScript and become interactive once the bundle loads.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const template = await readFile(join(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'))
const { render, getPrerenderEntries, NOT_FOUND_PATH, siteConfig } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

/** Collects a chunk and its static imports from the Vite manifest. */
function preloadLinks(moduleId) {
  const seen = new Set()
  const visit = (key) => {
    const chunk = manifest[key]
    if (!chunk || seen.has(chunk.file)) return
    seen.add(chunk.file)
    for (const dep of chunk.imports ?? []) visit(dep)
  }
  visit(moduleId)
  const entryFile = Object.values(manifest).find((chunk) => chunk.isEntry)?.file
  return [...seen]
    .filter((file) => file !== entryFile)
    .map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`)
}

function toHtml(appHtml, head, moduleId) {
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('<!--app-head-->', [head, ...preloadLinks(moduleId)].join('\n    '))
    .replace('<!--app-html-->', appHtml)
}

async function writePage(path, file) {
  const { html, head, module } = await render(path)
  const target = join(dist, file)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, toHtml(html, head, module))
  console.log(`  ✓ ${path.padEnd(42)} → ${file}`)
}

console.log('\nPrerendering routes…')
const entries = getPrerenderEntries()
for (const { path } of entries) {
  await writePage(path, path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)
}
await writePage(NOT_FOUND_PATH, '404.html')

// sitemap.xml + robots.txt -----------------------------------------------------
const siteUrl = siteConfig.url
const robots = ['User-agent: *', 'Allow: /', 'Disallow: /__forms.html']

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = entries
    .filter((entry) => entry.sitemap)
    .map(({ path }) => `  <url>\n    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  )
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  console.log(`  ✓ sitemap.xml (${urls.length} URLs, base ${siteUrl})`)
} else {
  console.warn('  ! sitemap.xml skipped: no site URL. Set VITE_SITE_URL (Netlify sets URL automatically).')
}
await writeFile(join(dist, 'robots.txt'), `${robots.join('\n')}\n`)
console.log('  ✓ robots.txt')

await rm(ssrDir, { recursive: true, force: true })
console.log(`Done: ${entries.length + 1} HTML files.\n`)
