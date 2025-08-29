'use server'

import { SigninFormSchema } from "./signin.schemas";
import { $ZodFlattenedError } from "zod/v4/core";
import z from "zod";
import { redirect } from "next/navigation";

export type SigninFormProps = {
  email: string;
  password: string;
}

export type SigninFormErrors = {
  error: $ZodFlattenedError<SigninFormProps>['fieldErrors'];
}

export type SigninResponseError = {
  authError: {
    status: number;
    message: string;
  }
}

export type SigninFormState = SigninFormProps | SigninFormErrors | SigninResponseError

export async function signin(_state: SigninFormState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user: SigninFormSchema = {
    email: email as string,
    password: password as string,
  };

  const validationResult = SigninFormSchema.safeParse(user)

  if (!validationResult.success) {
    const errors: SigninFormErrors = {
      error: z.flattenError(validationResult.error).fieldErrors,
    };
    return errors;
  }

  const response = await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  const signinResponse = await response.json();

  if (response.status === 200) redirect('/signup');

  return {
    authError: {
      status: response.status,
      message: signinResponse.message,
    },
  }
}