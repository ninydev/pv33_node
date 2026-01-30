'use client';

import React from 'react';
import { User } from '../types';
import Link from 'next/link';
import { deleteUserAction } from '../actions';

interface UserDetailsProps {
    user: User;
}

export default function UserDetails({ user }: UserDetailsProps) {
    const deleteWithId = deleteUserAction.bind(null, user.id);

    return (
        <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-sm">
            <div className="flex items-center gap-6 mb-8">
                <div className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={user.avatar || 'https://via.placeholder.com/150'} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full object-cover border-4"
                        style={{ borderColor: user.color }}
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-500">ID: {user.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email</h3>
                    <p className="text-lg text-gray-700">{user.email}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Телефон</h3>
                    <p className="text-lg text-gray-700">{user.phone || '—'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Країна</h3>
                    <p className="text-lg text-gray-700">{user.country || '—'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Улюблений колір</h3>
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-6 h-6 rounded-full border border-gray-200" 
                            style={{ backgroundColor: user.color }}
                        ></div>
                        <p className="text-lg text-gray-700">{user.color}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Link 
                    href="/users" 
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                    ← Назад до списку
                </Link>

                <div className="flex gap-3">
                    <form action={deleteWithId} onSubmit={(e) => {
                        if (!confirm('Ви впевнені, що хочете видалити цього користувача?')) {
                            e.preventDefault();
                        }
                    }}>
                        <button 
                            type="submit"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Видалити
                        </button>
                    </form>
                    
                    <Link 
                        href={`/users/${user.id}/edit`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Редагувати
                    </Link>
                </div>
            </div>
        </div>
    );
}
