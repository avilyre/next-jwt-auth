import z from "zod";

export const SignupFormSchema = z.object({
  fullname: z.string().min(5, 'Fullname is required'),
  email: z.email('Email is required'),
  password: z.string().min(8, 'Password is required'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine(fields => fields.password === fields.confirmPassword, {
  error: 'Password do not match',
  path: ['confirmPassword']
});

export type SignUpFormSchema = z.infer<typeof SignupFormSchema>; 
