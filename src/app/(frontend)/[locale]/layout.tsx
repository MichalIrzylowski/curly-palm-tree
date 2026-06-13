import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jakarta',
  display: 'swap',
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { VeterinaryCareJsonLd } from '@/components/VeterinaryCareJsonLd'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '../globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { routing } from '@/i18n/routing'
import type { SiteSetting } from '@/payload-types'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(inter.variable, plusJakartaSans.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <link href="/logo.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <VeterinaryCareJsonLd />
        <SpeedInsights />
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const clinicName = siteSettings?.clinicName ?? 'Lecznica Weterynaryjna'

  return {
    metadataBase: new URL(getServerSideURL()),
    title: clinicName,
    openGraph: mergeOpenGraph({ siteName: clinicName, title: clinicName }),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
