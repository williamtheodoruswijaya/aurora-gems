import TransactionCard, { Transaction } from '@/components/transactionCard';

const transactions: Transaction[] = [
  {
    id: 1,
    buyer: 'Asuna Yuuki',
    date: '12/08/2024, 10:32 PM',
    diamondType: 'Blue Sapphire',
    carat: 2.5,
    price: '$5,000',
    status: 'Delivered',
  },
  {
    id: 2,
    buyer: 'Kazuto Kirigaya',
    date: '12/08/2024, 9:30 PM',
    diamondType: 'Emerald',
    carat: 1.8,
    price: '$3,200',
    status: 'Pending',
  },
  {
    id: 3,
    buyer: 'Sinon',
    date: '12/08/2024, 8:15 PM',
    diamondType: 'Ruby',
    carat: 3.0,
    price: '$6,500',
    status: 'Shipped',
  },
];

export default function Transactions() {
  return (
    <div className="flex h-screen text-white ml-64 mt-16 w-screen">
      <div className="flex-1 flex flex-col">

        {/* Transaction List */}
        <div className="p-6 space-y-4 overflow-y-auto w-full">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
