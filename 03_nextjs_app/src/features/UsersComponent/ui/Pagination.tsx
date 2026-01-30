import React from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    hasMore: boolean;
    baseUrl: string;
}

export default function Pagination({ currentPage, hasMore, baseUrl }: PaginationProps) {
    const prevPage = Math.max(currentPage - 1, 1);
    const nextPage = currentPage + 1;

    return (
        <div className="mt-4 flex justify-between items-center p-4 rounded shadow-sm">
            <div className="flex gap-4 items-center">
                <Link
                    href={`${baseUrl}/${prevPage}`}
                    className={`px-4 py-2 border rounded ${currentPage === 1 ? 'pointer-events-none opacity-50 bg-gray-200' : ' hover:bg-gray-100'}`}
                >
                    ← Назад
                </Link>

                <span className="font-bold">Страница {currentPage}</span>

                <Link
                    href={`${baseUrl}/${nextPage}`}
                    className={`px-4 py-2 border rounded ${!hasMore ? 'pointer-events-none opacity-50 bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                    Вперед →
                </Link>
            </div>
        </div>
    );
}
