import type { LucideIcon } from "lucide-react"
import {
  ShieldCheck,
  FileText,
  RotateCcw,
  UserCheck,
  Gavel,
  Wallet,
  CalendarClock,
  CalendarX,
  UserX,
  VideoOff,
  Timer,
  CircleCheck,
  Scale,
} from "lucide-react"

export type PolicyCategory = "client" | "lawyer"

export type PolicySlug = "privacy" | "terms" | "refund" | "financial"

export interface PolicyCardItem {
  title: string
  description: string
  icon?: LucideIcon
}

export type PolicySectionData =
  | { kind: "paragraph"; id: string; title: string; body: string }
  | { kind: "numbered"; id: string; title: string; items: string[] }
  | { kind: "cards"; id: string; title: string; items: PolicyCardItem[] }

export interface PolicyData {
  category: PolicyCategory
  slug: PolicySlug
  title: string
  description: string
  icon: LucideIcon
  lastUpdated: string
  metaTitle: string
  metaDescription: string
  sections: PolicySectionData[]
}

export const POLICY_CATEGORIES: Record<PolicyCategory, { label: string; badge: string }> = {
  client: { label: "للعميل", badge: "العميل" },
  lawyer: { label: "للمحامي", badge: "المحامي" },
}

const clientPrivacySections: PolicySectionData[] = [
  {
    kind: "paragraph",
    id: "collected-data",
    title: "البيانات التي نجمعها",
    body: "الاسم، رقم الجوال، البريد الإلكتروني، المدينة، وبيانات الحساب.",
  },
  {
    kind: "paragraph",
    id: "consultation-data",
    title: "بيانات الاستشارات",
    body: "تفاصيل الاستشارة، المحادثات، المرفقات، المذكرات الصوتية، المواعيد والتقييمات.",
  },
  {
    kind: "paragraph",
    id: "payment-data",
    title: "بيانات الدفع",
    body: "يتم استخدام بيانات الدفع لإتمام عمليات الدفع والاسترداد وإدارة المعاملات.",
  },
  {
    kind: "paragraph",
    id: "data-usage",
    title: "استخدام البيانات",
    body: "نستخدم بياناتك لتقديم الاستشارات، ربطك بالمحامي المناسب، إدارة المواعيد والدفع وتحسين الخدمة.",
  },
  {
    kind: "paragraph",
    id: "data-sharing",
    title: "مشاركة البيانات",
    body: "قد تتم مشاركة البيانات الضرورية مع المحامي ومزودي الخدمات المرتبطين بتشغيل المنصة.",
  },
  {
    kind: "paragraph",
    id: "consultation-confidentiality",
    title: "سرية الاستشارات",
    body: "نحافظ على سرية بيانات ومحتوى الاستشارات والمستندات وفق الأنظمة المعمول بها.",
  },
  {
    kind: "paragraph",
    id: "data-protection",
    title: "حماية البيانات",
    body: "نتخذ الإجراءات التقنية والتنظيمية المناسبة لحماية بياناتك من الوصول أو الاستخدام غير المصرح به.",
  },
  {
    kind: "paragraph",
    id: "data-retention",
    title: "الاحتفاظ بالبيانات",
    body: "تحتفظ بالبيانات للمدة اللازمة لتقديم الخدمة والوفاء بالالتزامات النظامية.",
  },
  {
    kind: "paragraph",
    id: "your-rights",
    title: "حقوقك",
    body: "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها وفق الحالات المسموح بها نظامًا.",
  },
  {
    kind: "paragraph",
    id: "account-deletion",
    title: "حذف الحساب",
    body: "يمكنك طلب حذف حسابك، مع إمكانية الاحتفاظ ببعض البيانات إذا كان ذلك مطلوبًا نظامًا.",
  },
  {
    kind: "paragraph",
    id: "policy-updates",
    title: "تحديث السياسة",
    body: "قد يتم تحديث سياسة الخصوصية، وسيتم توضيح تاريخ آخر تحديث داخل التطبيق",
  },
]

