"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "كيف يمكنني حجز استشارة قانونية؟",
    answer: "يمكنك حجز استشارة بسهولة من خلال تحميل تطبيق راسخ، ثم اختيار المحامي المناسب من قائمة المحامين المرخصين، وتحديد الموعد المناسب لك. ستتلقى تأكيداً فورياً بالحجز."
  },
  {
    question: "هل المحامون مرخصون من وزارة العدل؟",
    answer: "نعم، جميع المحامين المسجلين في منصة راسخ مرخصون رسمياً من وزارة العدل في المملكة العربية السعودية، ونتحقق من تراخيصهم بشكل دوري لضمان جودة الخدمة."
  },
  {
    question: "ما هي تكلفة الاستشارة القانونية؟",
    answer: "تختلف أسعار الاستشارات حسب المحامي وتخصصه وسنوات خبرته. يمكنك الاطلاع على أسعار كل محامي في صفحته الشخصية قبل الحجز، مع شفافية كاملة في التسعير."
  },
  {
    question: "هل يمكنني إلغاء أو تعديل موعد الاستشارة؟",
    answer: "نعم، يمكنك إلغاء أو تعديل موعد الاستشارة قبل 24 ساعة من الموعد المحدد دون أي رسوم. للإلغاء خلال الـ 24 ساعة الأخيرة، يرجى التواصل مع الدعم."
  },
  {
    question: "كيف تتم الاستشارة؟",
    answer: "تتم الاستشارة عبر مكالمة فيديو آمنة داخل التطبيق، مما يوفر لك الخصوصية والراحة. يمكنك أيضاً مشاركة المستندات بشكل آمن أثناء الاستشارة."
  },
  {
    question: "هل معلوماتي محمية وسرية؟",
    answer: "نعم، نلتزم بأعلى معايير الأمان والخصوصية. جميع المحادثات والمستندات مشفرة، ونتبع سياسة سرية صارمة تتوافق مع أنظمة المملكة العربية السعودية."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            الأسئلة الشائعة
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            كل ما تحتاج معرفته
          </h2>
          <p className="text-muted-foreground text-lg">
            إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div
                className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "border-primary/20 shadow-soft"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-right"
                >
                  <span className="text-base font-semibold text-foreground leading-relaxed">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-primary text-primary-foreground rotate-0"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-muted-foreground leading-relaxed text-[15px]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
