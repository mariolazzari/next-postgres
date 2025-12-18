import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import "server-only";

export const getCategories = async () => {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(asc(categoriesTable.name));

  return categories;
};
