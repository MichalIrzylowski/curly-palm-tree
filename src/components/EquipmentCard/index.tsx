import type { Equipment, Media } from '@/payload-types'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  item: Equipment
}

export function EquipmentCard({ item }: Props) {
  const photo = item.photo as Media

  return (
    <Card className="group overflow-hidden rounded-xl border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-secondary/40">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {photo?.url && (
          <Image
            src={photo.url}
            alt={item.name as string}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        {/* teal shimmer strip at bottom of photo */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
