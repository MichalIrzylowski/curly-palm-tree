import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArrowRight, UserRound } from 'lucide-react'

import { SectionWrapper } from '@/components/SectionWrapper'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { TeamTeaserBlock as TeamTeaserBlockProps, Team, Media } from '@/payload-types'

export const TeamTeaserBlockComponent: React.FC<TeamTeaserBlockProps> = async ({
  heading,
  ctaLabel,
  pinnedMembers,
}) => {
  const payload = await getPayload({ config: configPromise })

  let members: Team[]

  if (pinnedMembers && pinnedMembers.length > 0) {
    members = await Promise.all(
      pinnedMembers.map(async (m) => {
        if (typeof m === 'object' && m !== null) return m as Team
        return payload.findByID({ collection: 'team', id: m as number }) as Promise<Team>
      }),
    )
  } else {
    const result = await payload.find({
      collection: 'team',
      sort: 'order',
      limit: 4,
    })
    members = result.docs as Team[]
  }

  return (
    <SectionWrapper>
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 text-xs font-medium uppercase tracking-wider">
            Nasz zespół
          </Badge>
          {heading && (
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {heading}
            </h2>
          )}
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Link href="/team">
            {ctaLabel ?? 'Poznaj nasz zespół'}
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => {
          const photo = member.photo as Media | null
          return (
            <Link key={member.id} href="/team" className="group">
              <Card className="h-full overflow-hidden rounded-xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-lg">
                {/* Photo */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  {photo?.url ? (
                    <Image
                      src={photo.url}
                      alt={photo.alt ?? member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/30 transition-colors duration-200 group-hover:bg-secondary/10 group-hover:text-secondary/50">
                      <UserRound className="size-16" strokeWidth={1.25} />
                    </div>
                  )}
                </div>

                <CardHeader className="pb-1 pt-4">
                  <CardTitle className="text-base font-semibold leading-snug transition-colors duration-200 group-hover:text-secondary">
                    {member.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{member.role}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
