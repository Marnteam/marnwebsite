import { SerializedRootNode } from '@payloadcms/richtext-lexical/lexical'

export const EMPTY_CONTENT: { root: SerializedRootNode } = {
  root: {
    children: [],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}
