import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/locales'
import { getServerSideURL } from '@/utilities/getURL'

type CampaignDoc = NonNullable<Page['campaign']>

export type ResolvedCampaignLink = {
  href: string
  qrValue: string
  isExternal: boolean
}

/**
 * Resolves a campaign's link into a click href and an absolute URL for the QR
 * code. External links are used verbatim; internal references resolve to the
 * locale-prefixed path of the target document. Returns null when the link
 * cannot be resolved (missing URL or unpopulated reference).
 */
export function resolveCampaignHref(
  campaign: Extract<CampaignDoc, object>,
  locale: Locale,
): ResolvedCampaignLink | null {
  if (campaign.linkType === 'external') {
    const href = campaign.externalUrl
    if (!href) return null
    return { href, qrValue: href, isExternal: true }
  }

  const doc = campaign.internalDoc
  if (!doc || typeof doc !== 'object' || typeof doc.value !== 'object' || !doc.value?.slug) {
    return null
  }

  const prefix = doc.relationTo === 'posts' ? '/posts' : ''
  const slug = doc.value.slug
  const path = slug === 'home' ? '' : `${prefix}/${slug}`
  const href = `/${locale}${path}`
  return { href, qrValue: `${getServerSideURL()}${href}`, isExternal: false }
}
