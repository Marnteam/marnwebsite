import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

import { formatSlug } from '@/hooks/formatSlug'
import { itemsFling } from '@/utilities/motion'
import * as motion from 'motion/react-client'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blog-posts' ? `/blog/${slug}` : `/${slug}`
}

export const motionConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const headingNode = node as SerializedHeadingNode
    const children = nodesToJSX({
      nodes: node.children,
      converters: defaultConverters,
    })
    console.log('HEADING CHILDREN:', children)
    const text = children[0] as string
    const slug = formatSlug(text)
    const MotionTag = motion[headingNode.tag as keyof typeof motion] as typeof motion.div

    // Create the heading element dynamically based on the tag
    return (
      <MotionTag
        id={slug}
        // segmentWrapperClassName="overflow-hidden block"
        className="block overflow-hidden"
        variants={itemsFling}
      >
        {children}
      </MotionTag>
    )
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters: defaultConverters,
    })

    return (
      <motion.p className="motion" variants={itemsFling}>
        {children}
      </motion.p>
    )
  },
  ...LinkJSXConverter({ internalDocToHref }),
})
