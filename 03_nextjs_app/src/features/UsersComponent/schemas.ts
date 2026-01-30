import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string().min(2, { message: "Ім'я має бути не менше 2 символів" }),
    email: z.email({ message: "Некоректний формат email" }),
    phone: z.string().default(''),
    country: z.string().default(''),
    avatar: z.url({ message: "Аватар має бути валідним URL" }).or(z.string().length(0)).default(''),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Колір має бути у форматі HEX (наприклад, #ffffff)" }).default('#ffffff'),
});

export type UserFormData = z.infer<typeof UserSchema>;
