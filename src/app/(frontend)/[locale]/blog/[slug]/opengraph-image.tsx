import { Renderer } from '@takumi-rs/core'
import { container, percentage, rem, text } from '@takumi-rs/helpers'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Image metadata
export const alt = ''
export const size = {
  width: 1200 * 1,
  height: 630 * 1,
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

  const title = docs[0].title
  // Prepare font and renderer
  // const fontData = await loadGoogleFont('Rubik', text)
  // Load the font file from the public/fonts directory

  const fontData = await readFile(join(process.cwd(), 'public/fonts/Rubik-VariableFont_wght.woff2'))

  const renderer = new Renderer({
    // Convert ArrayBuffer -> Buffer for Takumi
    fonts: [Buffer.from(new Uint8Array(fontData))],
    loadDefaultFonts: true,
  })

  const root = container({
    style: {
      width: percentage(100),
      height: percentage(100),
      display: 'flex',
      padding: rem(2),
      backgroundColor: '#F5F5F5',
    },
    children: [
      container({
        style: {
          width: percentage(100),
          height: percentage(100),
          borderWidth: '1px',
          borderColor: 'black',
          // borderRadius: '24px',
          backgroundColor: 'white',
        },
        children: [
          text('The newest blog post', {
            color: 'black',
            width: percentage(100),
            fontSize: rem(4),
            lineHeight: rem(4 * 1.5),
            fontFamily: 'Rubik',
            fontWeight: '500',
            textAlign: 'left',
            padding: rem(4),
          }),
        ],
      }),
    ],
  })

  const image = await renderer.renderAsync(root, {
    width: size.width,
    height: size.height,
    format: 'png',
  })

  return new Response(image, {
    headers: {
      'Content-Type': contentType,
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
