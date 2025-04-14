"use client";
import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
    const searchParams = useSearchParams()
    const defaultQuery = searchParams.get("query") || ''
    

    const inputRef = useRef<HTMLInputElement>(null);
    const [isSearching, startTransition] = useTransition();
    const router = useRouter();
    const [query, setQuery] = useState<string>(defaultQuery);

    const search = () => {
        startTransition(() => {
            router.push(`/search?query=${query}`);
        });
    };

    return (
        <div className="relative w-full h-15 flex flex-col bg-white">
            <div className="w-full flex items-center bg-white p-4 rounded-lg">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search();
                        }
                        if (e.key === "Escape") {
                            inputRef?.current?.blur();
                        }
                    }}
                    className="absolute inset-0 h-full border-amber-300 border-2"
                    placeholder="Search..."
                />
                <Button
                    disabled={isSearching}
                    size="sm"
                    onClick={search}
                    className="absolute right-0 inset-y-0 h-full w-12 rounded-l-none"
                >
                    {isSearching
                        ? <Loader2 className="h-6 w-6 animate-spin" />
                        : <Search className="h-6 w-6" />
                    }
                </Button>
            </div>
        </div>
    );
}
