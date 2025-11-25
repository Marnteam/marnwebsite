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
import { StyledListBlock } from '@/blocks/StyledList/Component'
import { CMSLink, CMSLinkType } from '../Link'

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
  heading: ({ node }) => {
    const headingNode = node as SerializedHeadingNode
    const text = extractTextFromHeading(headingNode)
    const slug = formatSlug(text)
    // Create the heading element dynamically based on the tag
    return createElement(headingNode.tag, { id: slug, style: { textAlign: 'inherit' } }, text)
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
  blocks: {
    styledListBlock: ({ node }) => <StyledListBlock {...node.fields} />,
  },

  link: ({ node, nodesToJSX }) => {
    // remove '←' from text content
    const cleanedNodes = [
      {
        ...node.children[0],
        text:
          'text' in node.children[0] &&
          (node.children[0].text as string).trim().replace('←', '').trim(),
      },
    ]
    if ((cleanedNodes[0].text as string)?.trim() === '') return null

    const children = nodesToJSX({
      nodes: cleanedNodes,
    })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    let href: string = node.fields.url ?? ''
    if (node.fields.linkType === 'internal') {
      if (internalDocToHref) {
        href = internalDocToHref({ linkNode: node })
      } else {
        console.error(
          'Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided',
        )
        href = '#' // fallback
      }
    }
    const props: CMSLinkType = {
      type: node.fields.linkType === 'internal' ? 'reference' : 'custom',
      url: node.fields.url,
      reference: node.fields.doc as any,
      label: null,
    }

    return (
      <CMSLink {...props} {...{ rel, target }}>
        {children}
      </CMSLink>
    )
  },
  autolink: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
    const target: string | undefined = node.fields.newTab ? '_blank' : undefined

    return (
      <a href={node.fields.url} {...{ rel, target }}>
        {children}
      </a>
    )
  },
})

type Props = {
  data: SerializedEditorState
  converters?: JSXConvertersFunction<NodeTypes>
  enableGutter?: boolean
  enableProse?: boolean
  disableContainer?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    converters = jsxConverters,
    enableProse = true,
    enableGutter = true,
    disableContainer = false,
    ...rest
  } = props
  return (
    <RichTextWithoutBlocks
      disableContainer={disableContainer}
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
