'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { DEFAULT_VALUES } from '../config';
import { ActionState, User } from '../types';

interface UserFormProps {
    initialData?: User;
    action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}

export default function UserForm({ initialData, action }: UserFormProps) {
    const initialState: ActionState = { message: null, errors: {} };
    // Использование useActionState для обработки Server Action
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form action={formAction} className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg bg-transparent">
            <div className="flex gap-6 mb-6">
                {/* Секция аватара */}
                <div className="flex-shrink-0 text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden mb-2 mx-auto">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={initialData?.avatar || "https://via.placeholder.com/150"} 
                            alt="Avatar Preview" 
                            className="w-full h-full object-cover"
                            id="avatar-preview"
                            style={{ borderColor: initialData?.color || '#e5e7eb' }}
                        />
                    </div>
                </div>

                <div className="flex-grow flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ім&apos;я:</label>
                        <input
                            name="name"
                            defaultValue={initialData?.name ?? DEFAULT_VALUES.name}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                        />
                        {state?.errors?.name && (
                            <p className="mt-1 text-xs text-red-500">{state.errors.name[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL аватара:</label>
                        <input
                            name="avatar"
                            defaultValue={initialData?.avatar ?? DEFAULT_VALUES.avatar}
                            placeholder="https://..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                            onChange={(e) => {
                                const img = document.getElementById('avatar-preview') as HTMLImageElement;
                                if (img) img.src = e.target.value || 'https://via.placeholder.com/150';
                            }}
                        />
                        {state?.errors?.avatar && (
                            <p className="mt-1 text-xs text-red-500">{state.errors.avatar[0]}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={initialData?.email ?? DEFAULT_VALUES.email}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                    />
                    {state?.errors?.email && (
                        <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Телефон:</label>
                    <input
                        type="tel"
                        name="phone"
                        defaultValue={initialData?.phone ?? DEFAULT_VALUES.phone}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Країна:</label>
                    <input
                        type="text"
                        name="country"
                        defaultValue={initialData?.country ?? DEFAULT_VALUES.country}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Колір (HEX):</label>
                    <div className="mt-1 flex items-center gap-2">
                        <input
                            type="color"
                            name="color"
                            defaultValue={initialData?.color ?? DEFAULT_VALUES.color}
                            className="h-10 w-16 p-0 border-none bg-transparent cursor-pointer"
                        />
                    </div>
                    {state?.errors?.color && (
                        <p className="mt-1 text-xs text-red-500">{state.errors.color[0]}</p>
                    )}
                </div>
            </div>

            {state?.message && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {state.message}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Link
                    href="/users"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-md hover:bg-gray-100"
                >
                    Скасувати
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition"
                >
                    {isPending ? 'Збереження...' : 'Зберегти'}
                </button>
            </div>
        </form>
    );
}
