import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import RichText from '@/components/RichText'
import { Faq, FaqBlock } from '@/payload-types'
import { PlusIcon } from 'lucide-react'
import { BlockHeader } from '@/components/BlockHeader'

export const FAQBlock02: React.FC<FaqBlock> = async (props) => {
  const { faqs, blockHeader } = props

  return (
    <div className="bg-background">
      <div className="container flex flex-col gap-4 lg:flex-row lg:items-start">
        <BlockHeader {...blockHeader} type="start" className="lg:pe-md w-full px-0" />
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
