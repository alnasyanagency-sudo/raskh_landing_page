"use client"

import { useState } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type RequestType = "استفسار" | "شكوى" | "حذف حساب"

const requestOptions: { value: RequestType; label: string }[] = [
  { value: "استفسار", label: "استفسار" },
  { value: "شكوى", label: "شكوى" },
  { value: "حذف حساب", label: "حذف حساب" },
]

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  requestType?: string
  message?: string
}

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [requestType, setRequestType] = useState<RequestType>("استفسار")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!name.trim()) {
      newErrors.name = "يرجى إدخال الاسم"
    }

    if (!email.trim()) {
      newErrors.email = "يرجى إدخال البريد الإلكتروني"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح"
    }

    if (!phone.trim()) {
      newErrors.phone = "يرجى إدخال رقم الهاتف"
    }

    if (!requestType) {
      newErrors.requestType = "يرجى اختيار نوع الطلب"
    }

    if (!message.trim()) {
      newErrors.message = "يرجى كتابة الرسالة"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(false)

    if (!validate()) return

    const whatsappMessage = `طلب تواصل جديد — راسخ للمحاماة

الاسم: ${name.trim()}

البريد الإلكتروني: ${email.trim()}

رقم الهاتف: ${phone.trim()}

نوع الطلب: ${requestType}

الرسالة:
${message.trim()}`

    const encoded = encodeURIComponent(whatsappMessage)
    const url = `https://wa.me/966541241344?text=${encoded}`

    setShowSuccess(true)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-card p-6 md:p-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-sm font-medium">
            الاسم <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            className={errors.name ? "border-destructive focus-visible:ring-destructive/20" : ""}
            autoComplete="name"
          />
          {errors.name && (
            <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email + Phone */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-sm font-medium">
              البريد الإلكتروني <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              className={errors.email ? "border-destructive focus-visible:ring-destructive/20 text-left" : "text-left"}
              dir="ltr"
              autoComplete="email"
            />
            {errors.email && (
              <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-sm font-medium">
              رقم الهاتف <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+966 5X XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.phone}
              className={errors.phone ? "border-destructive focus-visible:ring-destructive/20 text-left" : "text-left"}
              dir="ltr"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Request Type */}
        <div className="space-y-2">
          <Label htmlFor="contact-type" className="text-sm font-medium">
            نوع الطلب <span className="text-destructive">*</span>
          </Label>
          <Select value={requestType} onValueChange={(v) => setRequestType(v as RequestType)}>
            <SelectTrigger
              id="contact-type"
              aria-invalid={!!errors.requestType}
              className={`w-full h-9 bg-transparent ${errors.requestType ? "border-destructive focus:ring-destructive/20" : ""}`}
            >
              <SelectValue placeholder="اختر نوع الطلب" />
            </SelectTrigger>
            <SelectContent>
              {requestOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.requestType && (
            <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.requestType}
            </p>
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">
            {requestType === "حذف حساب"
              ? "سيتم إرسال طلب حذف الحساب إلى فريق راسخ عبر WhatsApp لمراجعته واتخاذ الإجراء اللازم."
              : "اختر نوع الطلب المناسب وسيتم توجيه رسالتك إلى القسم المختص."}
          </p>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="contact-message" className="text-sm font-medium">
            الرسالة <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="contact-message"
            placeholder="اكتب رسالتك هنا بالتفصيل..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message}
            className={`min-h-[140px] resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
            rows={5}
          />
          {errors.message && (
            <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold rounded-xl">
          إرسال
        </Button>

        {showSuccess && (
          <div className="flex items-start gap-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4 text-sm leading-relaxed text-green-800 dark:text-green-200">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
            <p>تم تجهيز طلبك، سيتم تحويلك إلى WhatsApp لإرساله إلى فريق راسخ.</p>
          </div>
        )}
      </form>
    </div>
  )
}
