'use client'

import React, { useState } from 'react'
import type { Integration, PricingBlock, Solution } from '@/payload-types'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify-icon/react'
import { cn } from '@/utilities/ui'

interface PricingTableProps {
  table?: {
    title?: string | null
    /**
     * Define the column headers for your table
     */
    headers?:
      | {
          header: string
          width: 'auto' | 'w-1/5' | 'w-1/3' | 'w-1/2' | 'w-2/3'
          id?: string | null
        }[]
      | null
    /**
     * Add rows to your table with structured cell data
     */
    rows?:
      | {
          /**
           * Add content for each cell in this row.
           */
          cells?:
            | {
                /**
                 * Add "check" or "close" to show a checkmark or x in the cell. Add a solution slug to show a solution badge in the cell.
                 */
                content?: string | null
                isHeader?: boolean | null
                id?: string | null
              }[]
            | null
          /**
           * Add nested/child rows that will be collapsible under this row.
           */
          children?:
            | {
                cells?:
                  | {
                      /**
                       * Add "check" or "close" to show a checkmark or x in the cell. Add a solution slug to show a solution badge in the cell.
                       */
                      content?: string | null
                      id?: string | null
                    }[]
                  | null
                id?: string | null
              }[]
            | null
          /**
           * Check if this row should show expand/collapse functionality
           */
          isExpandable?: boolean | null
          id?: string | null
        }[]
      | null
    styling?: {
      striped?: boolean | null
      bordered?: boolean | null
      compact?: boolean | null
    }
  }
  badges?: (Solution | Integration)[]
}

export const StructuredTable: React.FC<PricingTableProps> = ({ table, badges }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex)
    } else {
      newExpandedRows.add(rowIndex)
    }
    setExpandedRows(newExpandedRows)
  }

  if (!table?.headers || !table?.rows) {
    return <p className="text-muted-foreground">No structured table data available</p>
  }

  const { title, headers, rows, styling } = table

  return (
    <div className="space-y-4">
      {title && typeof title === 'string' && <h3 className="text-lg font-medium">{title}</h3>}
      <Table
        className={cn(
          'overflow-hidden rounded-3xl',
          styling?.bordered && 'border-border border',
          styling?.compact && 'text-sm',
        )}
      >
        <TableHeader
          className={cn(
            'hover:bg-background-neutral bg-background-neutral rounded-b-3xl [&_tr]:border-0',
            styling?.bordered && '[&_tr]:border-b',
          )}
        >
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn('w-8', styling?.bordered && 'border-e')}></TableHead>{' '}
            {/* Space for expand/collapse */}
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={cn(
                  header.width !== 'auto' && header.width,
                  styling?.bordered && index < headers.length - 1 && 'border-e',
                )}
              >
                {header.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const hasChildren = row.children && row.children.length > 0
            const isExpandable = row.isExpandable
            const isExpanded = expandedRows.has(rowIndex)
            const shouldShowChildren = hasChildren && (!isExpandable || isExpanded)

            return (
              <React.Fragment key={rowIndex}>
                <TableRow
                  className={cn(
                    styling?.striped
                      ? 'even:bg-background-neutral even:hover:bg-background-neutral odd:bg-background odd:hover:bg-background'
                      : 'hover:bg-background-neutral',
                    styling?.bordered && 'border-b',
                  )}
                >
                  <TableCell
                    className={cn(
                      'w-8',
                      styling?.compact ? 'p-1' : 'p-2',
                      styling?.bordered && 'border-e',
                    )}
                  >
                    {hasChildren && isExpandable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => toggleRow(rowIndex)}
                      >
                        <Icon
                          data-expanded={isExpanded ? 'true' : 'false'}
                          className="text-base-secondary size-4 transition-transform duration-200 data-[expanded=true]:-rotate-90 ltr:rotate-180 ltr:data-[expanded=true]:rotate-270"
                          height="none"
                          icon="material-symbols:chevron-left-rounded"
                        />
                      </Button>
                    )}
                  </TableCell>
                  {row.cells?.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cn(
                        cell.isHeader && 'font-medium',
                        styling?.compact ? 'px-2 py-1' : 'px-3 py-2',
                        styling?.bordered && cellIndex < row.cells!.length - 1 && 'border-e',
                      )}
                    >
                      {badges?.find((solution) => solution.slug === cell.content) ? (
                        <Badge
                          className="flex"
                          type="reference"
                          reference={{
                            relationTo: 'solutions',
                            value: badges.find(
                              (solution) => solution.slug === cell.content,
                            ) as Solution,
                          }}
                        />
                      ) : (
                        cell.content
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Render nested rows if they exist and should be shown */}
                {shouldShowChildren &&
                  row.children?.map((childRow, childIndex) => (
                    <TableRow
                      key={`${rowIndex}-${childIndex}`}
                      className={cn(
                        'bg-background-neutral-subtle',
                        styling?.bordered && 'border-b',
                      )}
                    >
                      <TableCell
                        className={cn(
                          'w-8',
                          styling?.compact ? 'p-1' : 'p-2',
                          styling?.bordered && 'border-e',
                        )}
                      ></TableCell>
                      {childRow.cells?.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={cn(
                            'ps-8', // Indent child rows
                            styling?.compact ? 'px-2 py-1' : 'px-3 py-2',
                            styling?.bordered &&
                              cellIndex < childRow.cells!.length - 1 &&
                              'border-e',
                          )}
                        >
                          {cell.content === 'check' ? (
                            <Icon
                              icon="material-symbols:check-rounded"
                              height="none"
                              className="flex size-5"
                            />
                          ) : cell.content === 'close' ? (
                            <Icon
                              icon="material-symbols:close-rounded"
                              height="none"
                              className="flex size-5"
                            />
                          ) : (
                            cell.content
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
