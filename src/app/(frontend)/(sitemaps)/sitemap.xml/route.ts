import { getServerSideSitemapIndex } from 'next-sitemap'

import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const url = getServerSideURL()

  // posts-sitemap.xml joins this index once the blog (M6) has frontend routes.
  return getServerSideSitemapIndex([`${url}/pages-sitemap.xml`])
}
