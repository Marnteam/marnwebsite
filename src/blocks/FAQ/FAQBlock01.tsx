import { cn } from '@/utilities/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import RichText from '@/components/RichText'
import { Faq, FaqBlock } from '@/payload-types'
import { TypedLocale } from 'payload'

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
                  className="group relative rounded-3xl bg-background-neutral py-4 ps-space-sm pe-[calc((var(--spacing-space-sm)+8px)+var(--spacing-space-md))]"
                >
                  <AccordionTrigger className="flex flex-row justify-between text-start text-(length:--text-body-lg) text-base-secondary data-[state=open]:text-base-primary [&[data-state=open]_iconify-icon]:rotate-45">
                    {faq.question}
                    <div className="absolute end-space-xs h-8 rounded-full bg-neutral/10 p-1 text-base-tertiary">
                      <Icon
                        icon="material-symbols:add-rounded"
                        className="size-6 transition-transform duration-200"
                        height="none"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    {faq.answer && (
                      <RichText
                        className="text-start [&_p]:text-(length:--text-body-md) [&_p]:text-base-tertiary"
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
