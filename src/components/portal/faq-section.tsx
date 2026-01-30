"use client"

import { Accordion } from "@/ui/accordion"
import { Card } from "@/ui/card"
import type { Dictionary } from "@/i18n/utils"

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
    <Card level={2} className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
            {dict.portal?.faq?.title || "FAQ"}
          </h3>
          <p className="text-foreground/50 text-sm">
            {dict.portal?.faq?.subtitle || "Frequently asked questions"}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Accordion
            items={faqs.map((faq, index) => ({
              id: `faq-${index}`,
              trigger: (
                <span className="text-left font-medium">{faq.question}</span>
              ),
              content: <p className="text-foreground/70 text-sm">{faq.answer}</p>,
            }))}
          />
        </div>
      </div>
    </Card>
  )
}
