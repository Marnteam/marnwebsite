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
import { jsx as _jsx } from 'react/jsx-runtime'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  StyledListBlock as StyledListBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'
import { formatSlug } from '@/hooks/formatSlug'
import { createElement } from 'react'

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
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })
    if (!children?.length) {
      return /*#__PURE__*/ _jsx('p', {
        children: /*#__PURE__*/ _jsx('br', {}),
        style: {
          textAlign: node.format,
        },
      })
    }
    return /*#__PURE__*/ _jsx('p', {
      children: children,
      style: {
        textAlign: node.format,
      },
    })
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
