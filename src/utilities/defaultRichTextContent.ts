import { SerializedRootNode } from '@payloadcms/richtext-lexical/lexical'

export const EMPTY_CONTENT: { root: SerializedRootNode } = {
  root: {
    children: [
      {
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}
