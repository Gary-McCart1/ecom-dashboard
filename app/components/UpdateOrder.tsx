import { ChangeEvent } from "react";


interface Props {
  currentStatus: string;
  onUpdateStatus: (status: string) => void;
}

const UpdateOrder = ({ currentStatus, onUpdateStatus }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(e.target.value)
  }

  return (
    <div className="w-full">
      <form className="w-full">
        <select value={currentStatus} onChange={(e) => handleChange(e)} className="w-full h-full p-2">
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
        </select>
      </form>
    </div>
  );
};

export default UpdateOrder;
