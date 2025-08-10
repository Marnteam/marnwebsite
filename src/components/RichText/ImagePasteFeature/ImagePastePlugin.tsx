'use client'

import { PASTE_COMMAND } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { $insertNodeToNearestRoot } from '@payloadcms/richtext-lexical/lexical/utils'

// Import UploadNode helper from the public client export
// eslint-disable-next-line import/no-internal-modules
import { $createUploadNode } from '@payloadcms/richtext-lexical/client'

async function uploadImageToMedia(file: File): Promise<{ id: string } | null> {
  try {
    const formData = new FormData()
    // Provide required alt field first so Payload validates
    formData.append('alt', file.name)
    formData.append('file', file, file.name)

    const res = await fetch('/api/media', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('Failed to upload image', await res.text())
      return null
    }

    // Payload returns `{ doc: {...} }` for REST create requests
    const json = await res.json()
    const id = json?.doc?.id ?? json?.id
    if (!id) return null

    return { id }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error while uploading image', err)
    return null
  }
}

export function ImagePastePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregister = editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        if (!event.clipboardData) return false

        const imageFiles = Array.from(event.clipboardData.files).filter((file) =>
          file.type.startsWith('image/'),
        )

        if (imageFiles.length === 0) {
          return false // Let other handlers manage the paste
        }

        event.preventDefault()

        // Upload sequentially to maintain original order
        ;(async () => {
          for (const file of imageFiles) {
            const uploaded = await uploadImageToMedia(file)
            if (!uploaded) continue

            editor.update(() => {
              const uploadNode = $createUploadNode({
                data: {
                  id: uploaded.id,
                  relationTo: 'media',
                  value: uploaded.id,
                  // No additional fields at this stage
                  fields: {},
                },
              })
              $insertNodeToNearestRoot(uploadNode)
            })
          }
        })()

        return true
      },
      4,
    )

    return () => {
      unregister()
    }
  }, [editor])

  return null
}
