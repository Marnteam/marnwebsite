import type { TranslateResolver } from './types'

export const copyResolver = (): TranslateResolver => {
  return {
    key: 'copy',
    resolve: (args) => {
      const { texts, localeFrom, localeTo, req } = args

      return {
        success: true,
        translatedTexts: texts,
      }
    },
  }
}
