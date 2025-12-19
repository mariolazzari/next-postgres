"use client";

import { Category } from "@/db/schema";
import { TransactionForm, transactionFormSchema } from "../transaction-form";
import { createTransaction } from "@/app/dashboard/transactions/new/actions";
import { format } from "date-fns";

type Props = {
  categories: Category[];
};

export const NewTransactionForm = ({ categories }: Props) => {
  const onSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      categoryId: data.categoryId,
      description: data.description,
    });

    // if (result.error) {
    //   toast({
    //     title: "Error",
    //     description: result.message,
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // toast({
    //   title: "Success",
    //   description: "Transaction created",
    //   variant: "success",
    // });

    // router.push(
    //   `/dashboard/transactions?month=${
    //     data.transactionDate.getMonth() + 1
    //   }&year=${data.transactionDate.getFullYear()}`
    // );

    console.log(result.id);
  };

  return <TransactionForm categories={categories} onSubmit={onSubmit} />;
};
