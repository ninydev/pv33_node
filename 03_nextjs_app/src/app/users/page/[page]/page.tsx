import React from 'react';
import fetchUserList from '@/features/UsersComponent/api/fetchUserList';
import UsersList from '@/features/UsersComponent/ui/UsersList';
import Pagination from '@/features/UsersComponent/ui/Pagination';
import Link from 'next/link';
import { User } from '@/features/UsersComponent/types';

export async function generateStaticParams() {
    // Предварительно генерируем первые 5 страниц для демонстрации SSG
    return [
        { page: '1' },
        { page: '2' },
        { page: '3' },
        { page: '4' },
        { page: '5' },
    ];
}

interface PageProps {
    params: Promise<{ page: string }>;
}

export default async function UsersPage({ params }: PageProps) {
    const { page } = await params;
    const currentPage = parseInt(page) || 1;
    const limit = 10;

    // Запрос выполняется на стороне сервера
    let users: User[] = [];
    let error: string | null = null;
    
    try {
        users = await fetchUserList(currentPage, limit);
    } catch (e) {
        error = e instanceof Error ? e.message : String(e);
    }

    const hasMore = users.length === limit;

    if (error) {
        return <div className="p-4 text-red-500 font-bold">Помилка завантаження: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Список користувачів (Next.js Server Side)</h1>
                <Link href="/users/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                    + Створити
                </Link>
            </header>

            <div className="shadow-md rounded-lg p-6">
                <UsersList users={users} />

                <Pagination 
                    currentPage={currentPage} 
                    hasMore={hasMore} 
                    baseUrl="/users/page" 
                />
            </div>
            
            <footer className="mt-8 text-sm text-gray-500 text-center">
                Ця сторінка була згенерована на сервері. Логіка завантаження даних повністю перенесена з useEffect на Server Side.
            </footer>
        </div>
    );
}
