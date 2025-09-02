'use server'

import { $ZodFlattenedError } from "zod/v4/core";
import z from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SigninFormSchema } from "../signin/signin.schemas";

export type SigninFormProps = {
  email: string;
  password: string;
}

export type SigninFormErrors = {
  type: 'form'
  error: $ZodFlattenedError<SigninFormProps>['fieldErrors'];
}

export type SigninResponseError = {
  type: 'auth',
  error: {
    status: number;
    message: string;
  }
}

export type SigninFormState = SigninFormProps | SigninFormErrors | SigninResponseError
export type SignoutFormState = {
  success: boolean;
  message: string;
}

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
      type: 'form',
      error: z.flattenError(validationResult.error).fieldErrors,
    };
    return errors;
  }

  const response = await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const signinResponse = await response.json();

  if (response.status === 200) {
    const cookieStore = await cookies();
    const { token } = signinResponse;

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    })

    redirect('/profile')
  };

  return {
      type: 'auth',
      error: {
        status: response.status,
        message: signinResponse.message,
      },
    } as SigninResponseError
}

export async function signout(_state: SignoutFormState) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('triggered')

  if (!token) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  cookieStore.delete('token');
  redirect('/signin');
  
  return {
    success: true,
    message: 'Success',
  }
}