import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="flex flex-col items-center justify-center space-y-8 text-center max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to Blogs
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Share your thoughts, read amazing stories, and connect with a community of writers and readers.
          </p>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col w-full sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
