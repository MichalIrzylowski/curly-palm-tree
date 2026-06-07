import type { Equipment, Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  item: Equipment
}

export function EquipmentCard({ item }: Props) {
  const photo = item.photo as Media

  return (
    <Card className="overflow-hidden rounded-xl border-border/60 bg-card">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {photo?.url && (
          <MediaComponent
            resource={photo}
            fill
            size="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imgClassName="object-cover"
            loading="lazy"
            htmlElement={null}
          />
        )}
      </div>

      <CardHeader className="pb-2 pt-4">
        <CardTitle className="font-heading text-base font-semibold leading-snug text-primary">
          {item.name as string}
        </CardTitle>
      </CardHeader>

      {item.description && (
        <CardContent>
          <RichText
            data={item.description}
            enableGutter={false}
            enableProse={false}
            className="text-sm leading-relaxed text-foreground/70 [&_p]:mb-2 [&_p:last-child]:mb-0"
          />
        </CardContent>
      )}
    </Card>
  )
}
