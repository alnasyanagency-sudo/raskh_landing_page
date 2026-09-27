import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { POLICIES, getPolicy } from "@/lib/policies-data"
import { PolicyDetailPage } from "@/components/policies/policy-detail-page"

interface PolicyParams {
  category: string
  slug: string
}

export function generateStaticParams() {
  return POLICIES.map((policy) => ({
    category: policy.category,
    slug: policy.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PolicyParams>
}): Promise<Metadata> {
  const { category, slug } = await params
  const policy = getPolicy(category, slug)

  if (!policy) return {}

  return {
    title: { absolute: policy.metaTitle },
    description: policy.metaDescription,
    alternates: {
      canonical: `/policies/${category}/${slug}`,
    },
    openGraph: { url: `/policies/${category}/${slug}`, title: policy.metaTitle, description: policy.metaDescription },
  }
}

export default async function PolicyDetailRoute({
  params,
}: {
  params: Promise<PolicyParams>
}) {
  const { category, slug } = await params
  const policy = getPolicy(category, slug)

  if (!policy) notFound()

  return <PolicyDetailPage policy={policy} />
}