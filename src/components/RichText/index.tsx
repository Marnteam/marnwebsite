import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

// import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { StyledListBlock } from '@/blocks/StyledList/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  StyledListBlock as StyledListBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { cn } from '@/utilities/ui'
import { CallToAction01 } from '@/blocks/CallToAction/CallToAction01'
import { formatSlug } from '@/hooks/formatSlug'
import { createElement } from 'react'
import { GalleryBlock } from '@/blocks/Gallery/config'
import { RenderGalleryBlock } from '@/blocks/Gallery/RenderGalleryBlock'
import { RenderFAQBlock } from '@/blocks/FAQ/RenderFAQBlock'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | StyledListBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blog-posts' ? `/blog/${slug}` : `/${slug}`
}

// Helper function to extract text content from heading node
const extractTextFromHeading = (node: SerializedHeadingNode): string => {
  if (!node.children) return ''

  return node.children
    .map((child: any) => {
      if (child.type === 'text') {
        return child.text || ''
      }
      // Handle nested elements if needed
      return ''
    })
    .join('')
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node }) => {
    const headingNode = node as SerializedHeadingNode
    const text = extractTextFromHeading(headingNode)
    const slug = formatSlug(text)
    // Create the heading element dynamically based on the tag
    return createElement(headingNode.tag, { id: slug }, text)
  },
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  data: SerializedEditorState
  converters?: JSXConvertersFunction<NodeTypes>
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    converters = jsxConverters,
    enableProse = true,
    enableGutter = true,
    ...rest
  } = props
  return (
    <RichTextWithoutBlocks
      converters={converters}
      className={cn(
        {
          'container px-0': enableGutter,
          'max-w-none': !enableGutter,
          'prose mx-auto': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
