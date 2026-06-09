import TeamMemberCard from '@/components/TeamMemberCard'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { getTeamMembers } from '@/loaders/getTeamMembers'

type Props = {
  heading?: string | null
  description?: string | null
}

export async function TeamGridBlock({ heading, description }: Props) {
  const docs = await getTeamMembers()

  return (
    <SectionWrapper>
      {heading && <SectionHeading subtitle={description ?? undefined}>{heading}</SectionHeading>}
      {docs.length === 0 ? (
        <p className="text-muted-foreground">Brak członków zespołu.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
