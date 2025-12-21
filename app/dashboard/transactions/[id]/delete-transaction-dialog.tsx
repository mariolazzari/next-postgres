"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteTransaction } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  transactionId: number;
  transactionDate: string;
};

function DeleteTransactionDialog({ transactionId, transactionDate }: Props) {
  const router = useRouter();

  const handleDeleteConfirm = async () => {
    const result = await deleteTransaction(transactionId);
    if (result?.error) {
      toast.error(result.message);
      return;
    }
    toast.success("Transaction deleted");

    const [year, month] = transactionDate.split("-");
    router.push(`/dashboard/transactions?month=${month}&year=${year}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This transaction will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteConfirm} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTransactionDialog;
