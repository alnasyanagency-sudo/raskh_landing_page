"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { ease, fadeInUp, staggerContainer } from "@/lib/animations"

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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <section id="faq" className="section-padding bg-muted/30 scroll-mt-20" aria-label="الأسئلة الشائعة">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease }}
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
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
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-right"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base font-semibold text-foreground leading-relaxed">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-primary text-primary-foreground"
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
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="px-5 pb-5 pt-0" id={`faq-answer-${index}`} role="region">
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
        </motion.div>
      </div>
    </section>
  )
}
