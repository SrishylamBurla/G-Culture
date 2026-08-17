import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-white">

      <section className="px-5 pb-20 pt-28 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-4xl">

          <Link
            to="/"
            className="mb-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/35 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to G-Culture
          </Link>

          <div className="mb-14">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-white/30" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Legal
              </span>
            </div>

            <h1 className="text-5xl font-normal tracking-[-0.05em] sm:text-6xl">
              Terms & Conditions
            </h1>

            <p className="mt-5 text-sm text-white/35">
              Last updated: August 17, 2026
            </p>

          </div>


          <div className="space-y-12 text-sm leading-8 text-white/45">

            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                1. Introduction
              </h2>

              <p>
                Welcome to G-Culture. These Terms &
                Conditions govern your use of the
                G-Culture website and your purchase of
                products through our online store.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                2. Using Our Website
              </h2>

              <p>
                You agree to use this website only for
                lawful purposes and in a way that does
                not interfere with the operation,
                security or availability of the service.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                3. Products & Availability
              </h2>

              <p>
                Product descriptions, images, prices and
                availability may change without prior
                notice. We make reasonable efforts to
                display product information accurately.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                4. Pricing & Payments
              </h2>

              <p>
                Prices displayed on the website are in
                Indian Rupees unless otherwise stated.
                Orders are subject to successful payment
                authorization and availability.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                5. Orders
              </h2>

              <p>
                Placing an order constitutes a request
                to purchase the selected products.
                G-Culture reserves the right to cancel
                or refuse an order in circumstances
                including product unavailability,
                pricing errors or suspected fraudulent
                activity.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                6. Intellectual Property
              </h2>

              <p>
                The G-Culture name, branding, graphics,
                photographs, designs, written content and
                other website materials are protected by
                applicable intellectual property laws.
                They may not be reproduced or used
                without appropriate authorization.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                7. User Accounts
              </h2>

              <p>
                If you create an account, you are
                responsible for maintaining the
                confidentiality of your account
                information and for activity performed
                through your account.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                8. Changes to These Terms
              </h2>

              <p>
                G-Culture may update these Terms &
                Conditions from time to time. Updated
                terms will be published on this page
                with a revised effective date.
              </p>
            </section>


            <section>
              <h2 className="mb-4 text-xl font-medium text-white">
                9. Contact
              </h2>

              <p>
                If you have questions regarding these
                Terms & Conditions, contact us at{" "}
                <a
                  href="mailto:support@gculture.in"
                  className="text-white underline underline-offset-4"
                >
                  customersupport@gculture.in
                </a>
                .
              </p>
            </section>

          </div>

        </div>

      </section>

    </main>
  );
}