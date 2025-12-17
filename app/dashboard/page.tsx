import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href="/dashboard/transactions/new">
        <Button>New Transaction</Button>
      </Link>
    </div>
  );
}

export default DashboardPage;
