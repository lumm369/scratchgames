import { Cookie, Settings, Shield } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - Cookies Policy',
    description: 'Learn about the cookies we use and how to manage them.',
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
  };
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Cookies Policy
      </h1>

      <div className="prose prose-gray max-w-none space-y-8">
        {/* Last Updated */}
        <p className="text-sm text-muted-foreground text-center">
          Last updated: January 1, 2025
        </p>

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
          <p className="text-muted-foreground">
            Cookies are small text files that are placed on your device when you visit our website. 
            They help us provide you with a better experience and allow certain features to work.
          </p>
        </section>

        {/* Types of Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Cookie className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="text-xl font-medium">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  Required for basic website functionality. These cannot be disabled.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Settings className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="text-xl font-medium">Functional Cookies</h3>
                <p className="text-muted-foreground">
                  Enhance your experience by remembering your preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="text-xl font-medium">Analytics Cookies</h3>
                <p className="text-muted-foreground">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Usage */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Remember your preferences and settings</li>
            <li>Keep you logged in during your visit</li>
            <li>Track website usage to improve our services</li>
            <li>Monitor website performance</li>
          </ul>
        </section>

        {/* Managing Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
          <p className="text-muted-foreground">
            Most web browsers allow you to manage your cookie preferences. You can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
            <li>Delete all cookies from your browser</li>
            <li>Set your browser to block cookies</li>
            <li>Allow only certain types of cookies</li>
            <li>Receive notifications when cookies are set</li>
          </ul>
        </section>

        {/* Third Party Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="text-muted-foreground">
            Some of our pages may contain content from other websites which may set their own cookies. 
            These third-party cookies are not controlled by us.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t pt-8 mt-8">
          <p className="text-center text-muted-foreground">
            Questions about our cookies policy? Contact us at{' '}
            <a href="mailto:privacy@scratchgames.info" className="text-primary hover:underline">
              privacy@scratchgames.info
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}