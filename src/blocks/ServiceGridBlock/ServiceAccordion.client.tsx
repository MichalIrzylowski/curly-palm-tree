'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

type AccordionItemType = {
  id: number | string
  name: string
  priceText?: string | null
  description: React.ReactNode
}

type Props = {
  items: AccordionItemType[]
}

export function ServiceAccordion({ items }: Props) {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {items.map((item) => (
        <AccordionItem key={item.id} value={String(item.id)} className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex flex-1 items-center justify-between pr-4 w-full">
              <span className="font-medium text-left">{item.name}</span>
              {item.priceText && <span className="text-sm text-muted-foreground">{item.priceText}</span>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-0">{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
