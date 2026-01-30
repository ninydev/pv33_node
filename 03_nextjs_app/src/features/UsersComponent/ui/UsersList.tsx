'use client';

import React from 'react';
import { User } from '../types';
import Link from 'next/link';
import { deleteUserAction } from '../actions';

interface UsersListProps {
    users: User[];
}

export default function UsersList({ users }: UsersListProps) {
    if (users.length === 0) {
        return <div className="p-4 text-center">Користувачів не знайдено</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200 bg-transparent">
                <thead>
                    <tr className="bg-gray-100/50">
                        <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Ім&apos;я</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const deleteWithId = deleteUserAction.bind(null, user.id);
                        
                        return (
                            <tr key={user.id} className="hover:bg-gray-500/5 transition-colors">
                                <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-200 px-4 py-2 font-bold">
                                    <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
                                        {user.name}
                                    </Link>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/users/${user.id}`} className="text-gray-600 hover:text-gray-900 text-sm">
                                            View
                                        </Link>
                                        <Link href={`/users/${user.id}/edit`} className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">
                                            ✏️ Ред.
                                        </Link>
                                        <form action={deleteWithId} onSubmit={(e) => {
                                            if (!confirm('Ви впевнені?')) e.preventDefault();
                                        }}>
                                            <button type="submit" className="text-red-500 hover:text-red-700 text-sm cursor-pointer">
                                                Del
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
