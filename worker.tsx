// @ts-ignore – generated at build time
import { default as handler } from './.open-next/worker.js'
// @ts-ignore – generated at build time
// import rubik from 'public/fonts/Rubik-VariableFont_wght.woff2'

// import { ImageResponse } from '@takumi-rs/image-response/wasm'
// import module from '@takumi-rs/wasm/next'

import { Config } from '@/payload-types.js'
import { PayloadSDK } from '@payloadcms/sdk'
// import React from 'react'
// import PagesOGCard from '@/components/OG/PagesOGCard.jsx'
// import BlogPostsOGCard from '@/components/OG/BlogPostsOGCard.jsx'
// import IntegrationsOGCard from '@/components/OG/IntegrationsOGCard.jsx'

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
    const type = url.searchParams.get('type') || 'pages'
    const sdk = new PayloadSDK<Config>({
      baseURL: `${url.origin}/api`,
    })
    const props = {
      slug: url.searchParams.get('slug') || 'home',
      locale: (url.searchParams.get('locale') as 'en' | 'ar') || 'ar',
      sdk,
    }
    // const OGCard = {
    //   pages: <PagesOGCard {...props} />,
    //   blog: <BlogPostsOGCard {...props} />,
    //   marketplace: <IntegrationsOGCard {...props} />,
    // }
    // const rubik = await loadGoogleFont('Rubik')
    // if (url.pathname.startsWith('/next/og')) {
    //   return new ImageResponse(OGCard[type], {
    //     width: 1200,
    //     height: 630,
    //     fonts: [
    //       {
    //         name: 'Rubik',
    //         data: rubik,
    //         weight: 900,
    //         style: 'normal',
    //       },
    //     ],
    //     // drawDebugBorder: true,
    //     module,
    //     headers: {
    //       'cache-control': '',
    //     },
    //   })
    // }

    return handler.fetch(request, env, ctx)
  },
} satisfies ExportedHandler
