'use client'

import { Button } from "@/components/button";

export default function Profile() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-6 border-2 border-gray-800 rounded-lg w-full max-w-[500px]">
        <h1 className="text-2xl font-medium font-sans flex flex-row items-center gap-2">
          <span className="text-white">NextJS</span>
          <span className="text-gray-400">Profile</span>
        </h1>

        <footer className="mt-4 w-full flex flex-col items-center gap-2">
          <Button onClick={() => {}}>
            Logout
          </Button>
        </footer>
      </div>
    </div>
  );
}