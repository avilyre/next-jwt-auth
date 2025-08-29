import z from "zod";

export const SigninFormSchema = z.object({
  email: z.email('Email is required'),
  password: z.string().min(8, 'Password is required'),
});

export type SigninFormSchema = z.infer<typeof SigninFormSchema>; 
