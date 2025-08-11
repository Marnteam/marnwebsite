'use client'

import {
  PASTE_COMMAND,
  $getRoot,
  $getSelection,
  $createTextNode,
} from '@payloadcms/richtext-lexical/lexical'

import { $generateNodesFromDOM } from '@payloadcms/richtext-lexical/lexical/html'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { $insertNodeToNearestRoot } from '@payloadcms/richtext-lexical/lexical/utils'

import { $createUploadNode } from '@payloadcms/richtext-lexical/client'

// Check if an image is likely a UI element (checkbox, bullet, etc.) that should be skipped
function isUIElementImage(img: HTMLImageElement): boolean {
  // Check dimensions - UI elements are typically very small
  const width = img.width || parseInt(img.getAttribute('width') || '0', 10)
  const height = img.height || parseInt(img.getAttribute('height') || '0', 10)

  // Skip very small images (likely checkboxes, bullets, icons)
  if ((width > 0 && width <= 20) || (height > 0 && height <= 20)) {
    return true
  }

  // Check alt text for common UI indicators
  const alt = img.alt?.toLowerCase() || ''
  if (alt.includes('checkbox') || alt.includes('bullet') || alt.includes('check')) {
    return true
  }

  // Check src for common Google Docs UI element patterns
  const src = img.src || ''
  if (src.includes('checkbox') || src.includes('bullet') || src.includes('ui-element')) {
    return true
  }

  return false
}

function deriveAlt({
  originalAlt,
  filename,
  fallback = 'Pasted image',
}: {
  originalAlt?: string
  filename?: string
  fallback?: string
}) {
  if (originalAlt && originalAlt.trim()) return originalAlt.trim()
  if (filename)
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .trim()
  return fallback
}

// Convert an <img> element to a File that can be uploaded
async function imageElementToFile(img: HTMLImageElement, idx: number): Promise<File | null> {
  try {
    const res = await fetch(img.src)
    const blob = await res.blob()
    const rawType = blob.type || 'image/png'
    const mime = rawType.split(';')[0]
    let extension = mime.split('/')[1] || 'png'
    if (extension === 'svg+xml') extension = 'svg'
    return new File([blob], `pasted-${idx}.${extension}`, { type: mime })
  } catch (err) {
    console.error('Failed to convert image element to File', err)
    return null
  }
}

async function uploadImageToMedia(file: File): Promise<{ id: string } | null> {
  try {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('_payload', JSON.stringify({ alt: file.name.split('.')[0], prefix: 'media' }))

    console.log('Uploading file:', file.name)

    const res = await fetch('/api/media', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!res.ok) {
      const text = await res.text()
      try {
        console.error('Failed to upload image:', res.status, JSON.parse(text))
      } catch {
        console.error('Failed to upload image:', res.status, text)
      }
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

        // --- Branch 1: HTML fragment with images (e.g. Google Docs / Word) -------
        const html = event.clipboardData.getData('text/html')
        if (html && html.includes('<img')) {
          // Extract and upload images, then insert modified HTML (with placeholders) ourselves
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          const imgElems = Array.from(doc.querySelectorAll('img'))

          if (imgElems.length > 0) {
            // Filter out UI elements (checkboxes, bullets, etc.) and only process real images
            const realImages = imgElems.filter((img) => !isUIElementImage(img))

            // Create placeholders for real images and remove all images
            const imageMap = new Map<string, HTMLImageElement>()

            realImages.forEach((img, index) => {
              const placeholderId = `__IMAGE_PLACEHOLDER_${index}__`
              imageMap.set(placeholderId, img)

              // Replace image with a unique text placeholder
              const placeholder = doc.createTextNode(placeholderId)
              img.parentNode?.replaceChild(placeholder, img)
              ;(img as any)._derivedIndex = index // stash index
            })

            // Remove UI elements (no placeholders needed)
            imgElems.filter((img) => isUIElementImage(img)).forEach((img) => img.remove())

            // Prevent default so we can insert the modified HTML with placeholders
            event.preventDefault()

            // Insert the modified HTML into the editor preserving structure
            editor.update(() => {
              const nodes = $generateNodesFromDOM(editor, doc)
              const selection = $getSelection()
              if (selection) {
                selection.insertNodes(nodes)
              } else {
                $getRoot().append(...nodes)
              }
            })

            // Upload real images and replace placeholders in order
            ;(async () => {
              for (const [placeholderId, originalImg] of imageMap) {
                const idx = (originalImg as any)._derivedIndex ?? 0
                const imgFile = await imageElementToFile(originalImg, idx)
                if (imgFile) (originalImg as any)._derivedFilename = imgFile.name
                if (!imgFile) continue

                const uploaded = await uploadImageToMedia(imgFile)
                if (!uploaded) continue

                editor.update(() => {
                  // Recursively search for text nodes containing our placeholder and replace
                  const replaceInNode = (currentNode: any): boolean => {
                    if (currentNode.getTextContent) {
                      const text = currentNode.getTextContent()
                      if (text && text.includes(placeholderId)) {
                        const altForNode = deriveAlt({
                          originalAlt: originalImg.alt,
                          filename: (originalImg as any)._derivedFilename,
                        })
                        const uploadNode = $createUploadNode({
                          data: {
                            id: uploaded.id,
                            relationTo: 'media',
                            value: uploaded.id,
                            fields: { alt: altForNode },
                          },
                        })

                        if (text === placeholderId) {
                          currentNode.replace(uploadNode)
                        } else {
                          const parts = text.split(placeholderId)
                          currentNode.setTextContent(parts[0])
                          if (parts[0] === '') {
                            currentNode.replace(uploadNode)
                          } else {
                            currentNode.insertAfter(uploadNode)
                          }
                          if (parts[1]) {
                            const remainingText = $createTextNode(parts[1])
                            uploadNode.insertAfter(remainingText)
                          }
                        }
                        return true
                      }
                    }
                    if (currentNode.getChildren) {
                      for (const child of currentNode.getChildren()) {
                        if (replaceInNode(child)) return true
                      }
                    }
                    return false
                  }

                  $getRoot()
                    .getChildren()
                    .forEach((node) => replaceInNode(node))
                })
              }
            })()

            return true
          }
        }

        // --- Branch 2: Directly pasted image files --------------------------------
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
              const altForNode = deriveAlt({
                filename: file.name,
              })
              const uploadNode = $createUploadNode({
                data: {
                  id: uploaded.id,
                  relationTo: 'media',
                  value: uploaded.id,
                  // No additional fields at this stage
                  fields: { alt: altForNode },
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
