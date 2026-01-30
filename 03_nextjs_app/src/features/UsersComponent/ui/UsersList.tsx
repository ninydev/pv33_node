import React from 'react';
import { User } from '../types';
import Link from 'next/link';

interface UsersListProps {
    users: User[];
}

export default function UsersList({ users }: UsersListProps) {
    if (users.length === 0) {
        return <div className="p-4 text-center">Пользователей не найдено</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Имя</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-200 px-4 py-2 font-bold">
                                <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
                                    {user.name}
                                </Link>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-200 px-4 py-2 space-x-2">
                                <Link href={`/users/${user.id}`} className="text-gray-600 hover:text-gray-900">
                                    View
                                </Link>
                                <Link href={`/users/${user.id}/edit`} className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">
                                    ✏️ Ред.
                                </Link>
                                {/* Удаление пока оставим ссылкой или кнопкой, позже добавим Server Action */}
                                <button className="text-red-500 hover:text-red-700 ml-2">
                                    Del
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
