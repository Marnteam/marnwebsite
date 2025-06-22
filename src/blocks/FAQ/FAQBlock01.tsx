import { cn } from '@/utilities/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Faq, FaqBlock } from '@/payload-types'
import { getPayload, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { Icon } from '@iconify-icon/react'
import { PlusIcon } from 'lucide-react'

type FaqBlockProps = FaqBlock & {
  locale: TypedLocale
  className?: string
}

export const FAQBlock01: React.FC<FaqBlockProps> = async (props) => {
  const { faqs, className } = props

  return (
    <div className="bg-background">
      <div className={cn('container', className)}>
        {faqs && (
          <div className="mx-auto grid w-full grid-cols-1">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq: Faq, idx) => (
                <AccordionItem
                  value={'item-' + idx}
                  key={idx}
                  className="bg-background-neutral group rounded-space-sm ps-sm relative py-4 pe-[calc((var(--spacing-space-sm)+8px)+var(--spacing-space-md))]"
                >
                  <AccordionTrigger className="text-base-secondary data-[state=open]:text-base-primary flex flex-row justify-between text-start text-(length:--text-body-lg) [&[data-state=open]_svg]:rotate-45">
                    {faq.question}
                    <div className="bg-neutral/10 -group-hover:bg-neutral/20 text-base-tertiary end-xs absolute rounded-full p-1">
                      <PlusIcon
                        className="text-base transition-transform duration-200"
                        color="currentColor"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    {faq.answer && (
                      <RichText
                        className="[&_p]:text-base-tertiary text-start [&_p]:text-(length:--text-body-md)"
                        data={faq.answer}
                        enableGutter={false}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  )
}
