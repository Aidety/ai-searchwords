import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOutUser } from "./actions";
import SearchForm from "@/components/search-form";
import UnauthorizedSection from "@/components/unauthorized-section";

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-end mb-16">
          {user ? (
            <form action={signOutUser}>
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          )}
        </nav>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl pb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            See your search rankings in a new light
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Harness the power of multiple AI providers to get comprehensive
            insights into your search rankings.
          </p>

          {user ? (
            <section className="mt-12">
              <SearchForm />
            </section>
          ) : (
            <UnauthorizedSection />
          )}
        </div>
      </div>
    </div>
  );
}
