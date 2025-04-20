import { Suspense } from 'react';
import SearchComponent from './SearchComponent';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchComponent />
        </Suspense>
    );
}
