export interface User {
    id: string;
    createdAt: string;
    name: string;
    avatar: string;
    email: string;
    country: string;
    color: string;
    phone: string;
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt'>;
export type UserUpdateInput = Partial<UserCreateInput>;

/**
 * Тип стану для Server Actions, що використовується в формах.
 * Допомагає обробляти помилки валідації та системні повідомлення.
 */
export interface ActionState {
    /** Словник помилок валідації: ключ - назва поля, значення - масив текстів помилок */
    errors?: Record<string, string[]>;
    /** Загальне повідомлення про результат операції (успіх або помилка) */
    message?: string | null;
}