const clientTermsItems = [
  "باستخدامك تطبيق راسخ، فإنك توافق على الالتزام بهذه الشروط.",
  "يجب تقديم بيانات صحيحة ومحدثة عند التسجيل واستخدام الخدمة.",
  "يجب استخدام التطبيق لأغراض قانونية ومشروعة فقط.",
  "يمكنك طلب استشارة فورية أو كتابية أو مجدولة من خلال التطبيق.",
  "أنت مسؤول عن صحة المعلومات والمستندات التي تقدمها للمحامي.",
  "يجب أن تتم جميع عمليات الدفع من خلال التطبيق، ولا تتحمل المنصة مسؤولية أي مبالغ يتم دفعها خارجها.",
  "يجب الإلتزام بالآداب العامة وعدم الإساءة أو التهديد أو استخدام المنصة بطريقة غير مشروعة.",
  "يمنع استخدام المحادثة لمشاركة بيانات التواصل بهدف إتمام الاستشارة خارج المنصة.",
  "تخضع عمليات الإلغاء والاسترداد للسياسة المعتمدة في التطبيق.",
  "يمكنك تقييم المحامي بعد انتهاء الاستشارة.",
  "يمكنك فتح نزاع عند وجود مشكلة في الاستشارة، وسيتم مراجعته من إدارة المنصة.",
  "يحق للمنصة تعليق أو إيقاف الحساب عند مخالفة الشروط.",
  "تخضع هذه الشروط للأنظمة المعمول بها في المملكة العربية السعودية.",
]

const clientRefundItems: PolicyCardItem[] = [
  {
    title: "إلغاء الاستشارة المجدولة قبل أكثر من ساعتين",
    description: "يتم إرجاع المبلغ إلى محفظة العميل دون خصم عمولة المنصة.",
    icon: CalendarClock,
  },
  {
    title: "إلغاء الاستشارة قبل أقل من ساعتين",
    description: "يتم خصم عمولة المنصة وإرجاع المبلغ المتبقي إلى محفظة العميل.",
    icon: CalendarX,
  },
  {
    title: "عدم حضور المحامي",
    description: "يحق للعميل إنهاء الجلسة وفتح نزاع، ويتم التعامل مع المبلغ وفق نتيجة النزاع والسياسة المالية للمنصة.",
    icon: UserX,
  },
  {
    title: "الاستشارة الفورية – عدم قبول الطلب",
    description: "إذا لم يقبل المحامي الطلب خلال دقيقتين، يتم إرجاع كامل المبلغ إلى محفظة العميل دون خصم عمولة من المحامي.",
    icon: Timer,
  },
  {
    title: "الاستشارة الفورية – عدم دخول المحامي",
    description: "إذا لم يدخل المحامي خلال 5 دقائق، يتم إرجاع المبلغ إلى محفظة العميل مع خصم عمولة المنصة من المحامي.",
    icon: VideoOff,
  },
  {
    title: "عدم حضور العميل",
    description: "يتم التعامل مع قيمة الاستشارة وفق سياسة الحضور والإلغاء المعتمدة في المنصة.",
    icon: UserX,
  },
]

const lawyerPrivacySections: PolicySectionData[] = [
  {
    kind: "paragraph",
    id: "account-data",
    title: "بيانات الحساب",
    body: "الاسم، رقم الجوال، البريد الإلكتروني، المدينة والصورة الشخصية.",
  },
  {
    kind: "paragraph",
    id: "license-data",
    title: "بيانات الترخيص",
    body: "رقم رخصة مزاولة المهنة، صورة الترخيص، وتاريخ انتهائه.",
  },
  {
    kind: "paragraph",
    id: "verification-data",
    title: "بيانات التحقق",
    body: "قد تشمل بيانات الهوية والسجل التجاري عند الحاجة.",
  },
  {
    kind: "paragraph",
    id: "professional-data",
    title: "البيانات المهنية",
    body: "المؤهلات، الخبرات، سنوات الخبرة والتخصصات.",
  },
  {
    kind: "paragraph",
    id: "banking-data",
    title: "البيانات البنكية",
    body: "بيانات الحساب البنكي وIBAN وبيانات المحفظة والمعاملات المالية.",
  },
  {
    kind: "paragraph",
    id: "consultation-data",
    title: "بيانات الاستشارات",
    body: "يتم معالجة البيانات المتعلقة بالاستشارات والمواعيد والمحادثات والمرفقات والنزاعات.",
  },
  {
    kind: "paragraph",
    id: "data-usage",
    title: "استخدام البيانات",
    body: "نستخدم بياناتك للتحقق من أهليتك، تفعيل حسابك، عرض ملفك للعملاء، إدارة الاستشارات والمواعيد والمدفوعات.",
  },
  {
    kind: "paragraph",
    id: "data-sharing",
    title: "مشاركة البيانات",
    body: "يتم عرض البيانات المهنية اللازمة للعملاء، بينما يتم تقييد الوصول إلى البيانات الحساسة على الجهات والأشخاص المصرح لهم.",
  },
  {
    kind: "paragraph",
    id: "client-confidentiality",
    title: "سرية بيانات العملاء",
    body: "يلتزم المحامي بالحفاظ على سرية بيانات العملاء والمستندات والمحادثات.",
  },
  {
    kind: "paragraph",
    id: "data-protection",
    title: "حماية البيانات",
    body: "يتم اتخاذ إجراءات مناسبة لحماية بيانات المحامي من الوصول غير المصرح به.",
  },
  {
    kind: "paragraph",
    id: "data-retention",
    title: "الاحتفاظ بالبيانات",
    body: "نحتفظ بالبيانات حسب الحاجة التشغيلية والمتطلبات النظامية.",
  },
  {
    kind: "paragraph",
    id: "your-rights",
    title: "حقوقك",
    body: "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها وفق الأنظمة.",
  },
  {
    kind: "paragraph",
    id: "account-deletion",
    title: "حذف الحساب",
    body: "يمكنك طلب حذف الحساب، مع مراعاة البيانات التي يجب الاحتفاظ بها نظامًا.",
  },
]

