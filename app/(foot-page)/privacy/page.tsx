import { Shield, Lock, Eye } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - Privacy Policy',
    description: 'Privacy Policy for ScratchGames',
    alternates: {
      canonical: `${siteConfig.url}/privacy`,
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Privacy Policy
      </h1>

      <div className="prose prose-gray max-w-none space-y-8">
        {/* Last Updated */}
        <p className="text-sm text-muted-foreground text-center">
          Last updated: January 1, 2025
        </p>

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            At ScratchGames, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your personal information when you use our services.
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-medium">2.1 Information you provide:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Account information (username, email)</li>
              <li>Profile information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-medium">2.2 Automatically collected information:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Device information</li>
              <li>Log data</li>
              <li>Usage statistics</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </section>

        {/* Data Usage */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To provide and maintain our services</li>
            <li>To improve user experience</li>
            <li>To communicate with you</li>
            <li>To ensure platform security</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Protection</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete your data</li>
            <li>Right to object to data processing</li>
          </ul>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Cookies Policy</h2>
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to improve your browsing experience, 
            analyze site traffic, and understand where our visitors come from.
          </p>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. We will notify you of any changes by 
            posting the new privacy policy on this page.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t pt-8 mt-8">
          <p className="text-center text-muted-foreground">
            For questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@scratchgames.info" className="text-primary hover:underline">
              privacy@scratchgames.info
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}