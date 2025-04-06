"use client";
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"; 


export const SearchBar = () => {


    const inputRef = useRef<HTMLInputElement>(null)
    const [isSearching, startTransition] = useTransition()
    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const search = () => {

        startTransition(() => {
            router.push(`/search?query=${query}`)


        })
    }


    return (

        <div className="relative w-full h-15 flex flex-col bg-white">

            <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded-lg">
                <Input value={query}
                    onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                        
                        if (e.key === 'Enter') { 
                            search()
                        }
                    if (e.key == 'Escape') {
                        inputRef?.current?.blur()
                    }

                }} className="  h-15 w-full flex-auto items-center border-amber-300 border-2" />

                <Button size='sm'onClick={search} className=" h-12 w-30 rounded-lg flex justify-center items-center " >
                    <Search className="" />
                </Button>


            </div>

        </div>
    )

}
