"use client"

import { motion } from "framer-motion"
import { UserRound, Scale } from "lucide-react"
import { PolicyCard } from "@/components/policies/policy-card"
import {
  POLICY_CATEGORIES,
  getPoliciesByCategory,
  type PolicyCategory,
} from "@/lib/policies-data"
import { ease, fadeInUp, staggerContainer } from "@/lib/animations"

function CategoryGroup({
  category,
}: {
  category: PolicyCategory
}) {
  const policies = getPoliciesByCategory(category)
  const { label } = POLICY_CATEGORIES[category]
  const CategoryIcon = category === "client" ? UserRound : Scale

  return (
    <motion.div
      variants={fadeInUp}
      className="mb-14 last:mb-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="flex items-center gap-3 mb-7">
        <span className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
          <CategoryIcon className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {label}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {category === "client"
              ? "السياسات الخاصة بالمستفيدين من الخدمات القانونية"
              : "السياسات الخاصة بالمحامين المسجلين في المنصة"}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {policies.map((policy) => (
          <PolicyCard key={`${policy.category}-${policy.slug}`} policy={policy} />
        ))}
      </div>
    </motion.div>
  )
}

export function PoliciesPage() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 px-4" aria-label="السياسات والأنظمة">
      {/* Ambient gradient orbs */}
      <div
        className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/[0.04] via-transparent to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/[0.02] to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5"
          >
            السياسات والأنظمة
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            السياسات <span className="text-gold-gradient">والأنظمة</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            اطّلع على سياسات وشروط استخدام منصة راسخ لضمان تجربة واضحة وآمنة
            لجميع المستخدمين.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <CategoryGroup category="client" />
          <CategoryGroup category="lawyer" />
        </motion.div>
      </div>
    </section>
  )
}