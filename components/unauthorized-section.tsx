import { Search, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UnauthorizedSection() {
  return (
    <>
      <div className="mx-auto mt-16 max-w-3xl rounded-lg border bg-gray-50/50 p-8">
        <div className="text-left text-sm text-gray-500">
          Try a sample search
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg border bg-white p-4 shadow-sm">
          <Search className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">
            What is the best CRM software for small businesses?
          </span>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Sign in to see if your content is being cited by AI providers
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold">
          Why choose our platform?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Search className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold">Real-time Insights</h3>
              <p className="mt-2 text-center text-gray-600">
                Monitor how AI providers are using your content in real-time
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Zap className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold">Multiple Providers</h3>
              <p className="mt-2 text-center text-gray-600">
                Track citations across various AI platforms in one place
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Shield className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold">Content Protection</h3>
              <p className="mt-2 text-center text-gray-600">
                Ensure your content is properly attributed and cited
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-4 pb-24 text-center md:px-6">
        <h2 className="text-3xl font-bold">
          Ready to optimize your AI visibility?
        </h2>
        <p className="mt-4 text-gray-600">
          Join thousands of SEO professionals who are already tracking their AI
          rankings
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/sign-up">Start tracking now</Link>
        </Button>
      </section>
    </>
  );
}
