import type { Metadata } from "next"
import { PoliciesPage } from "@/components/policies/policies-page"
import { POLICIES_PAGE_META } from "@/lib/policies-data"

export const metadata: Metadata = {
  title: { absolute: POLICIES_PAGE_META.title },
  description: POLICIES_PAGE_META.description,
  alternates: {
    canonical: "/policies",
  },
}

export default function PoliciesPageRoute() {
  return <PoliciesPage />
}