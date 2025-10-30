'use client'

import type { Integration, Media as MediaType } from '@/payload-types' // Import necessary types
import { Media } from '@/components/Media'
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useMemo } from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { BlockHeaderType } from '@/types/blockHeader'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface AppsGridClientProps {
  apps: Integration[]
  blockHeader: BlockHeaderType
}

interface GridCell {
  app: Integration | null
  row: number
  column: number
  isReserved: boolean
}

// Constants for grid based on screen size
const GRID_CONFIG = {
  mobile: {
    COLUMNS: 6,
    ROWS: 7,
    RESERVED: {
      START_COL: 0,
      END_COL: 5,
      START_ROW: 2,
      END_ROW: 4,
    },
    POSITIONS: [1, 3, 5, 6, 8, 10, 30, 32, 34, 37, 39, 41] as const,
  },
  tablet: {
    COLUMNS: 10,
    ROWS: 7,
    RESERVED: {
      START_COL: 2,
      END_COL: 7,
      START_ROW: 2,
      END_ROW: 4,
    },
    POSITIONS: [3, 7, 10, 15, 18, 21, 39, 40, 54, 58, 62, 66] as const,
  },
  desktop: {
    COLUMNS: 12,
    ROWS: 6,
    RESERVED: {
      START_COL: 3,
      END_COL: 8,
      START_ROW: 2,
      END_ROW: 3,
    },
    POSITIONS: [4, 8, 14, 18, 23, 24, 33, 37, 51, 56, 58, 61, 65] as const,
  },
} as const

const ContentSection: React.FC<{ blockHeader: BlockHeaderType }> = ({ blockHeader }) => {
  const { badge, headerText, links } = blockHeader || {}

  return (
    <div className="flex h-full flex-col items-center justify-center gap-space-sm p-space-site text-center">
      {headerText && (
        <RichText
          className="mx-auto text-center text-balance [&_h2]:text-h3 [&_p]:leading-relaxed"
          data={headerText}
        />
      )}
      {links && links.length > 0 && (
        <div className="flex w-auto flex-col justify-center gap-2 sm:flex-row">
          {links.map(({ link }, i) => (
            <CMSLink key={i} size={'lg'} {...link} />
          ))}
        </div>
      )}
    </div>
  )
}

const AnimatedAppIcon: React.FC<{
  app: Integration
  shouldReduce?: boolean | null
}> = ({ app, shouldReduce }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start center'],
  })
  // 1. Scroll easing
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1], {
    ease: cubicBezier(0.42, 0, 0.58, 1),
  })

  // 2. Disable motion when user prefers-reduced-motion
  const effective = shouldReduce ? null : progress // null ⇒ no transform

  // 3. Derived transforms
  const z = useTransform(effective ?? progress, [0, 1], [600, 0])
  const blurPx = useTransform(effective ?? progress, [0, 1], ['blur(4px)', 'blur(0px)'])

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative aspect-square h-auto w-full overflow-hidden bg-neutral/5',
        'rounded-[12.6px] md:rounded-[13.87px] lg:rounded-[15.67px] xl:rounded-[20.23px] 2xl:rounded-[24.86px]',
      )}
      style={{ filter: blurPx, translate: 'none', z, rotate: 'none', scale: 'none' }}
      transformTemplate={({ z }) => `translate3d(0px, 0px, ${z})`}
    >
      <Media
        resource={app.icon as MediaType}
        className="h-full w-full"
        imgClassName="h-full w-full scale-105 object-cover"
      />
    </motion.div>
  )
}

export const AppsGridHero: React.FC<AppsGridClientProps> = ({ apps, blockHeader }) => {
  /* ──────────────────────────── 1.  Environment hooks */
  const breakpoint = useBreakpoint()
  const shouldReduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  /* ──────────────────────────── 2.  Breakpoint-specific constants */
  const { COLUMNS, ROWS, RESERVED, POSITIONS } = GRID_CONFIG[breakpoint]

  /* ──────────────────────────── 3.  Data prep */
  const appsToShow = apps?.slice(0, POSITIONS.length) as Integration[] | undefined

  const gridCells: GridCell[] = useMemo(() => {
    if (!appsToShow?.length) return []

    /* 3-A.  Empty grid scaffold */
    const TOTAL_CELLS = COLUMNS * ROWS
    const cells: GridCell[] = Array.from({ length: TOTAL_CELLS }, (_, idx) => {
      const row = Math.floor(idx / COLUMNS)
      const column = idx % COLUMNS
      const isRes =
        row >= RESERVED.START_ROW &&
        row <= RESERVED.END_ROW &&
        column >= RESERVED.START_COL &&
        column <= RESERVED.END_COL

      return {
        app: null,
        row,
        column,
        isReserved: isRes,
      }
    })

    /* 3-B.  Place apps + motion metadata */
    appsToShow.forEach((app, i) => {
      const pos = POSITIONS[i]
      const row = Math.floor(pos / COLUMNS)
      const column = pos % COLUMNS

      cells[pos] = { app, row, column, isReserved: false }
    })

    return cells
  }, [
    appsToShow,
    COLUMNS,
    ROWS,
    RESERVED.START_COL,
    RESERVED.END_COL,
    RESERVED.START_ROW,
    RESERVED.END_ROW,
    POSITIONS,
  ])

  if (!appsToShow?.length || !gridCells.length) return null

  /* ──────────────────────────── 4.  Render */
  return (
    <div ref={containerRef} className="container w-full py-[calc(var(--spacing-space-2xl)*3)]">
      <div className="relative">
        <div
          className="relative z-2 grid gap-2 perspective-[3000px] sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${ROWS},    minmax(0, 1fr))`,
            aspectRatio: `${COLUMNS} / ${ROWS}`,
          }}
        >
          {gridCells.map((cell, idx) => {
            if (cell.app) {
              return <AnimatedAppIcon key={idx} app={cell.app} shouldReduce={shouldReduce} />
            }
            return <div key={idx} className="pointer-events-none aspect-square h-auto w-full" />
          })}

          {/*  central content block  */}
          <div
            className="absolute z-1 bg-background"
            style={{
              gridColumn: `${RESERVED.START_COL + 1} / span ${
                RESERVED.END_COL - RESERVED.START_COL + 1
              }`,
              gridRow: `${RESERVED.START_ROW + 1} / span ${
                RESERVED.END_ROW - RESERVED.START_ROW + 1
              }`,
              inset: 0, // fills its reserved area
            }}
          >
            <ContentSection blockHeader={blockHeader} />
          </div>
        </div>
        <div
          className="base-grid absolute inset-0 grid gap-2 sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${ROWS},    minmax(0, 1fr))`,
            mask: 'radial-gradient(rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0))',
          }}
        >
          {gridCells.map((cell, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  'pointer-events-auto aspect-square h-auto w-full border border-transparent bg-neutral/5 transition-colors hover:border-border hover:bg-background',
                  'rounded-[12.6px] md:rounded-[13.87px] lg:rounded-[15.67px] xl:rounded-[20.23px] 2xl:rounded-[24.86px]',
                )}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
