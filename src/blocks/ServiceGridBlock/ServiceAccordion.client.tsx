'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

type AccordionItemType = {
  id: number | string
  name: string
  description: React.ReactNode
}

type ServiceGroup = {
  categoryName: string | null
  items: AccordionItemType[]
}

type Props = {
  groups: ServiceGroup[]
}

export function ServiceAccordion({ groups }: Props) {
  return (
    <div className="space-y-8">
      {groups.map((group, i) => (
        <div key={group.categoryName ?? `group-${i}`}>
          {group.categoryName && (
            <h3 className="text-lg font-semibold mb-3">{group.categoryName}</h3>
          )}
          <Accordion type="multiple" className="w-full space-y-2">
            {group.items.map((item) => (
              <AccordionItem key={item.id} value={String(item.id)} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="font-medium text-left">{item.name}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-0">{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  )
}