const lawyerTermsItems = [
  "باستخدامك تطبيق راسخ كمحامٍ، فإنك توافق على الالتزام بهذه الشروط.",
  "يجب تقديم بيانات صحيحة وسارية واستكمال متطلبات التحقق.",
  "يجب تقديم رخصة مزاولة مهنة سارية والالتزام بتحديث بياناتها.",
  "لا يتم تفعيل ظهور المحامي للعملاء إلا بعد اعتماد الحساب من إدارة المنصة.",
  "يلتزم المحامي بتقديم الخدمات القانونية وفق الأنظمة والقواعد المهنية المعمول بها.",
  "يمكن للمحامي تقديم استشارات فورية أو كتابية أو مجدولة.",
  "يجب الالتزام بالمواعيد والاستشارات التي يتم قبولها.",
  "يمنع نقل الاستشارة أو العميل خارج المنصة بهدف تجاوز نظام الدفع أو عمولة المنصة.",
  "يلتزم المحامي بالحفاظ على سرية بيانات العملاء ومستنداتهم ومحادثاتهم.",
  "يجب إدخال ملخص الاستشارة قبل إنهائها وفق متطلبات التطبيق.",
  "يحق للعميل تقييم الخدمة، ويجب التعامل مع التقييمات بطريقة مهنية.",
  "تخضع المبالغ والعمولات والمحفظة وطلبات السحب للسياسة المالية المعتمدة في المنصة.",
  "في حال وجود نزاع، يتم تعليق المبلغ محل النزاع حتى صدور القرار وفق آلية المنصة.",
  "يحق للمنصة تعليق أو إيقاف الحساب عند انتهاء الترخيص أو مخالفة الشروط.",
  "تخضع هذه الشروط للأنظمة المعمول بها في المملكة العربية السعودية.",
]

const lawyerFinancialItems: PolicyCardItem[] = [
  {
    title: "عدم اتخاذ قرار بشأن الاستشارة الفورية خلال دقيقتين",
    description: "يتم إرجاع كامل المبلغ للعميل دون خصم عمولة من المحامي.",
    icon: Timer,
  },
  {
    title: "قبول الاستشارة الفورية وعدم الدخول خلال 5 دقائق",
    description: "يتم إرجاع المبلغ للعميل ويتم خصم عمولة المنصة من محفظة المحامي.",
    icon: VideoOff,
  },
  {
    title: "الاستشارة المجدولة",
    description: "يتم تعليق مستحقات الاستشارة وفق النظام المالي إلى انتهاء الاستشارة، ثم تنتقل إلى المبلغ المتاح للسحب بعد خصم عمولة المنصة.",
    icon: CalendarClock,
  },
  {
    title: "وجود نزاع",
    description: "يتم تعليق المبلغ محل النزاع إلى حين صدور القرار.",
    icon: Scale,
  },
  {
    title: "النزاع لصالح العميل",
    description: "يتم رد المبلغ للعميل مع خصم عمولة المنصة من محفظة المحامي.",
    icon: CircleCheck,
  },
  {
    title: "النزاع لصالح المحامي",
    description: "يتم تحويل المبلغ المعلق إلى محفظة المحامي.",
    icon: Gavel,
  },
  {
    title: "طلبات السحب",
    description: "لا يجوز أن يتجاوز طلب السحب المبلغ المتاح للسحب، ويظل الطلب قيد المعالجة حتى اعتماده من الإدارة.",
    icon: Wallet,
  },
]

