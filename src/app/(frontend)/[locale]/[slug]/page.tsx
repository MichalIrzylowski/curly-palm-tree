import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CampaignModal } from '@/components/CampaignModal'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPageBySlug } from '@/loaders/getPageBySlug'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/i18n/locales'
import { buildHreflangAlternates } from '@/utilities/buildHreflangAlternates'
import { resolveCampaignHref } from '@/utilities/resolveCampaignHref'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const params: { locale: string; slug: string }[] = []

  // Slugs are localized, so each locale has its own set.
  for (const locale of routing.locales) {
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      locale,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    pages.docs
      ?.filter((doc) => doc.slug && doc.slug !== 'home')
      .forEach(({ slug }) => params.push({ locale, slug: slug as string }))
  }

  return params
}

type Args = {
  params: Promise<{
    locale: Locale
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = 'home' } = await paramsPromise

  setRequestLocale(locale)

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  // Locale-agnostic path for redirect lookup (see ADR-0001).
  const url = '/' + decodedSlug
  const page = await getPageBySlug(decodedSlug, locale)

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout, campaign } = page

  // Render the campaign only when it is populated, enabled, and targets this locale.
  const campaignActive =
    campaign &&
    typeof campaign === 'object' &&
    campaign.enabled &&
    (campaign.showOnLocales ?? []).includes(locale)

  const campaignLink = campaignActive ? resolveCampaignHref(campaign, locale) : null

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />

      {campaignActive && campaignLink ? (
        <CampaignModal
          id={String(campaign.id)}
          href={campaignLink.href}
          qrValue={campaignLink.qrValue}
          isExternal={campaignLink.isExternal}
          headline={campaign.headline}
          description={campaign.description}
          variant={campaign.variant}
        />
      ) : null}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await getPageBySlug(decodedSlug, locale)

  const meta = await generateMeta({ doc: page })
  const alternates = await buildHreflangAlternates(decodedSlug, locale)

  return { ...meta, alternates }
}
