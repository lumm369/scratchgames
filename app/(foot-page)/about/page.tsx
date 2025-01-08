import { Mail, Github } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - About',
    description: 'Learn more about ScratchGames and our mission.',
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
  };
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        About ScratchGames
      </h1>

      {/* Main Content */}
      <div className="prose prose-gray max-w-none space-y-6">
        <section className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            ScratchGames is dedicated to providing a platform for Scratch gaming enthusiasts to share and discover quality games. 
            We carefully curate and organize outstanding game creations from the Scratch community, making it easy for players to find games they love.
          </p>
        </section>

        <section className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Curated Selection: Strict quality control for all games</li>
            <li>Clear Categories: Well-organized game classifications</li>
            <li>Real-time Updates: Synced with latest Scratch platform games</li>
            <li>User-Friendly: Clean interface and smooth experience</li>
          </ul>
        </section>

        <section className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="flex flex-col space-y-4">
            <Link 
              href="mailto:contact@scratchgames.info"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>contact@scratchgames.info</span>
            </Link>
            <Link 
              href="https://github.com/your-username"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub Repository</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}