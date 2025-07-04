import HeadingLinks from '@/components/RichText/HeadingLinks'
import type { Category, BlogPost } from '@/payload-types'
import { useTranslations } from 'next-intl'

export const BlogSidebar = ({ post }: { post: BlogPost }) => {
  const { content, categories, relatedPosts } = post
  const t = useTranslations('Blog')
  return (
    <div className="top-[calc(var(--header-height)+56px)] ms-0 lg:sticky">
      {categories && categories.length > 0 && (
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
      )}
      <div className="bg-background-neutral space-y-6 rounded-3xl p-(length:--text-h4)">
        <h2 className="text-body-md mb-2 font-medium text-(color:--color-base-primary)">
          {t('inThisArticle')}:{' '}
        </h2>

        <HeadingLinks
          className="top-(--header-height) ms-0 lg:sticky"
          data={post.content}
          enableGutter={false}
        />
      </div>
    </div>
  )
}
