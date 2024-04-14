// components/GDPRPolicy.tsx

import React from "react"
import Head from "next/head"
import Link from "next/link"

interface GDPRSection {
  title: string
  content: string
}
interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-secondary">{title}</h2>
      {children}
    </div>
  )
}

const gdprData: GDPRSection[] = [
  {
    title: "1. Data Collection and Purpose",
    content:
      "We collect and process personal information for specific and legitimate purposes, such as user registration, newsletter subscriptions, and improving our services. We will inform you of the purpose and legal basis for processing your data.",
  },
  {
    title: "2. Consent",
    content:
      "By providing your personal information, you consent to its collection and processing as outlined in this policy. You have the right to withdraw your consent at any time by contacting us at info@gamecreators.io.",
  },
  {
    title: "3. Data Minimization",
    content:
      "We only collect and process the personal data necessary for the purposes for which it is intended. We do not retain your data longer than required.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement technical and organizational measures to ensure the security of your personal data, protecting it from unauthorized access, disclosure, alteration, and destruction.",
  },
  {
    title: "5. Data Subject Rights",
    content:
      "You have the right to access, rectify, or erase your personal data. To exercise these rights or inquire about the processing of your data, please contact us at [contact@email.com]. We will respond to your requests within a reasonable timeframe.",
  },
  {
    title: "6. Data Transfers",
    content:
      "Your data may be processed or stored outside the European Economic Area (EEA). In such cases, we ensure adequate safeguards are in place to protect your data, in compliance with GDPR requirements.",
  },
  {
    title: "7. Data Breach Notification",
    content:
      "In the event of a data breach that poses a risk to your rights and freedoms, we will promptly notify the relevant authorities and inform you as required by GDPR.",
  },
  {
    title: "8. Data Protection Officer (DPO)",
    content:
      "We have appointed a Data Protection Officer who can be contacted at info@gamecreators.io for any inquiries or concerns regarding your personal data and our GDPR compliance.",
  },
  {
    title: "9. Cookies and Tracking Technologies",
    content:
      "Our use of cookies and similar technologies is outlined in our Privacy Policy. You can manage your cookie preferences through your browser settings.",
  },
  {
    title: "10. Updates to the GDPR Policy",
    content:
      "We reserve the right to update this GDPR Policy. Any changes will be communicated to you through our website or other appropriate means.",
  },
]

const GDPRPolicy: React.FC = () => {
  return (
    <div className="bg-background min-h-screen py-8 max-w-7xl mx-auto">
      <Head>
        <title>GameCreators.io - GDPR Policy</title>
      </Head>
      <div className="container mx-auto bg-white p-8 rounded shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">GDPR Policy</h1>
        </header>
        <div className="w-[80%] mx-auto">
          {/* Include GDPR Sections */}
          {gdprData.map(({ title, content }, index) => (
            <Section key={index} title={title}>
              <p>{content}</p>
            </Section>
          ))}

          {/* GDPR Contact Information Section */}
          <Section title="10. Contact Information">
            <p>
              For questions or concerns regarding our GDPR Policy, please contact us at{" "}
              <Link href="mailto:info@gamecreators.io " className="text-secondary">
                info@gamecreators.io
              </Link>
            </p>
          </Section>
        </div>
      </div>
    </div>
  )
}

export default GDPRPolicy
