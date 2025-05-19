import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  color: string;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, color }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close toast after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        color === "green" ? "bg-green-500" : "bg-red-500"
      } text-white py-2 px-4 rounded-md shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Toast;
