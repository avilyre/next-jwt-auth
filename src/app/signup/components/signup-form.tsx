'use client'

import { useActionState } from "react";
import { signup, SignupFormErrors } from "../signup.actions";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export function SignupForm() {
  const [state, action, isPending] = useActionState(signup, {} as SignupFormErrors )

  return (
    <form action={action} className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-6 border-2 border-gray-800 rounded-lg w-full max-w-[500px]">
        <h1 className="text-2xl font-medium font-sans flex flex-row items-center gap-2">
          <span className="text-white">NextJS</span>
          <span className="text-gray-400">Signup</span>
        </h1>

        <Input
          name="fullname"
          label="Fullname"
          placeholder="John Doe"
          error={'error' in state && state?.error?.fullname ? state?.error?.fullname[0] : undefined}
        />

        <Input
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          error={'error' in state && state?.error?.email ? state?.error?.email[0] : undefined}
        />

        <Input
          name="password"
          label="Password"
          placeholder="********"
          error={'error' in state && state?.error?.password ? state?.error?.password[0] : undefined}
        />

        <Input
          name="confirmPassword"
          label="Confirm Password"
          placeholder="********"
          error={'error' in state && state?.error?.confirmPassword ? state?.error?.confirmPassword[0] : undefined}
        />

        <footer className="mt-4 w-full">
          <Button type="submit" isLoading={isPending}>
            Sign Up
          </Button>
        </footer>
      </div>
    </form>
  );
}
