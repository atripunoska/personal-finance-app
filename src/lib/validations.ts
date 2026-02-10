import { z } from 'zod';

// ─── Auth Schemas ─────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .max(100, 'Name must be 100 characters or fewer.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

// ─── Budget Schema ────────────────────────────────────────

export const budgetSchema = z.object({
  category: z.string().min(1, 'Please select a category.'),
  maximum: z
    .number({ invalid_type_error: 'Maximum amount must be a number.' })
    .positive('Maximum amount must be greater than 0.'),
  theme: z.string().min(1, 'Please select a theme.'),
});

// ─── Pot Schema ───────────────────────────────────────────

export const potSchema = z.object({
  name: z
    .string()
    .min(1, 'Pot name is required.')
    .max(50, 'Pot name must be 50 characters or fewer.'),
  target: z
    .number({ invalid_type_error: 'Target must be a number.' })
    .positive('Target must be greater than 0.'),
  theme: z.string().min(1, 'Please select a theme.'),
});

// ─── Money Amount Schema ──────────────────────────────────

export const moneyAmountSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Amount must be a number.' })
    .positive('Amount must be greater than 0.'),
});

// ─── Helpers ──────────────────────────────────────────────

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function getFieldErrors<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: FieldErrors<z.infer<T>> } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: FieldErrors<z.infer<T>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof z.infer<T>;
    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false, errors };
}

export function getFieldError<T extends z.ZodTypeAny>(
  schema: T,
  field: string,
  value: unknown
): string | undefined {
  const partialData = { [field]: value };
  const result = schema.safeParse(partialData);
  if (result.success) return undefined;
  const fieldIssue = result.error.issues.find(
    (issue) => issue.path[0] === field
  );
  return fieldIssue?.message;
}
