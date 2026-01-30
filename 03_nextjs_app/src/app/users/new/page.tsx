import React from 'react';
import UserForm from '@/features/UsersComponent/ui/UserForm';
import { createUserAction } from '@/features/UsersComponent/actions';

export default function NewUserPage() {
    return (
        <div className="container mx-auto p-4 bg-transparent">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Створення нового користувача</h1>
                <p className="text-gray-600 mt-2">Заповніть форму нижче, щоб додати нового користувача до системи</p>
            </header>

            <UserForm action={createUserAction} />
            
            <footer className="mt-12 text-sm text-gray-500 text-center">
                Дані валідуються за допомогою Zod перед відправкою на сервер.
            </footer>
        </div>
    );
}
