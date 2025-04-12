import { doublePrecision, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
    id: text("id").primaryKey().default('uuid_generate_v4()'),
    name: text("name").notNull(),
    imageId: text("imageId").notNull(),  // <-- removed the space in "imageId "
    price: doublePrecision("price").notNull(),
    description: text("description"),
    createdAt: timestamp("created_At").defaultNow(),  // <-- timestamp fixed as function
    updatedAt:timestamp("updated_At").defaultNow()
});
export type Product = typeof productsTable.$inferSelect