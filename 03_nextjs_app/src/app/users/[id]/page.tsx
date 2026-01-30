import React from 'react';
import fetchUserById from '@/features/UsersComponent/api/fetchUserById';
import UserDetails from '@/features/UsersComponent/ui/UserDetails';
import { notFound } from 'next/navigation';

interface UserPageProps {
    params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
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

    return (
        <div className="container mx-auto p-4 py-8">
            <UserDetails user={user} />
        </div>
    );
}
