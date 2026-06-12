import React from 'react'
import { ChevronDown } from 'lucide-react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'
import { SectionHeading } from '@/components/SectionHeading'
import { SectionWrapper } from '@/components/SectionWrapper'

export const FaqBlockComponent: React.FC<FaqBlockProps> = ({ heading, items }) => {
  const faqs = (items ?? []).filter((item) => item.question && item.answer)

  if (faqs.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <SectionWrapper>
      {heading && <SectionHeading>{heading}</SectionHeading>}

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((item) => (
          <details
            key={item.id ?? item.question}
            className="group rounded-xl border border-border bg-card px-5 py-4 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        // `<` is escaped so CMS-authored values cannot close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </SectionWrapper>
  )
}
