import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
    throw new Error('❌ DATABASE_URL is not defined! Check your .env file.');
}

const dbUrl = new URL(process.env.DATABASE_URL);

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: dbUrl.hostname,
        port: Number(dbUrl.port || 5432),  // default PostgreSQL port
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.slice(1),
        ssl: true  // <-- this tells Drizzle to use SSL for Neon
    },
} satisfies Config;
