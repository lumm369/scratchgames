import { ScrollText } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - Terms of Service',
    description: 'Terms of Service for ScratchGames',
    alternates: {
      canonical: `${siteConfig.url}/terms`
    },
  };
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Terms of Service
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
            Welcome to ScratchGames.info. By accessing our website, you agree to these terms and conditions. 
            Please read them carefully before using our services.
          </p>
        </section>

        {/* Terms of Use */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Terms of Use</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>You must be at least 13 years old to use this service</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You agree not to misuse or attempt to disrupt our services</li>
            <li>We reserve the right to terminate accounts that violate our terms</li>
          </ul>
        </section>

        {/* Content Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Content Guidelines</h2>
          <p className="text-muted-foreground">
            All content must comply with our community guidelines. Users may not post:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
            <li>Inappropriate or offensive content</li>
            <li>Content that infringes on intellectual property rights</li>
            <li>Malicious code or harmful software</li>
            <li>Spam or unauthorized promotional material</li>
          </ul>
        </section>

        {/* Privacy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Privacy Policy</h2>
          <p className="text-muted-foreground">
            Our privacy policy explains how we collect, use, and protect your personal information. 
            By using our service, you agree to our data practices as described in the privacy policy.
          </p>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Limitations of Liability</h2>
          <p className="text-muted-foreground">
            ScratchGames provides its services &quot;as is&quot; without any warranty. We are not responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
            <li>User-generated content</li>
            <li>Service interruptions or technical issues</li>
            <li>Loss of data or financial losses</li>
            <li>Third-party links and content</li>
          </ul>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. We will notify users of any material changes 
            via email or through our website.
          </p>
        </section>

        {/* Contact Information */}
        <section className="border-t pt-8 mt-8">
          <p className="text-center text-muted-foreground">
            If you have any questions about these terms, please contact us at{' '}
            <a href="mailto:legal@scratchgames.info" className="text-primary hover:underline">
              legal@scratchgames.info
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}