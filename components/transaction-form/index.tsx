"use client";
import { endOfTomorrow } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transactionFormSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.coerce
    .date()
    .max(endOfTomorrow(), "Transaction date cannot be in the future"),
  amount: z.coerce.number().positive("Amount must be greate than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 chars")
    .max(300, "Description must contain a maximun of 300 chars"),
});

type TransactionFormInput = z.input<typeof transactionFormSchema>;
// type TransactionFormOutput = z.output<typeof transactionFormSchema>;

export function TransactionForm() {
  const form = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      description: "",
      categoryId: 0,
      transactionDate: new Date(),
      transactionType: "income",
    },
  });

  return <div>Transaction Form</div>;
}
