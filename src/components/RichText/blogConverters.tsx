import { BannerBlock } from '@/blocks/Banner/Component'
import { RenderCallToActionBlock } from '@/blocks/CallToAction/RenderCallToActionBlock'
import { RenderFAQBlock } from '@/blocks/FAQ/RenderFAQBlock'
import { RenderGalleryBlock } from '@/blocks/Gallery/RenderGalleryBlock'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StyledListBlock } from '@/blocks/StyledList/Component'
import { formatSlug } from '@/hooks/formatSlug'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  Media as MediaType,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import React from 'react'
import { Media } from '../MediaResponsive'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blog-posts' ? `/blog/${slug}` : `/${slug}`
}

export const blogConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node }) => {
    const headingNode = node as SerializedHeadingNode
    const text = extractTextFromHeading(headingNode)
    const slug = formatSlug(text)

    // Create the heading element dynamically based on the tag
    return React.createElement(
      headingNode.tag,
      {
        id: slug,
        style: {
          borderBottom: headingNode.tag === 'h2' ? '1px solid var(--border)' : 'none',
          paddingBottom: headingNode.tag === 'h2' ? 'calc(var(--spacing) * 2)' : '0',
        },
      },
      text,
    )
  },
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    return (
      <Media
        resource={node.value as MediaType}
        imgClassName="rounded-3xl"
        className="h-auto w-full"
      />
    )
  },
  table: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })
    return (
      <div className="lexical-table-container">
        <table className="lexical-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>{children}</tbody>
        </table>
      </div>
    )
  },
  tablecell: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const TagName = node.headerState > 0 ? 'th' : 'td' // Use capital letter to denote a component
    const headerStateClass = `lexical-table-cell-header-${node.headerState}`
    const style = {
      backgroundColor: node.backgroundColor || undefined, // Use undefined to avoid setting the style property if not needed

      padding: '8px',
    }

    // Note: JSX does not support setting attributes directly as strings, so you must convert the colSpan and rowSpan to numbers
    const colSpan = node.colSpan && node.colSpan > 1 ? node.colSpan : undefined
    const rowSpan = node.rowSpan && node.rowSpan > 1 ? node.rowSpan : undefined

    return (
      <TagName
        className={`lexical-table-cell ${headerStateClass}`}
        colSpan={colSpan} // colSpan and rowSpan will only be added if they are not null
        rowSpan={rowSpan}
        style={style}
      >
        {children}
      </TagName>
    )
  },
  tablerow: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })
    return <tr className="lexical-table-row">{children}</tr>
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    galleryBlock: ({ node }) => <RenderGalleryBlock {...node.fields} className="p-0 !py-0" />,
    faqBlock: ({ node }) => <RenderFAQBlock {...node.fields} type="01" className="p-0" />,
    // code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    callToActionBlock: ({ node }) => (
      <RenderCallToActionBlock {...node.fields} className="p-0 !py-0" />
    ),
    styledListBlock: ({ node }) => <StyledListBlock {...node.fields} />,
  },
})

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
