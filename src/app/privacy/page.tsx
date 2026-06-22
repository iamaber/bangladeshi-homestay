import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[800px] mx-auto">
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[13px] text-muted">Last updated: May 2026</p>
          </div>
        </section>
        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[800px] mx-auto space-y-8">
            {[
              { title: "1. Information We Collect", text: "We collect personal information that you provide when using our platform, including: name, email address, phone number, country of residence, booking preferences, and payment information. We also collect usage data such as pages visited and time spent on our website." },
              { title: "2. How We Use Your Information", text: "Your information is used to process bookings, communicate booking confirmations and invoices, provide customer support, improve our platform, and comply with legal obligations. We do not sell your personal data to third parties." },
              { title: "3. Payment Information", text: "Payment is processed by invoice and bank transfer. We do not collect or store credit card information. Invoice and payment records are retained for accounting and legal purposes." },
              { title: "4. Data Sharing", text: "We share necessary booking information with your assigned host family, including your name, nationality, dietary preferences, and arrival details. We may share anonymized, aggregated data for analytics purposes." },
              { title: "5. Data Security", text: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encrypted data transmission (SSL/TLS) and secure storage practices." },
              { title: "6. Cookies", text: "Our website uses cookies to improve your browsing experience and analyze website traffic. You can manage cookie preferences through your browser settings. Essential cookies are required for the website to function properly." },
              { title: "7. Your Rights", text: "You have the right to access your personal data, request correction or deletion, and object to processing. You may also request data portability. To exercise these rights, please contact us at hello@gutugasthaus.com." },
              { title: "8. Data Retention", text: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, typically no longer than 3 years after your last interaction with our service, unless a longer retention period is required by law." },
              { title: "9. Changes to This Policy", text: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date." },
              { title: "10. Contact", text: "For privacy-related inquiries, contact us at hello@gutugasthaus.com." },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-serif text-[20px] text-ink mb-3">{section.title}</h2>
                <p className="text-[14px] font-light text-ink2/80 leading-[1.85]">{section.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
