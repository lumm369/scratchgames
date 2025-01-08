import { Shield, AlertTriangle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - Safety Center',
    description: 'Learn about our safety guidelines and how to report issues.',
    alternates: {
      canonical: `${siteConfig.url}/safety`,
    },
  };
}

export default function SafetyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Safety Guidelines
      </h1>

      {/* Safety Introduction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Online Safety First
          </CardTitle>
          <CardDescription>
            Our commitment to providing a safe gaming environment for all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            At ScratchGames, we prioritize the safety and well-being of our users. 
            Please follow these guidelines to ensure a positive gaming experience for everyone.
          </p>
        </CardContent>
      </Card>

      {/* Safety Rules */}
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>General Safety Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Never share personal information with other users</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Be respectful to other players and avoid inappropriate behavior</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Report any suspicious or harmful content immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Use appropriate language in game chats and comments</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>All games must be suitable for users of all ages</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>No violence, hate speech, or inappropriate content</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Respect copyright and intellectual property rights</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Report Issues */}
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-6 w-6" />
            Report an Issue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            If you encounter any inappropriate content or behavior, please report it immediately.
            Our team will review and take necessary action.
          </p>
          <Button asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}