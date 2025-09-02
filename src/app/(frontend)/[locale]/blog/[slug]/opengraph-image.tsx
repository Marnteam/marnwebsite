import { Renderer } from '@takumi-rs/core'
import { fromJsx } from '@takumi-rs/helpers/jsx'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'
export const runtime = 'nodejs'

// Image generation
export default async function Image({ params }: { params: { slug: string; locale: 'en' | 'ar' } }) {
  const { slug, locale } = params

  const decodedSlug = encodeURIComponent(slug)

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[slug][equals]=${decodedSlug}&depth=2&draft=false&locale=${locale}&limit=1&pagination=false&trash=false`,
  )
  const { docs } = await req.json()

  const text = docs[0].title
  // Prepare font and renderer
  const fontData = await loadGoogleFont('Rubik', text)
  const renderer = new Renderer({
    // Convert ArrayBuffer -> Buffer for Takumi
    fonts: [Buffer.from(new Uint8Array(fontData))],
    loadDefaultFonts: true,
  })

  // Build JSX and convert to Takumi node
  const jsx = (
    <div
      style={{
        fontSize: 64,
        fontWeight: 500,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: locale === 'ar' ? 'flex-end' : 'flex-start',
        padding: '40px',
        textAlign: locale === 'ar' ? 'right' : 'left',
        fontFamily: 'Rubik',
      }}
    >
      <span>{text}</span>
    </div>
  )

  const node = await fromJsx(jsx)
  const image = await renderer.renderAsync(node as { type: string }, {
    width: size.width,
    height: size.height,
    format: 'png',
  })

  return new Response(image, {
    headers: {
      'Content-Type': contentType,
      // Cache aggressively; adjust as needed
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}
