// @ts-ignore – generated at build time
import { default as handler } from './.open-next/worker.js'
// @ts-ignore – generated at build time
import rubik from 'public/fonts/Rubik-VariableFont_wght.woff2'

import { ImageResponse } from '@takumi-rs/image-response/wasm'
import module from '@takumi-rs/wasm/next'

import { Config } from '@/payload-types.js'
import { PayloadSDK } from '@payloadcms/sdk'
import React from 'react'
import PagesOGCard from '@/components/OG/PagesOGCard.jsx'
import BlogPostsOGCard from '@/components/OG/BlogPostsOGCard.jsx'
import IntegrationsOGCard from '@/components/OG/IntegrationsOGCard.jsx'

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
    const OGCard = {
      pages: <PagesOGCard {...props} />,
      blog: <BlogPostsOGCard {...props} />,
      marketplace: <IntegrationsOGCard {...props} />,
    }

    if (url.pathname.startsWith('/next/og')) {
      //TODO: try using renderer instead of ImageResponse
      return new ImageResponse(OGCard[type], {
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
