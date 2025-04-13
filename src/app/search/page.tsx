import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const Page = async ({ searchParams }: PageProps) => {
    const query = searchParams.query;

    if (Array.isArray(query) || !query) {
        return redirect('/');
    }

    const cleanedQuery = query.trim().split(/\s+/).join(' & ');

    const products = await db
        .select()
        .from(productsTable)
        .where(
            sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${productsTable.description})) @@ to_tsquery('simple', ${cleanedQuery})`
        ).limit(3);

    return <pre>{ JSON.stringify(products)}</pre>;
};

export default Page;
