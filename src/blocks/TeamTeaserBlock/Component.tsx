import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { SectionWrapper } from '@/components/SectionWrapper'

import type { TeamTeaserBlock as TeamTeaserBlockProps, Team, Media } from '@/payload-types'
import { SectionHeading } from '@/components/SectionHeading'

export const TeamTeaserBlockComponent: React.FC<TeamTeaserBlockProps> = async ({
  heading,
  ctaLabel,
  pinnedMembers,
}) => {
  const payload = await getPayload({ config: configPromise })

  let members: Team[]

  if (pinnedMembers && pinnedMembers.length > 0) {
    // Resolve pinned member IDs to full documents
    members = await Promise.all(
      pinnedMembers.map(async (m) => {
        if (typeof m === 'object' && m !== null) return m as Team
        return payload.findByID({ collection: 'team', id: m as number }) as Promise<Team>
      }),
    )
  } else {
    // Fetch all team members sorted by order
    const result = await payload.find({
      collection: 'team',
      sort: 'order',
      limit: 4,
    })
    members = result.docs as Team[]
  }

  return (
    <SectionWrapper>
      {heading && <SectionHeading>{heading}</SectionHeading>}

      {/* T-01 / T-02: Horizontal photo strip — scrollable on mobile, up to 4 on desktop */}
      <div className="flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
        {members.map((member) => {
          const photo = member.photo as Media | null
          return (
            <div
              key={member.id}
              className="flex min-w-[200px] flex-col items-center gap-3 sm:min-w-0"
            >
              {/* T-01: Photo with correct alt text */}
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-muted">
                {photo?.url ? (
                  <Image
                    src={photo.url}
                    alt={photo.alt ?? member.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl text-muted-foreground">
                    🐾
                  </div>
                )}
              </div>

              {/* T-01: Name + role */}
              <div className="text-center">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* T-03: Meet the team CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/team"
          className="inline-block rounded border border-primary px-6 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          {ctaLabel}
        </Link>
      </div>
    </SectionWrapper>
  )
}
