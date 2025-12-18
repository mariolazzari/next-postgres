import dotenv from "dotenv";
import { categoriesTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config({
  path: ".env.local",
});

const db = drizzle(process.env.DATABASE_URL!);

type CategoryInsert = typeof categoriesTable.$inferInsert;

const data: CategoryInsert[] = [
  {
    name: "Salary",
    type: "income",
  },
  {
    name: "Rental Income",
    type: "income",
  },
  {
    name: "Business Income",
    type: "income",
  },
  {
    name: "Investments",
    type: "income",
  },
  {
    name: "Other",
    type: "income",
  },
  {
    name: "Housing",
    type: "expense",
  },
  {
    name: "Transport",
    type: "expense",
  },
  {
    name: "Food & Groceries",
    type: "expense",
  },
  {
    name: "Health",
    type: "expense",
  },
  {
    name: "Entertainment & Leisure",
    type: "expense",
  },
  {
    name: "Other",
    type: "expense",
  },
];

(async () => {
  await db.insert(categoriesTable).values(data);
})();
