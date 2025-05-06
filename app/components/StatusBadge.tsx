const statusColorMap: { [key: string]: string } = {
  Shipped: "bg-blue-400",
  Delivered: "bg-green-400",
  Pending: "bg-yellow-400",
  Processing: "bg-yellow-400",
  Cancelled: "bg-red-400",
};

const StatusBadge = ({ status }: { status: string }) => {
  const color = statusColorMap[status] || "bg-gray-400";
  return (
    <span className={`${color} rounded-lg px-2 py-1 text-sm`}>{status}</span>
  );
};

export default StatusBadge;
