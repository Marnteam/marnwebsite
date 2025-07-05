'use client'

import React, { useEffect, useState } from 'react'
import { useField, usePayloadAPI, useLocale } from '@payloadcms/ui'
import type { RelationshipFieldClientComponent } from 'payload'

import './index.scss'

export const RelationshipChipSelect: RelationshipFieldClientComponent = (props) => {
  const {
    field: { admin: { description } = {}, hasMany, label, required, type, relationTo },
    path,
    readOnly,
    validate,
  } = props

  const locale = useLocale()

  const { value, setValue, showError, errorMessage } = useField<number[] | number | null>({
    path,
    validate,
  })
  const [selectedRelationships, setSelectedRelationships] = useState<number[]>(
    hasMany ? (Array.isArray(value) ? value : []) : value ? [value as number] : [],
  )
  const [{ data, isError, isLoading: relationshipsLoading }] = usePayloadAPI(`/api/${relationTo}`, {
    initialParams: {
      depth: 1,
      where: {
        and: [{ parent: { exists: true } }, { 'parent.slug': { equals: 'media' } }],
      },
      sort: 'title',
      pagination: false,
    },
  })
  const relationships = data?.docs || []

  const handleChipClick = (relationshipId: number) => {
    let newSelectedRelationships: number[]
    if (hasMany) {
      newSelectedRelationships = selectedRelationships.includes(relationshipId)
        ? selectedRelationships.filter((id) => id !== relationshipId)
        : [...selectedRelationships, relationshipId]
    } else {
      newSelectedRelationships = selectedRelationships.includes(relationshipId)
        ? []
        : [relationshipId]
    }
    setSelectedRelationships(newSelectedRelationships)

    if (hasMany) {
      setValue(newSelectedRelationships)
    } else {
      setValue(newSelectedRelationships.length > 0 ? newSelectedRelationships[0] : null)
    }
  }

  useEffect(() => {
    if (hasMany) {
      if (Array.isArray(value)) {
        setSelectedRelationships(value)
      } else if (value === null || typeof value === 'undefined') {
        setSelectedRelationships([])
      }
    } else {
      if (typeof value === 'number') {
        setSelectedRelationships([value])
      } else if (value === null || typeof value === 'undefined') {
        setSelectedRelationships([])
      }
    }
  }, [value, hasMany])

  if (relationshipsLoading) {
    return <p>Loading relationships...</p>
  }

  if (isError) {
    return <p style={{ color: 'red' }}>Error loading relationships.</p> // Simplified error message
  }

  return (
    <div className="payload-custom-field category-chip-select">
      <label htmlFor={path} className="field-label">
        {label?.[locale as any] || label}
      </label>
      <div className="input-wrapper">
        <ul className="chip-group">
          {relationships.map((relationship) => {
            if (!relationship || typeof relationship.id === 'undefined') {
              return null
            }
            let isSelected: boolean
            if (hasMany) {
              isSelected = selectedRelationships.includes(relationship.id)
            } else {
              isSelected = selectedRelationships.includes(relationship.id) // For single select, check if it's in the array of (at most) one item
            }
            return (
              <li key={relationship.id}>
                <button
                  type="button"
                  className={`pill pill--style-light pill--size-medium column-selector__column pill--has-action pill--has-icon pill--align-icon-left pill--draggable ${isSelected ? 'column-selector__column--active' : ''}`}
                  onClick={() => handleChipClick(relationship.id)}
                  disabled={readOnly}
                >
                  <span className="pill__label">{relationship.title}</span>

                  <span className="pill__icon">
                    {isSelected ? (
                      <svg
                        className="icon icon--x"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="stroke"
                          d="M14 6L6 14M6 6L14 14"
                          stroke-linecap="square"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="icon icon--plus"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="stroke"
                          d="M5.33333 9.99998H14.6667M9.99999 5.33331V14.6666"
                          stroke-linecap="square"
                        ></path>
                      </svg>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {showError && errorMessage && (
        <div className="field-error" style={{ color: 'red', marginTop: '5px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default RelationshipChipSelect
