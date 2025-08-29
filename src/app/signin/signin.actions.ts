'use server'

import { SigninFormSchema } from "./signin.schemas";
import { $ZodFlattenedError } from "zod/v4/core";
import z from "zod";

export type SigninFormProps = {
  email: string;
  password: string;
}

export type SigninFormErrors = {
  error: $ZodFlattenedError<SigninFormProps>['fieldErrors'];
}

export type SigninFormState = SigninFormProps | SigninFormErrors

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

  return user
}