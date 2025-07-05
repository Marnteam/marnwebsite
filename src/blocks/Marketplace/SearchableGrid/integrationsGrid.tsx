'use client'
import React, { useEffect, useState } from 'react'
import { IntegrationCard, type IntegrationsCardData } from '@/components/IntegrationCard'
import { AnimatePresence, motion } from 'motion/react'
import { itemVariants } from '@/utilities/motion'
import { useSearchParams } from 'next/navigation'

export type IntegrationWithId = IntegrationsCardData & { id: string }

interface IntegrationsGridProps {
  integrations: IntegrationWithId[]
  locale: 'ar' | 'en'
  initialFilters?: {
    search: string
    category: string
    ecosystem: string
    sort: string
  }
}

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({
  integrations,
  locale,
  initialFilters,
}) => {
  const searchParams = useSearchParams()
  const [filteredIntegrations, setFilteredIntegrations] =
    useState<IntegrationWithId[]>(integrations)
  const filters = {
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || initialFilters?.category || '',
    ecosystem: searchParams.get('ecosystem') || initialFilters?.ecosystem || '',
    sort: searchParams.get('sort') || initialFilters?.sort || 'newest',
  }

  // Fetch filtered integrations when search params change
  useEffect(() => {
    // Only fetch if filters actually changed from initial
    const filtersChanged =
      filters.search !== initialFilters?.search ||
      filters.category !== initialFilters?.category ||
      filters.ecosystem !== initialFilters?.ecosystem ||
      filters.sort !== initialFilters?.sort

    if (!filtersChanged) return

    const fetchFilteredIntegrations = async () => {
      try {
        const response = await fetch(
          `/next/marketplace?${new URLSearchParams({
            ...filters,
            locale,
          })}`,
        )
        const data = await response.json()
        // setIntegrations(data.docs)
        setFilteredIntegrations(data.docs)
      } catch (error) {
        console.error('Failed to fetch integrations:', error)
      }
    }

    fetchFilteredIntegrations()
  }, [searchParams, locale])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {filteredIntegrations?.map((integration, index) => (
          <motion.div
            key={integration.id}
            layout
            custom={index}
            initial="hidden"
            variants={itemVariants}
            animate="visible"
            exit={{
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.3,
                ease: 'easeIn',
              },
            }}
          >
            <IntegrationCard integration={integration} locale={locale} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
