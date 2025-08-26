import type { HubSpotField } from './hubspot'
import ObjectID from 'bson-objectid'

type PayloadBlock = Record<string, any>

const toOptions = (opts: { label?: string; value: string }[] | undefined) =>
  (opts || []).map((o) => ({ label: o.label ?? o.value, value: o.value }))

export function mapHubSpotFieldsToPayloadBlocks(fields: HubSpotField[]): PayloadBlock[] {
  const blocks: PayloadBlock[] = []

  for (const f of fields) {
    const name = f.name
    const label = f.label || name
    const required = !!f.required
    const fieldType = (f.fieldType || '').toLowerCase()
    const type = (f.type || '').toLowerCase()

    // Prefer specific matches first
    if (name === 'email' || fieldType === 'email') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'email', name, label, required })
      continue
    }

    if (name === 'country') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'country', name, label, required })
      continue
    }

    if (name === 'state') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'state', name, label, required })
      continue
    }

    if (fieldType === 'textarea') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'textarea', name, label, required })
      continue
    }

    if (fieldType === 'select' || fieldType === 'radio' || type === 'enum') {
      blocks.push({
        id: ObjectID().toHexString(),
        blockType: fieldType === 'radio' ? 'radio' : 'select',
        name,
        label,
        required,
        options: toOptions(f.options),
      })
      continue
    }

    if (fieldType === 'booleancheckbox' || fieldType === 'checkbox') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'checkbox', name, label, required })
      continue
    }

    if (fieldType === 'date' || type === 'date') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'date', name, label, required })
      continue
    }

    if (fieldType === 'number' || type === 'number') {
      blocks.push({ id: ObjectID().toHexString(), blockType: 'number', name, label, required })
      continue
    }

    // Default to text
    blocks.push({ id: ObjectID().toHexString(), blockType: 'text', name, label, required })
  }

  return blocks
}
