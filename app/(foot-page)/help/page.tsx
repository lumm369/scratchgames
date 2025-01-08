import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - Help Center',
    description: 'Find answers to common questions and get help with ScratchGames.info.',
    alternates: {
      canonical: `${siteConfig.url}/help`,
    },
  };
}

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I start playing games on ScratchGames?",
        a: "Simply browse our collection and click on any game to start playing. No registration required!"
      },
      {
        q: "Are all games free to play?",
        a: "Yes, all games on ScratchGames are completely free to play."
      }
    ]
  },
  {
    category: "Technical Issues",
    questions: [
      {
        q: "Why won't the game load?",
        a: "Please ensure you have a stable internet connection and try refreshing the page. If the issue persists, try clearing your browser cache."
      },
      {
        q: "Which browsers are supported?",
        a: "We support all modern browsers including Chrome, Firefox, Safari, and Edge."
      }
    ]
  },
  {
    category: "Account & Settings",
    questions: [
      {
        q: "Do I need an account to play?",
        a: "No, you can play all games without an account. However, creating an account allows you to save favorites and track your progress."
      },
      {
        q: "How do I report a bug?",
        a: "Use our contact form or email us at support@scratchgames.info with details about the issue."
      }
    ]
  }
];

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Help Center
      </h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          className="pl-10"
        />
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqCategories.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Additional Help */}
      <div className="mt-12 p-6 bg-card rounded-lg border text-center">
        <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          Can&apos;t find what you&apos;re looking for? Contact our support team.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}