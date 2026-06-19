import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-800px mx-auto">
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-[13px] text-muted">Last updated: May 2026</p>
          </div>
        </section>
        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-800px mx-auto space-y-8">
            {[
              { title: "1. General", text: "These Terms and Conditions govern the use of the Gutu Gasthaus platform and the booking of homestay experiences in Bangladesh. By using our website and booking a stay, you agree to these terms in full." },
              { title: "2. Booking and Payment", text: "Bookings are confirmed after submission and payment. Payment is processed by invoice and bank transfer. No credit card is required at the time of booking. After submitting your booking, you will receive a confirmation email with payment details. All prices are listed in CHF." },
              { title: "3. Cancellation Policy", text: "Cancellations made within 7 days of the booking date are eligible for an 80% refund. Cancellations made after 7 days of the booking date are eligible for a 50% refund. The 7-day window is measured from the date of booking confirmation, not the travel start date." },
              { title: "4. What's Included", text: "All packages include a two-week stay with a host family, three meals per day, local transportation, airport pickup and dropoff, cultural activities, and local tours. The Premium package additionally includes cooking classes, music sessions, crafts workshops, and additional local tours." },
              { title: "5. What's Not Included", text: "Personal market purchases, souvenirs, personal expenses, and international flights are not included unless the guest selects a package with a flight ticket." },
              { title: "6. Host Family Placement", text: "Guests may choose their preferred host family based on availability. Gutu Gasthaus reserves the right to reassign guests to another host family if the originally selected host becomes unavailable. In such cases, guests will be notified in advance and given the option to accept the alternative or receive a full refund." },
              { title: "7. Liability", text: "Gutu Gasthaus acts as an intermediary between guests and host families. While we carefully vet all host families, we are not liable for personal injury, loss of property, or other incidents that may occur during the stay. Guests are advised to obtain appropriate travel insurance." },
              { title: "8. Privacy", text: "We respect your privacy. Please review our Privacy Policy for details on how we collect, use, and protect your personal information." },
              { title: "9. Changes to Terms", text: "Gutu Gasthaus reserves the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date." },
              { title: "10. Contact", text: "For questions about these terms, please contact us at hello@gutugasthaus.com." },
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
