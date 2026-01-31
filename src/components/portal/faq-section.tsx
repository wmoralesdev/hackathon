"use client"

import { Accordion } from "@/ui/accordion"
import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"
import { PortalSectionHeader } from "./portal-section-header"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  dict: Dictionary
}

export function FAQSection({ dict }: FAQSectionProps) {
  const faqs: FAQItem[] = dict.portal?.faq?.items || [
    {
      question: "What time is code freeze?",
      answer: "Code freeze is at 2:30 PM on January 31, 2026. Make sure to submit all deliverables before then.",
    },
    {
      question: "Can I submit after code freeze?",
      answer: "No, all submissions must be completed before the code freeze deadline.",
    },
    {
      question: "Do I need to submit a working app?",
      answer: "Your app doesn't need to be fully functional, but you must submit a SaaS landing page and at least one social media post.",
    },
    {
      question: "Who can submit deliverables?",
      answer: "Any team member can submit, but typically the team lead handles the submission.",
    },
  ]

  return (
    <Card level={2}>
      <div className="space-y-4">
        <PortalSectionHeader
          title={dict.portal?.faq?.title || "FAQ"}
          subtitle={dict.portal?.faq?.subtitle || "Frequently asked questions"}
        />

        <div className="pt-2">
          <Accordion
            items={faqs.map((faq, index) => ({
              id: `faq-${index}`,
              trigger: (
                <span className="text-left font-medium text-sm hover:text-accent transition-colors">{faq.question}</span>
              ),
              content: <p className="text-foreground/70 text-sm leading-relaxed pl-4 border-l-2 border-accent/20">{faq.answer}</p>,
            }))}
          />
        </div>
      </div>
    </Card>
  )
}
