'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function NotFoundContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || '/';

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Page not found
            </h2>
            <p className="mt-4 text-base text-gray-500">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-6">
                <Link
                    href={from}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Go back
                </Link>
            </div>
        </div>
    );
}

export default function NotFound() {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Page not found
                    </h2>
                    <p className="mt-4 text-base text-gray-500">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    </p>
                </div>
            }
        >
            <NotFoundContent />
        </Suspense>
    );
}
