// Extract all text content from Lexical format
const extractTextFromNode = (node: any): string => {
  let text = ''

  // Handle text nodes
  if (node.type === 'text' && node.text) {
    return node.text + ' '
  }

  // Handle nodes with children
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractTextFromNode(child)
    }
  }

  return text
}

export const extractTextFromLexical = (content: any): string => {
  if (!content?.root?.children) return ''

  let allText = ''
  for (const child of content.root.children) {
    allText += extractTextFromNode(child)
  }

  return allText.trim()
}

// Count words in text
export const countWords = (text: string): number => {
  if (!text) return 0
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

// Simple read time calculation with translation support
export const getReadTimeFromLexical = (
  content: any,
  locale: 'en' | 'ar' = 'ar',
  t: (key: string, values?: any) => string,
): { minutes: number; text: string } => {
  const text = extractTextFromLexical(content)
  const wordCount = countWords(text)

  // Reading speeds (words per minute)
  const wpm = locale === 'en' ? 200 : 180
  const minutes = Math.max(1, Math.ceil(wordCount / wpm))

  // Use the existing translation keys from your files
  const readTimeText = minutes === 1 ? t('readTimeMinute') : t('readTime', { minutes })

  return {
    minutes,
    text: readTimeText,
  }
}

// Enhanced version with proper internationalization
export const calculateReadTime = (
  wordCount: number,
  locale: 'en' | 'ar' = 'ar',
  t: (key: string, values?: any) => string,
): {
  minutes: number
  text: string
} => {
  const readingSpeed = {
    en: 200, // English: ~200 WPM
    ar: 180, // Arabic: ~180 WPM
  }

  const wpm = readingSpeed[locale] || readingSpeed.ar
  const minutes = Math.ceil(wordCount / wpm)
  const readTimeMinutes = Math.max(1, minutes)

  // Use proper singular/plural forms based on locale
  const text =
    readTimeMinutes === 1 ? t('readTimeMinute') : t('readTime', { minutes: readTimeMinutes })

  return {
    minutes: readTimeMinutes,
    text,
  }
}
