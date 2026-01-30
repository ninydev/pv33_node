'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { UserSchema } from '../schemas';
import { fetchUserCreate } from '../api/fetchUserCreate';
import { ActionState, UserCreateInput } from '../types';

export async function createUserAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
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
        await fetchUserCreate(validatedFields.data as UserCreateInput);
    } catch (error) {
        console.error(error);
        return {
            message: 'Помилка бази даних: не вдалося створити користувача.',
        };
    }

    revalidatePath('/users');
    redirect('/users/page/1');
}
