import React from 'react';
import fetchUserById from '@/features/UsersComponent/api/fetchUserById';
import UserForm from '@/features/UsersComponent/ui/UserForm';
import { notFound } from 'next/navigation';
import { updateUserAction } from '@/features/UsersComponent/actions';

interface UserEditPageProps {
    params: Promise<{ id: string }>;
}

export default async function UserEditPage({ params }: UserEditPageProps) {
    const { id } = await params;

    let user;
    try {
        user = await fetchUserById(id);
    } catch (error) {
        console.error(error);
        notFound();
    }
        
    if (!user) {
        notFound();
    }

    // Привязываем ID к экшену обновления
    const updateActionWithId = updateUserAction.bind(null, id);

    return (
        <div className="container mx-auto p-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Редагування користувача</h1>
            <UserForm initialData={user} action={updateActionWithId} />
        </div>
    );
}
