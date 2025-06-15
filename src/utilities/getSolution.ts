import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { Solution } from '@/payload-types'

async function getSolutions(depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const solutions = await payload.find({
    collection: 'solutions',
    depth,
  })

  return solutions.docs
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedSolutions = (depth = 0) =>
  unstable_cache(async () => getSolutions(depth), [`depth-${depth}`], {
    tags: [`solutions`],
  })
