"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateTransaction } from "./actions";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  TransactionForm,
  transactionFormSchema,
} from "@/components/transaction-form";
import { Category } from "@/db/schema";

export default function EditTransactionForm({
  categories,
  transaction,
}: {
  categories: Category[];
  transaction: {
    id: number;
    categoryId: number;
    amount: string;
    description: string;
    transactionDate: string;
  };
}) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
    });

    if (result?.error) {
      toast.error(result.message);
      return;
    }
    toast.success("Transaction updated");

    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
  };
  return (
    <TransactionForm
      defaultValues={{
        amount: +transaction.amount,
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find(c => c.id === transaction.categoryId)?.type ??
          "income",
      }}
      onSubmit={handleSubmit}
      categories={categories}
    />
  );
}
