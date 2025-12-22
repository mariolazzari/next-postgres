import Cashflow from "./cashflow";
import RecentTransactions from "./recent-transactions";

type Props = {
  searchParams: Promise<{ cfyear: string }>;
};

async function DashboardPage({ searchParams }: Props) {
  const today = new Date();
  const searchParamsValues = await searchParams;
  let cfYear = +(searchParamsValues.cfyear ?? today.getFullYear());
  if (isNaN(cfYear)) {
    cfYear = today.getFullYear();
  }

  return (
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <Cashflow year={cfYear} />
      <RecentTransactions />
    </div>
  );
}

export default DashboardPage;
