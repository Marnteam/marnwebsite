import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { slug: string; locale: 'en' | 'ar' } }) {
  const { slug, locale } = params

  const decodedSlug = encodeURIComponent(slug)

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[slug][equals]=${decodedSlug}&depth=2&draft=false&locale=${locale}&limit=1&pagination=false&trash=false`,
  )
  const { docs } = await req.json()

  const text = docs[0].title

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        dir={locale === 'en' ? 'ltr' : 'rtl'}
        style={{
          fontSize: 64,
          fontWeight: 500,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'start',
        }}
      >
        <span>{text}</span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Rubik',
          data: await loadGoogleFont('Rubik', text),
          style: 'normal',
        },
      ],
    },
  )
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
