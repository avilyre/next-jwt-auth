'use client'

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-6 border-2 border-gray-800 rounded-lg w-full max-w-[500px]">
        <h1 className="text-2xl font-medium font-sans flex flex-row items-center gap-2">
          <span className="text-white">NextJS</span>
          <span className="text-gray-400">Authentication</span>
        </h1>

        <footer className="mt-4 w-full flex flex-col items-center gap-2">
          <Button
            onClick={() => router.push('/signin')}
            type="submit"
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/signup')}
            type="submit"
          >
            Sign Up
          </Button>
        </footer>
      </div>
    </div>
  );
}
