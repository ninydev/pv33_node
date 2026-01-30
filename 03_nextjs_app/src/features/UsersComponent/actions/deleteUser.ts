'use server';

import { revalidatePath } from 'next/cache';
import { fetchUserDelete } from '../api/fetchUserDelete';

export async function deleteUserAction(id: string): Promise<void> {
    try {
        await fetchUserDelete(id);
        revalidatePath('/users');
    } catch (error) {
        console.error(error);
        throw new Error('Не вдалося видалити користувача');
    }
}
