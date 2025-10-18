import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import RichText from '@/components/RichText'
import { Faq, FaqBlock } from '@/payload-types'
import { BlockHeader } from '@/components/BlockHeader'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

export const FAQBlock02: React.FC<FaqBlock> = async (props) => {
  const { faqs, blockHeader } = props
  return (
    <div className="bg-background pt-[clamp(4rem,2.4rem+4vw,6rem)]">
      <div className="container flex flex-col gap-4 lg:flex-row lg:items-start">
        <BlockHeader {...blockHeader} type="start" className="w-full px-0 pt-0! lg:pe-md" />
        {faqs && (
          <div className="mx-auto grid w-full grid-cols-1">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq: Faq, idx) => (
                <AccordionItem
                  value={'item-' + idx}
                  key={idx}
                  className="group relative rounded-3xl bg-background-neutral py-4 ps-sm pe-[calc((var(--spacing-space-sm)+8px)+var(--spacing-space-md))]"
                >
                  <AccordionTrigger className="flex flex-row justify-between text-start text-(length:--text-body-lg) text-base-secondary data-[state=open]:text-base-primary [&[data-state=open]_iconify-icon]:rotate-45">
                    {faq.question}
                    <div className="absolute end-xs h-8 rounded-full bg-neutral/10 p-1 text-base-tertiary">
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
