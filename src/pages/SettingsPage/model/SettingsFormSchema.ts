import * as z from 'zod';

export const SettingsFormSchema = z.object({
  name: z.string().min(1),
});
