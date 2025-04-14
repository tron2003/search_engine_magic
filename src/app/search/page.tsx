import { db } from "@/db";
import { Product, productsTable } from "@/db/schema";
import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { vectorize } from "@/lib/vectorize";
import { Index } from "@upstash/vector";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export type CoreProduct = Omit<Product, "created_At" | "updated_At">;
const index = new Index<CoreProduct>();

const Page = async ({ searchParams }: PageProps) => {
    // Await the resolution of searchParams to satisfy Next.js dynamic API rules
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const query = resolvedSearchParams.query;

    if (Array.isArray(query) || !query) {
        return redirect("/");
    }

    // Build the full-text search query by splitting and joining with " & "
    const cleanedQuery = query.trim().split(" ").join(" & ");

    const products: CoreProduct[] = await db
        .select()
        .from(productsTable)
        .where(
            sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${productsTable.description}))
           @@ to_tsquery('simple', lower(${cleanedQuery}))`
        )
        .limit(3);

    if (products.length < 3) {
        // Search products by semantic similarity
        const vector = await vectorize(query);

        const res = await index.query({
            topK: 5,
            vector,
            includeMetadata: true,
        });

        const vectorProducts = res
            .filter((existingProduct) => {
                // Ignore if already in the list or if similarity score is too low
                if (
                    products.some((product) => product.id === existingProduct.id) ||
                    existingProduct.score < 0.9
                ) {
                    return false;
                } else {
                    return true;
                }
            })
            .map(({ metadata }) => metadata!);

        products.push(...vectorProducts);
    }
    if (products.length === 0) {

        return (

            <div className="text-center py-4 bg-white  shadow-md rounded-b-md">
                <X className='mx-auto h-8 w-8 text-grey-400' />
                <h3 className="mt-2 text-sm font-semibold text-gray-900 ">
                    No Results
                </h3>
                <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500">
                    Sorry not able to find any result for {' '}
                    <span className="text-green-600 font-medium ">{query}</span>.                </p>

            </div>

        )
    }
    return (
        <ul className="py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
            {products.slice(0, 3).map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <li className="mx-auto py-4 px-8 flex space-x-4">
                        <div className="relative flex items-center justify-center bg-zinc-100 rounded-lg h-40 w-40">
                            <Image
                                loading="eager"
                                fill
                                alt="product-image"
                                src={`/${product.imageId}`}
                            />
                        </div>
                        <div className="w-full flex-1 space-y-2 py-1">
                            <h1 className="text-lg font-medium text-grey-900 ">{product.name}</h1>
                            <p className="prose prose-m text-grey-500 line-clamp-3">
                                {product.description}
                            </p>
                            <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default Page;
