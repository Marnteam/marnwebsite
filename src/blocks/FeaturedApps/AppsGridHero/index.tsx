'use client'

import type { Integration, Media as MediaType } from '@/payload-types' // Import necessary types
import { Media } from '@/components/Media'
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
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

// Type lives next to the component (or in a shared file)
interface GridCell {
  app: Integration | null
  row: number
  column: number
  isReserved: boolean
  startOffset: { x: number; y: number }
  startScale: number
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

/** +1, -1, or 0 depending on whether v is on the right/bottom, left/top or centered */
const axisSign = (v: number) => (v === 0 ? 0 : v > 0 ? 1 : -1)

// Content section with responsive styles
const ContentSection: React.FC<{ blockHeader: BlockHeaderType }> = ({ blockHeader }) => {
  const { badge, headerText, links } = blockHeader || {}

  return (
    <div className="flex h-full flex-col items-center justify-center gap-sm p-site text-center">
      {headerText && (
        <RichText
          className="mx-auto text-center text-balance [&_p]:leading-relaxed"
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
  index: number
  scrollYProgress: MotionValue<number>
  startOffset: { x: number; y: number }
  startScale: number
  shouldReduce?: boolean | null
}> = ({ app, index, scrollYProgress, shouldReduce, startOffset, startScale }) => {
  // 1. Scroll slice
  const sliceStart = 0.15 + index * 0.05
  const sliceEnd = sliceStart + 0.25
  const progress = useSpring(useTransform(scrollYProgress, [sliceStart, sliceEnd], [0, 1]), {
    stiffness: 150,
    damping: 19,
    mass: 1.2,
  })

  // 2. Disable motion when user prefers-reduced-motion
  const effective = shouldReduce ? null : progress // null ⇒ no transform

  // 3. Derived transforms
  const { x: x0, y: y0 } = startOffset
  const x = useTransform(effective ?? progress, [0, 1], [x0, 0])
  const y = useTransform(effective ?? progress, [0, 1], [y0, 0])
  const scale = useTransform(effective ?? progress, [0, 1], [startScale, 1])
  const blurPx = useTransform(effective ?? progress, [0, 1], ['blur(4px)', 'blur(0px)'])

  return (
    <motion.div
      className="z-2 transform-gpu" // Tailwind: force GPU layer
      style={{ filter: blurPx, x, y, scale }}
      transformTemplate={({ x, y, scale }) => `translate3d(${x}, ${y}, 0) scale(${scale})`}
    >
      <Media
        resource={app.icon as MediaType}
        className="h-full w-full"
        imgClassName="h-full w-full rounded-2xl object-cover lg:rounded-3xl"
      />
    </motion.div>
  )
}

export const AppsGridHero: React.FC<AppsGridClientProps> = ({ apps, blockHeader }) => {
  /* ──────────────────────────── 1.  Environment hooks */
  const breakpoint = useBreakpoint()
  const shouldReduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  /* ──────────────────────────── 2.  Breakpoint-specific constants */
  const { COLUMNS, ROWS, RESERVED, POSITIONS } = GRID_CONFIG[breakpoint]

  const DROP_DIST = breakpoint === 'mobile' ? 10 : 20 // px an icon starts outside its cell
  const MIN_SCALE = 1.2
  const MAX_SCALE = breakpoint === 'mobile' ? 1.2 : 2.0

  /* ──────────────────────────── 3.  Data prep */
  const appsToShow = apps?.slice(0, POSITIONS.length) as Integration[] | undefined
  const centerRow = (ROWS - 1) / 2
  const centerCol = (COLUMNS - 1) / 2
  const maxRadius = Math.hypot(centerRow, centerCol)

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
        startOffset: { x: 0, y: 0 },
        startScale: 1,
      }
    })

    /* 3-B.  Place apps + motion metadata */
    appsToShow.forEach((app, i) => {
      const pos = POSITIONS[i]
      const row = Math.floor(pos / COLUMNS)
      const column = pos % COLUMNS
      const dx = column - centerCol
      const dy = row - centerRow
      const r = Math.hypot(dx, dy)
      const throwMult = 0.6 + 0.4 * (r / maxRadius) // 0.6–1.0
      const startOffset = {
        x: -axisSign(dx) * DROP_DIST * throwMult,
        y: axisSign(dy) * DROP_DIST * throwMult,
      }

      // const startOffset = {
      //   x: axisSign(dx) * DROP_DIST, // ← 0 →
      //   y: axisSign(dy) * DROP_DIST, // ↑ 0 ↓
      // }
      const startScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * (r / maxRadius)

      cells[pos] = { app, row, column, isReserved: false, startOffset, startScale }
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
    centerRow,
    centerCol,
    maxRadius,
    DROP_DIST,
    MIN_SCALE,
    MAX_SCALE,
  ])

  if (!appsToShow?.length || !gridCells.length) return null

  /* ──────────────────────────── 4.  Render */
  return (
    <div className="relative overflow-x-clip">
      <div
        ref={containerRef}
        className="relative container w-full py-[calc(var(--spacing-space-lg)*3)]"
      >
        <div
          className="relative isolate grid gap-2 sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${ROWS},    minmax(0, 1fr))`,
            aspectRatio: `${COLUMNS} / ${ROWS}`,
          }}
        >
          {gridCells.map((cell, idx) => (
            <div
              key={idx}
              className={cn(
                'relative rounded-2xl bg-neutral/2 transition-colors hover:bg-background lg:rounded-3xl',
                cell.isReserved && 'pointer-events-none opacity-0',
              )}
            >
              {cell.app && (
                <AnimatedAppIcon
                  app={cell.app}
                  index={appsToShow.findIndex((a) => a.id === cell.app!.id)}
                  scrollYProgress={scrollYProgress}
                  startOffset={cell.startOffset}
                  startScale={cell.startScale}
                  shouldReduce={shouldReduce}
                />
              )}
            </div>
          ))}

          {/*  central content block  */}
          <div
            className="absolute z-1 rounded-3xl"
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
      </div>
    </div>
  )
}
