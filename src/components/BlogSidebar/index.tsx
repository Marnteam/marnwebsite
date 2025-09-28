import HeadingLinks from '@/components/RichText/HeadingLinks'
import type { BlogPost } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { ScrollArea } from '../ui/scroll-area'

export const BlogSidebar = ({ post }: { post: BlogPost }) => {
  const { content, categories, relatedPosts } = post
  const t = useTranslations('Blog')
  return (
    <div className="ms-0 max-w-160 lg:sticky lg:top-[calc(var(--header-plus-admin-bar-height)+56px)] lg:max-w-84 lg:grow-1">
      {/* {categories && categories.length > 0 && (
        <div className="mb-2">
          <ul className="flex flex-row flex-wrap gap-2">
            {categories.map((category: Category) => (
              <li
                key={category.id}
                className="bg-background-neutral rounded-full px-4 py-2 text-sm font-medium text-(color:--color-base-tertiary)"
              >
                {category.title}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      <ScrollArea className="xlg:max-h-fit relative rounded-3xl bg-background-neutral-subtle lg:max-h-[calc(100vh-var(--header-plus-admin-bar-height)-160px)]">
        <div className="space-y-4 p-6">
          <h2 className="text-body-md font-medium text-(color:--color-base-primary)">
            {t('inThisArticle')}:{' '}
          </h2>
          <hr className="w-full border-border" />
          <HeadingLinks
            className="top-(--header-height) ms-0"
            data={post.content}
            enableGutter={false}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
