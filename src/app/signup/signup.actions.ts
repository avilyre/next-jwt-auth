'use server'

import { SignupFormSchema } from "./signup.schemas";
import { $ZodFlattenedError } from "zod/v4/core";
import z from "zod";

export type SignupFormProps = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignupFormErrors = {
  error: $ZodFlattenedError<SignupFormProps>['fieldErrors'];
}

export type SignupFormState = SignupFormProps | SignupFormErrors

export async function signup(_state: SignupFormState, formData: FormData) {
  const fullname = formData.get('fullname');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  const user: SignupFormProps = {
    fullname: fullname as string,
    email: email as string,
    password: password as string,
    confirmPassword: confirmPassword as string,
  };

  const validationResult = SignupFormSchema.safeParse(user)

  if (!validationResult.success) {
    const errors: SignupFormErrors = {
      error: z.flattenError(validationResult.error).fieldErrors,
    };
    return errors;
  }

  return user
}