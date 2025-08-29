'use client'

import { useActionState } from "react";
import { signin, SigninFormState } from "../signin.actions";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export function SigninForm() {
  const [state, action, isPending] = useActionState(signin, {} as SigninFormState)

  return (
    <form action={action} className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-6 border-2 border-gray-800 rounded-lg w-full max-w-[500px]">
        <h1 className="text-2xl font-medium font-sans flex flex-row items-center gap-2">
          <span className="text-white">NextJS</span>
          <span className="text-gray-400">Signin</span>
        </h1>

        <Input
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          error={'error' in state && state?.type === 'form' && state?.error?.email ? state.error.email[0] : undefined}
        />

        <Input
          name="password"
          label="Password"
          placeholder="********"
          error={'error' in state && state?.type === 'form' && state?.error?.password ? state.error.password[0] : undefined}
        />

        {'error' in state && state.type === 'auth' && state.error.status !== 200 && (
            <p className="text-sm text-red-400">{state.error.message}</p>
        )}

        <footer className="mt-4 w-full">
          <Button type="submit" isLoading={isPending}>
            Sign In
          </Button>
        </footer>
      </div>
    </form>
  );
}
