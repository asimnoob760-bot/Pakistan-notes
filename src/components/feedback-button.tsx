"use client";

import { useState } from "react";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    issue: "",
    page: typeof window !== 'undefined' ? window.location.pathname : ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send to Formspree or similar
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFormData({ issue: "", page: typeof window !== 'undefined' ? window.location.pathname : '' });
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#8B9A6B] text-white shadow-lg hover:bg-[#7a8a5a] transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Give feedback"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-[#FFFBF7] rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#6b6b6b] hover:text-[#2c2c2c] transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-[#8B9A6B]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">Thank You!</h3>
                <p className="text-sm text-[#6b6b6b]">Your feedback helps us improve.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">Send Feedback</h3>
                <p className="text-sm text-[#6b6b6b] mb-4">
                  Found a mistake? Have a suggestion? Let us know.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
                      Which page?
                    </label>
                    <input
                      type="text"
                      value={formData.page}
                      onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-sm text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B]"
                      placeholder="Page URL"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
                      What&apos;s the issue?
                    </label>
                    <textarea
                      value={formData.issue}
                      onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#e8e0d5] rounded-lg text-sm text-[#2c2c2c] focus:outline-none focus:border-[#8B9A6B] resize-none"
                      placeholder="Describe the issue or suggestion..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors text-sm font-medium"
                  >
                    Send Feedback
                  </button>
                </form>

                <p className="text-xs text-[#6b6b6b] mt-4 text-center">
                  Your feedback goes directly to the team. No account needed.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
