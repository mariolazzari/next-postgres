"use client";
import { Category } from "@/db/schema";
import { TransactionForm, transactionFormSchema } from "../transaction-form";
import { createTransaction } from "@/app/dashboard/transactions/new/actions";
import { format } from "date-fns";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  categories: Category[];
};

export const NewTransactionForm = ({ categories }: Props) => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      categoryId: data.categoryId,
      description: data.description,
    });

    if (result.error) {
      toast.error(result.message);
      return;
    }
    toast.success("Transaction created");

    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
  };

  return <TransactionForm categories={categories} onSubmit={onSubmit} />;
};
