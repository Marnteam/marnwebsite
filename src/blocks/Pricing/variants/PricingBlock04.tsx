'use client'
import React from 'react'
import type { PricingBlock } from '@/payload-types'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

interface PricingBlock04Props {
  table: NonNullable<PricingBlock['table']>
}

export const PricingBlock04: React.FC<PricingBlock04Props> = ({ table }) => {
  const renderTable = () => {
    if (!table) return null

    // Handle different types of table data
    if (typeof table === 'string') {
      try {
        const parsedTable = JSON.parse(table)
        return renderTableFromData(parsedTable)
      } catch (error) {
        console.error('Failed to parse table JSON:', error)
        return <p className="text-destructive">Invalid table data format</p>
      }
    }

    if (Array.isArray(table)) {
      return renderTableFromData(table)
    }

    if (typeof table === 'object') {
      return renderTableFromData(table)
    }

    return <p className="text-muted-foreground">No table data available</p>
  }

  const renderTableFromData = (data: any) => {
    // If it's an array of objects (rows)
    if (Array.isArray(data) && data.length > 0) {
      const firstRow = data[0]
      const headers = Object.keys(firstRow)

      return (
        <Table className="rounded-space-sm overflow-hidden">
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="hover:bg-background-neutral bg-background-neutral">
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: any, rowIndex: number) => (
              <TableRow
                key={rowIndex}
                className="even:bg-background-neutral even:hover:bg-background-neutral odd:bg-background odd:hover:bg-background"
              >
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }

    // If it's an object with rows/columns structure
    if (typeof data === 'object' && data.rows) {
      return (
        <Table>
          {data.headers && (
            <TableHeader className="bg-background-neutral [&_tr]:border-0">
              <TableRow className="hover:bg-background-neutral">
                {data.headers.map((header: string, index: number) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {data.rows.map((row: any[], rowIndex: number) => (
              <TableRow
                key={rowIndex}
                className="even:bg-background-neutral even:hover:bg-background-neutral odd:bg-background odd:hover:bg-background"
              >
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }

    return <p className="text-muted-foreground">Unsupported table format</p>
  }

  return (
    <div className="py-xl relative container">
      <div className="">{renderTable()}</div>
    </div>
  )
}
