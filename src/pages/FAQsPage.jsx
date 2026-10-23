import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqsData } from '../data/faqs'
import './FAQsPage.css'

export default function FAQsPage() {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id))
  }

  return (
    <main className="faq-page-wrapper">
      <h1 className="faq-title">FAQS</h1>

      <div
        className="faq-container"
        role="region"
        aria-label="Frequently Asked Questions"
      >
        {faqsData.map((faq) => {
          const isOpen = openId === faq.id

          return (
            <article
              key={faq.id}
              className={`faq-card ${isOpen ? 'faq-card--open' : ''}`}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                id={`faq-question-${faq.id}`}
              >
                <span className="faq-question-text">
                  Q. {faq.question}
                </span>

                <span
                  className={`faq-chevron ${isOpen ? 'faq-chevron--rotated' : ''}`}
                  aria-hidden="true"
                >
                  <ChevronDown size={22} strokeWidth={2.75} />
                </span>
              </button>

              <div
                id={`faq-answer-${faq.id}`}
                role="region"
                aria-labelledby={`faq-question-${faq.id}`}
                className={`faq-answer-wrapper ${isOpen ? 'faq-answer-wrapper--open' : ''}`}
              >
                <div className="faq-answer-inner">
                  <div className="faq-answer-content">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
