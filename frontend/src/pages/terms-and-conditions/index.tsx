// components/Terms.tsx
import React from "react"
import Head from "next/head"
import Link from "next/link"

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-secondary mb-2">{title}</h2>
      {children}
    </section>
  )
}

const termsData = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.",
  },
  {
    title: "2. User Registration",
    content:
      "Certain features of GameCreators.io may require you to register and create an account. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "3. User Conduct",
    content:
      "You agree to use GameCreators.io for lawful purposes only. You are prohibited from engaging in any activity that may disrupt or interfere with the functionality of the website or violate applicable laws.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content on GameCreators.io, including but not limited to text, graphics, logos, images, and software, is the property of GameCreators.io and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use any content from our website without prior written consent.",
  },
  {
    title: "5. Third-Party Links",
    content:
      "GameCreators.io may include links to third-party websites. We are not responsible for the content or privacy practices of these external sites. Your interactions with these sites are subject to their terms and policies.",
  },
  {
    title: "6. Disclaimer of Warranties",
    content:
      "GameCreators.io is provided 'as is' without any warranties, expressed or implied. We do not guarantee the accuracy, completeness, or reliability of the content on our website.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "GameCreators.io and its affiliates, directors, officers, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website.",
  },
  {
    title: "8. Governing Law",
    content:
      "These Terms of Service are governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].",
  },
  {
    title: "9. Changes to Terms",
    content:
      "GameCreators.io reserves the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the website after such changes constitutes acceptance of the updated terms.",
  },
]

const Terms: React.FC = () => {
  return (
    <div className="bg-background min-h-screen py-8 max-w-7xl mx-auto">
      <Head>
        <title>GameCreators.io - Terms of Service</title>
      </Head>
      <div className="container mx-auto bg-white p-8 rounded shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Terms of Service</h1>
        </header>
        <div className="w-[80%] mx-auto">
          {termsData.map(({ title, content }, index) => (
            <Section key={index} title={title}>
              <p>{content}</p>
            </Section>
          ))}
          <Section title="10. Contact Information">
            <p>
              For questions or concerns regarding these Terms of Service, please contact us at{" "}
              <Link href="mailto:info@gamecreators.io" className="text-secondary">
                info@gamecreators.io
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  )
}

export default Terms