export const POLICIES: PolicyData[] = [
  {
    category: "client",
    slug: "privacy",
    title: "سياسة الخصوصية – العميل",
    description: "كيفية جمع بياناتك واستخدامها وحمايتها عند استخدامك لمنصة راسخ.",
    icon: ShieldCheck,
    lastUpdated: "16 أغسطس 2026",
    metaTitle: "سياسة الخصوصية للعميل | راسخ",
    metaDescription:
      "اطّلع على سياسة خصوصية منصة راسخ للعميل: البيانات التي نجمعها، كيفية استخدامها وحمايتها، وحقوقك المتعلقة ببياناتك.",
    sections: clientPrivacySections,
  },
  {
    category: "client",
    slug: "terms",
    title: "شروط الاستخدام – العميل",
    description: "الشروط والأحكام التي تحكم استخدامك لتطبيق راسخ كمستفيد من الخدمات القانونية.",
    icon: FileText,
    lastUpdated: "16 أغسطس 2026",
    metaTitle: "شروط الاستخدام للعميل | راسخ",
    metaDescription:
      "شروط استخدام منصة راسخ للعميل: البنود والالتزامات التي تحكم استخدام التطبيق وخدمات الاستشارات القانونية.",
    sections: [
      {
        kind: "numbered",
        id: "terms-items",
        title: "بنود شروط الاستخدام",
        items: clientTermsItems,
      },
    ],
  },
  {
    category: "client",
    slug: "refund",
    title: "الإلغاء والاسترداد – للعميل",
    description: "سياسة الإلغاء والاسترداد لحالات الاستشارات المجدولة والفورية وفق أوقات الإلغاء.",
    icon: RotateCcw,
    lastUpdated: "16 أغسطس 2026",
    metaTitle: "الإلغاء والاسترداد للعميل | راسخ",
    metaDescription:
      "سياسة الإلغاء والاسترداد في منصة راسخ للعميل: حالات إلغاء الاستشارات والحالات المرتبطة بعدم الحضور واسترداد المبالغ.",
    sections: [
      {
        kind: "cards",
        id: "refund-cases",
        title: "حالات الإلغاء والاسترداد",
        items: clientRefundItems,
      },
    ],
  },
  {
    category: "lawyer",
    slug: "privacy",
    title: "سياسة الخصوصية – المحامي",
    description: "كيفية جمع بياناتك المهنية والشخصية ومعالجتها وحمايتها كمحامٍ مسجل في راسخ.",
    icon: UserCheck,
    lastUpdated: "16 أغسطس 2026",
    metaTitle: "سياسة الخصوصية للمحامي | راسخ",
    metaDescription:
      "اطّلع على سياسة خصوصية منصة راسخ للمحامي: بيانات الحساب والترخيص والتحقق، وكيفية معالجتها وحمايتها.",
    sections: lawyerPrivacySections,
  },
  {
    category: "lawyer",
    slug: "terms",
    title: "شروط الاستخدام – المحامي",
    description: "الشروط والالتزامات المهنية التي تحكم عمل المحامين المسجلين في منصة راسخ.",
    icon: Gavel,
    lastUpdated: "16 أغسطس 2026",
    metaTitle: "شروط الاستخدام للمحامي | راسخ",
    metaDescription:
      "شروط استخدام منصة راسخ للمحامي: الالتزامات المهنية، سرية بيانات العملاء، وقواعد تقديم الاستشارات القانونية.",
    sections: [
      {
        kind: "numbered",
        id: "terms-items",
        title: "بنود شروط الاستخدام",
        items: lawyerTermsItems,
      },
    ],
  },
  {
    category: "lawyer",
    slug: "financial",
    title: "الالتزامات المالية – للمحامي",
    description: "قواعد المبالغ والعمولات والمحفظة وطلبات السحب المتعلقة بالاستشارات والنزاعات.",
    icon: Wallet,
    lastUpdated: "16 أغسطس 2026",
    metaTitle: "الالتزامات المالية للمحامي | راسخ",
    metaDescription:
      "الالتزامات المالية للمحامي في منصة راسخ: عمولات الاستشارات، تعليق المبالغ عند النزاعات، وطلبات السحب من المحفظة.",
    sections: [
      {
        kind: "cards",
        id: "financial-obligations",
        title: "الالتزامات المالية للمحامي",
        items: lawyerFinancialItems,
      },
    ],
  },
]

export function getPolicy(category: string, slug: string): PolicyData | undefined {
  return POLICIES.find(
    (policy) => policy.category === category && policy.slug === slug,
  )
}

export function getPoliciesByCategory(category: PolicyCategory): PolicyData[] {
  return POLICIES.filter((policy) => policy.category === category)
}

export const POLICIES_PAGE_META = {
  title: "السياسات والأنظمة | راسخ",
  description:
    "اطّلع على سياسات وشروط استخدام منصة راسخ لضمان تجربة واضحة وآمنة لجميع المستخدمين.",
}