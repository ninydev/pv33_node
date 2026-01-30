'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { UserSchema } from '../schemas';
import fetchUserUpdate from '../api/fetchUserUpdate';
import { ActionState, UserUpdateInput } from '../types';

export async function updateUserAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        country: formData.get('country'),
        avatar: formData.get('avatar'),
        color: formData.get('color'),
    };

    const validatedFields = UserSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Помилка валідації. Будь ласка, перевірте введені дані.',
        };
    }

    try {
        await fetchUserUpdate(id, validatedFields.data as UserUpdateInput);
    } catch (error) {
        console.error(error);
        return {
            message: 'Помилка бази даних: не вдалося оновити користувача.',
        };
    }

    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    redirect(`/users/${id}`);
}
