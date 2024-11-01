'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "What is the return policy?",
    answer: "Our customer-friendly return policy allows you to return items within 30 days of purchase for a full refund. This policy is designed to ensure your satisfaction with every purchase.",
    details: [
      "Items must be in their original condition and packaging.",
      "A receipt or proof of purchase is required for all returns.",
      "Refunds will be processed to the original payment method.",
      "Special orders or customized items may not be eligible for return."
    ],
    options: [
      "Free returns for orders over $50",
      "Exchange option available for different sizes or colors",
      "Store credit option if you don't have the original receipt"
    ]
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping times vary depending on your location and the shipping method chosen. We strive to process and ship all orders as quickly as possible to ensure you receive your items in a timely manner.",
    details: [
      "Domestic orders typically arrive within 3-5 business days.",
      "International orders may take 7-14 business days.",
      "Expedited shipping options are available at checkout for faster delivery."
    ],
    options: [
      "Standard shipping (3-5 business days)",
      "Express shipping (2-3 business days)",
      "Next-day delivery (order by 2 PM for next-day arrival)"
    ]
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries worldwide. We're committed to serving our global customers with reliable and efficient shipping options.",
    details: [
      "International shipping costs are calculated based on destination and package weight.",
      "Customs duties and taxes may apply and are the responsibility of the recipient.",
      "Not all products may be available for international shipping due to regulations."
    ],
    options: [
      "Standard international shipping (7-14 business days)",
      "Express international shipping (3-5 business days)",
      "Duty-paid shipping option available for select countries"
    ]
  },
  {
    question: "How can I track my order?",
    answer: "Tracking your order is easy and convenient. Once your order is shipped, you'll receive all the necessary information to keep tabs on your package's journey.",
    details: [
      "A confirmation email with a tracking number is sent once your order ships.",
      "You can track your package on our website using the order number or tracking number.",
      "Real-time updates are provided as your package moves through our shipping network."
    ],
    options: [
      "Email notifications for order status changes",
      "SMS tracking alerts (opt-in required)",
      "Integration with major shipping carriers' tracking systems"
    ]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We offer a wide range of secure payment options to make your shopping experience as convenient as possible.",
    details: [
      "All transactions are encrypted and processed securely.",
      "We do not store your full credit card information.",
      "Multiple currency options are available for international customers."
    ],
    options: [
      "Credit cards (Visa, MasterCard, American Express, Discover)",
      "PayPal",
      "Apple Pay and Google Pay",
      "Shop Pay for faster checkout",
      "Afterpay for installment payments on eligible purchases"
    ]
  }
]

export function EnhancedFaqSection() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>{faq.answer}</p>
                  {faq.details && (
                    <div>
                      <h4 className="font-semibold mb-2">Details:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {faq.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {faq.options && (
                    <div>
                      <h4 className="font-semibold mb-2">Options:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {faq.options.map((option, idx) => (
                          <li key={idx}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}