'use client';

import { signout, SignoutFormState } from "@/app/actions/user";
import { Button } from "@/components/button";
import { startTransition, useActionState } from "react";

export function LogoutButton() {
  const [state, signoutAction, isPending] = useActionState(signout, {} as SignoutFormState);

  const handleLogout = () => {
    startTransition(() => {
      signoutAction();
    });
  }

  return (
    <Button type="button" isLoading={isPending} onClick={handleLogout}>
      Logout
    </Button>
  );
}