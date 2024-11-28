import * as z from 'zod';

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
        message:
          'Password must contain at least one digit, one latin lowercase, uppercase letter and no other characters',
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
