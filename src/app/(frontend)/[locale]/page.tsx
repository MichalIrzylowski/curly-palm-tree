import PageTemplate, { generateMetadata } from './[slug]/page'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default PageTemplate

export { generateMetadata }
