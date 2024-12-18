export interface Transaction {
    id: number;
    buyer: string;
    date: string;
    diamondType: string;
    carat: number;
    price: string;
    status: 'Delivered' | 'Pending' | 'Shipped';
  }
  
  const TransactionCard: React.FC<Transaction> = ({
    buyer,
    date,
    diamondType,
    carat,
    price,
    status,
  }) => {
    // Conditional styling for status
    const statusColor =
      status === 'Delivered'
        ? 'bg-green-500'
        : status === 'Pending'
        ? 'bg-yellow-500'
        : 'bg-blue-500';
  
    return (
      <div className="bg-white border border-gray-300 text-black p-4 rounded-lg shadow-md flex justify-between items-center">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-semibold">{buyer}</h3>
          <p className="text-sm text-gray-400">{date}</p>
          <p className="text-sm">
            <span className="font-bold">Diamond:</span> {diamondType} ({carat} carat)
          </p>
          <p className="text-sm">
            <span className="font-bold">Price:</span> {price}
          </p>
        </div>
  
        {/* Right Section */}
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>
        </div>
      </div>
    );
  };
  
  export default TransactionCard;
  