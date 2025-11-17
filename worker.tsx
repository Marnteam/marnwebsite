// @ts-ignore – generated at build time
import { default as handler } from './.open-next/worker.js'
// @ts-ignore – generated at build time
// import rubik from 'public/fonts/Rubik-VariableFont_wght.woff2'

import { ImageResponse } from '@takumi-rs/image-response/wasm'
import module from '@takumi-rs/wasm/next'

import { Config } from '@/payload-types.js'
import { PayloadSDK } from '@payloadcms/sdk'

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,300..900;1,300..900&display=swap`
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

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/next/og')) {
      const type = url.searchParams.get('type') || 'pages'
      const sdk = new PayloadSDK<Config>({
        baseURL: `${url.origin}/api`,
      })
      const props = {
        slug: url.searchParams.get('slug') || 'home',
        locale: (url.searchParams.get('locale') as 'en' | 'ar') || 'ar',
        sdk,
      }
      let OGCard
      switch (type) {
        case 'blog':
          OGCard = (await import('@/components/OG/BlogPostsOGCard.jsx')).default
          break
        case 'marketplace':
          OGCard = (await import('@/components/OG/IntegrationsOGCard.jsx')).default
          break
        default:
          OGCard = (await import('@/components/OG/PagesOGCard.jsx')).default
      }
      const tree = await OGCard(props)
      const rubik = await loadGoogleFont('Rubik')
      return new ImageResponse(tree, {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Rubik',
            data: rubik,
            weight: 900,
            style: 'normal',
          },
        ],
        // drawDebugBorder: true,
        module,
        headers: {
          'cache-control': '',
        },
      })
    }

    return handler.fetch(request, env, ctx)
  },
} satisfies ExportedHandler
