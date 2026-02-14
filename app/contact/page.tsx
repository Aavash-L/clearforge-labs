import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, Mail } from 'lucide-react'

export const metadata = {
  title: 'Contact | Clearforge Labs',
  description: 'Get in touch to discuss your project. Free 15-minute strategy call available.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Header */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Let's Talk About Your Project</h1>
              <p className="text-xl text-neutral-600">
                Tell me about your business and what you're trying to improve.
                <br />I'll review everything before our call so we can make it productive.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Booking Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-8 h-8 text-charcoal-900" />
                  <h2 className="text-2xl font-bold">Book a Strategy Call</h2>
                </div>
                <p className="text-neutral-600 mb-8">
                  Prefer to talk directly? Book a free 15-minute call. We'll discuss your needs and see if we're a good fit.
                </p>
                
                {/* Google Calendar Embed Placeholder */}
                <div className="bg-neutral-100 border-2 border-neutral-300 p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
                    <p className="text-neutral-600 font-medium mb-2">Google Calendar Appointment Scheduler</p>
                    <p className="text-sm text-neutral-500">
                      Replace this with your Google Calendar embed code or Calendly widget
                    </p>
                    <div className="mt-6">
                      <code className="text-xs bg-neutral-200 px-3 py-1 rounded">
                        &lt;iframe src="your-calendar-url"&gt;&lt;/iframe&gt;
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-charcoal-900" />
                  <h2 className="text-2xl font-bold">Send Your Details</h2>
                </div>
                <p className="text-neutral-600 mb-8">
                  Not ready for a call? Fill out the form below and I'll reach out within 24 hours.
                </p>

                {/* Native Form (can be replaced with Tally embed) */}
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold mb-2">
                      Current Website (if any)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-semibold mb-2">
                      Industry *
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors"
                      placeholder="e.g., Salon, Gym, Clinic, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="need" className="block text-sm font-semibold mb-2">
                      What do you need help with? *
                    </label>
                    <select
                      id="need"
                      name="need"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="new-website">New website</option>
                      <option value="website-redesign">Website redesign</option>
                      <option value="booking-system">Booking system</option>
                      <option value="payment-integration">Payment integration</option>
                      <option value="automation">Automation</option>
                      <option value="full-system">Full system (website + booking + payments)</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors bg-white"
                    >
                      <option value="">Select a range</option>
                      <option value="under-1k">Under $1,000</option>
                      <option value="1k-2k">$1,000 - $2,000</option>
                      <option value="2k-3k">$2,000 - $3,000</option>
                      <option value="3k-plus">$3,000+</option>
                      <option value="flexible">Flexible / Need guidance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-semibold mb-2">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors bg-white"
                    >
                      <option value="">When do you need this?</option>
                      <option value="urgent">ASAP (within 1 week)</option>
                      <option value="soon">Soon (2-3 weeks)</option>
                      <option value="flexible">Flexible (1-2 months)</option>
                      <option value="exploring">Just exploring options</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Tell me more about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-neutral-300 focus:border-charcoal-900 outline-none transition-colors resize-none"
                      placeholder="What problem are you trying to solve? What does success look like?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Send Message
                  </button>

                  <p className="text-sm text-neutral-500 text-center">
                    I'll respond within 24 hours during business days
                  </p>
                </form>

                {/* Alternative: Tally Embed */}
                <div className="mt-8 p-4 bg-neutral-50 border-2 border-neutral-300">
                  <p className="text-sm text-neutral-600 mb-2">
                    <strong>Alternative:</strong> Replace the form above with a Tally.so embed for free form handling:
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded block overflow-x-auto">
                    &lt;iframe src="https://tally.so/r/your-form-id" width="100%" height="600"&gt;&lt;/iframe&gt;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Me</h2>
              <div className="space-y-4">
                <p className="text-neutral-700">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hello@clearforgelabs.com" className="text-charcoal-900 hover:underline font-medium">
                    hello@clearforgelabs.com
                  </a>
                </p>
                <p className="text-neutral-700">
                  <strong>Location:</strong> Edison, NJ (serving clients nationwide)
                </p>
                <p className="text-neutral-700">
                  <strong>Response Time:</strong> Within 24 hours on business days
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
