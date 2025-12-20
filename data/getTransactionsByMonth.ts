import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import "server-only";

const DATE_FORMAT = "yyyy-MM-dd";

type Params = {
  month: number;
  year: number;
};

export async function getTransactionsByMonth({ month, year }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const earliestDate = new Date(year, month - 1, 1);
  const latestDate = new Date(year, month, 0);

  const transactions = await db
    .select({
      id: transactionsTable.id,
      description: transactionsTable.description,
      amount: transactionsTable.amount,
      transactionDate: transactionsTable.transactionDate,
      category: categoriesTable.name,
      transactionType: categoriesTable.type,
    })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.userId, userId),
        gte(
          transactionsTable.transactionDate,
          format(earliestDate, DATE_FORMAT)
        ),
        lte(transactionsTable.transactionDate, format(latestDate, DATE_FORMAT))
      )
    )
    .orderBy(desc(transactionsTable.transactionDate))
    .leftJoin(
      categoriesTable,
      eq(transactionsTable.categoryId, categoriesTable.id)
    );

  return transactions;
}
