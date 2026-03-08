interface Meta {
  title: string
  description?: string
  shortDescription?: string
  url?: string
  author?: string
}

export function useSeo(meta: Meta) {
  const ogDesc = meta?.shortDescription || meta?.description

  const m = meta && {
    title: meta.title,
    description: meta.description,
    ogTitle: meta.title,
    twitterTitle: meta.title,
    ogDescription: ogDesc,
    twitterDescription: ogDesc,
    ogUrl: meta.url,
  }

  useSeoMeta({ ...m })

  useHead({
    link: [{ rel: 'canonical', href: meta?.url }],
  })
}
