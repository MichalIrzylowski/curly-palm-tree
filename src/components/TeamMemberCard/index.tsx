import type { Team, Media } from '@/payload-types'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { Globe2 } from 'lucide-react'

type Props = {
  member: Team
}

export default function TeamMemberCard({ member }: Props) {
  const photo = member.photo as Media

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">

      {/* Photo */}
      {photo?.url && (
        <div className="relative w-full aspect-3/4 overflow-hidden bg-muted">
          <Image
            src={photo.url}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">

        {/* Name + role with teal left accent */}
        <div className="border-l-2 border-secondary pl-3">
          <h3 className="font-heading text-lg font-semibold leading-tight text-primary tracking-[-0.01em]">
            {member.name}
          </h3>
          {member.role && (
            <p className="mt-0.5 text-sm font-medium text-secondary">{member.role}</p>
          )}
        </div>

        {/* Bio */}
        {member.bio && (
          <RichText
            data={member.bio}
            enableGutter={false}
            enableProse={false}
            className="text-sm leading-relaxed text-foreground/75 [&_p]:mb-2 [&_p:last-child]:mb-0"
          />
        )}

        {/* Specialisation pills */}
        {member.specialisations && member.specialisations.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.specialisations.map((item) => (
              <span
                key={item.id ?? item.tag}
                className="inline-block rounded-full border border-secondary/25 bg-secondary/10 px-3 py-0.5 text-xs font-medium text-secondary"
              >
                {item.tag}
              </span>
            ))}
          </div>
        )}

        {/* Languages */}
        {member.languages && member.languages.length > 0 && (
          <div className="flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
            <Globe2 size={12} className="shrink-0 text-accent" />
            <span>{member.languages.map((item) => item.language).join(', ')}</span>
          </div>
        )}

      </div>
    </div>
  )
}
