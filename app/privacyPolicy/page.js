const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "disclosure", label: "Disclosure of Information" },
  { id: "data-security", label: "Data Security" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "privacy-rights", label: "Your Privacy Rights" },
  { id: "childrens-privacy", label: "Children’s Privacy" },
  { id: "changes", label: "Changes to this Policy" },
  { id: "contact", label: "Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className='min-h-screen bg-[#F5F7FA] py-16 px-4 md:px-8'>
      <div className='mx-auto flex w-full max-w-5xl gap-10'>
        {/* =========== LEFT SIDEBAR =========== */}
        <aside className='hidden w-56 shrink-0 md:block'>
          <div className='sticky top-20 rounded-lg bg-white px-5 py-6 shadow-sm border border-gray-200'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 mb-3'>
              Sections
            </p>
            <nav className='space-y-2 text-sm'>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className='block text-gray-600 hover:text-[#0B3A6F] hover:underline'>
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* =========== MAIN CONTENT =========== */}
        <section className='flex-1'>
          <div className='rounded-xl bg-white px-6 py-8 md:px-10 md:py-10 shadow-sm border border-gray-200'>
            {/* Title + Effective date */}
            <header className='mb-8'>
              <h1 className='text-[30px] md:text-[34px] font-bold text-[#0B3A6F] leading-tight'>
                Privacy Policy
              </h1>
              <p className='mt-1 text-xs md:text-sm text-gray-500'>
                Effective Date: February&nbsp;1,&nbsp;2026
              </p>
            </header>

            <div className='space-y-8 text-[14px] md:text-[15px] leading-relaxed text-[#222]'>
              {/* 1. Introduction */}
              <section id='introduction'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  1. Introduction
                </h2>
                <p className='mb-3'>
                  AdvisorEvaluate.com (“we,” “our,” or “us”) is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website, AdvisorEvaluate.com (the “Site”).
                </p>
                <p>
                  By accessing or using the Site, you agree to the collection
                  and use of information in accordance with this Privacy Policy.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id='information-we-collect'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  2. Information We Collect
                </h2>
                <p className='mb-4'>
                  We may collect information about you in the following ways:
                </p>

                <h3 className='font-semibold mb-1'>Personal Information</h3>
                <p className='mb-2'>
                  Personal information you voluntarily provide to us, including
                  but not limited to:
                </p>
                <ul className='ml-5 list-disc space-y-1 mb-4'>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>
                    Any information submitted through contact forms, inquiries,
                    or evaluations
                  </li>
                </ul>

                <h3 className='font-semibold mb-1'>
                  Automatically Collected Information
                </h3>
                <p className='mb-2'>
                  When you visit the Site, we may automatically collect certain
                  information, such as:
                </p>
                <ul className='ml-5 list-disc space-y-1 mb-4'>
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages viewed and time spent on the Site</li>
                  <li>Referring website URLs</li>
                </ul>
                <p>
                  This information is used to help maintain the security and
                  performance of the Site and to improve user experience.
                </p>
              </section>

              {/* 3. How We Use Your Information */}
              <section id='how-we-use'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  3. How We Use Your Information
                </h2>
                <p className='mb-2'>
                  We may use the information we collect to:
                </p>
                <ul className='ml-5 list-disc space-y-1'>
                  <li>Respond to inquiries or requests</li>
                  <li>Provide, operate, and improve the Site</li>
                  <li>
                    Communicate with you regarding services, updates, or
                    relevant information
                  </li>
                  <li>Monitor usage trends and Site performance</li>
                  <li>Protect against unauthorized access or misuse</li>
                </ul>
              </section>

              {/* 4. Cookies and Tracking Technologies */}
              <section id='cookies'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  4. Cookies and Tracking Technologies
                </h2>
                <p>
                  AdvisorEvaluate.com may use cookies and similar tracking
                  technologies to enhance functionality and analyze website
                  usage. Cookies help us understand how visitors interact with
                  the Site.
                </p>
              </section>

              {/* 5. Disclosure of Information */}
              <section id='disclosure'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  5. Disclosure of Information
                </h2>
                <p className='mb-2'>
                  We do not sell, rent, or trade your personal information. We
                  may share information only:
                </p>
                <ul className='ml-5 list-disc space-y-1'>
                  <li>
                    With trusted service providers who assist in operating the
                    Site
                  </li>
                  <li>
                    To comply with applicable laws, regulations, or legal
                    processes
                  </li>
                  <li>
                    To protect the rights, property, and safety of
                    AdvisorEvaluate.com and its users
                  </li>
                </ul>
              </section>

              {/* 6. Data Security */}
              <section id='data-security'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  6. Data Security
                </h2>
                <p>
                  We implement reasonable administrative, technical, and
                  physical safeguards designed to protect your personal
                  information. While we strive to use commercially acceptable
                  means to protect your data, no method of transmission over the
                  internet or electronic storage is 100% secure.
                </p>
              </section>

              {/* 7. Third-Party Links */}
              <section id='third-party-links'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  7. Third-Party Links
                </h2>
                <p>
                  The Site may contain links to third-party websites.
                  AdvisorEvaluate.com is not responsible for the privacy
                  practices or content of those third-party sites. We encourage
                  you to review their privacy policies before providing any
                  information.
                </p>
              </section>

              {/* 8. Your Privacy Rights */}
              <section id='privacy-rights'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  8. Your Privacy Rights
                </h2>
                <p>
                  Depending on your jurisdiction, you may have rights regarding
                  your personal information, including the right to access,
                  correct, or request deletion of your data. Requests can be
                  submitted using the contact information below.
                </p>
              </section>

              {/* 9. Children’s Privacy */}
              <section id='childrens-privacy'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  9. Children’s Privacy
                </h2>
                <p>
                  AdvisorEvaluate.com is not intended for individuals under the
                  age of 13. We do not knowingly collect personal information
                  from children.
                </p>
              </section>

              {/* 10. Changes to This Privacy Policy */}
              <section id='changes'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  10. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated effective
                  date.
                </p>
              </section>

              {/* 11. Contact Information */}
              <section id='contact'>
                <h2 className='text-[17px] font-semibold text-[#0B3A6F] mb-2'>
                  11. Contact Information
                </h2>
                <p className='mb-1'>
                  If you have questions about this Privacy Policy or how your
                  information is handled, please contact us at:
                </p>
                <p>AdvisorEvaluate.com</p>
                <p>Email: info@advisorevaluate.com</p>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
