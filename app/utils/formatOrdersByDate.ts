import { Order } from "../types/order";

export const OrdersAndSales = (
  orders: Order[]
): { date: number; total: number }[] => {
  const orderSales = [];

  // Iterate over orders to collect date (as timestamp) and total sales
  for (let i = 0; i < orders.length; i++) {
    const date = new Date(orders[i].date).getTime(); // Convert to timestamp
    const total = parseFloat(orders[i].total.toString()); // Convert total to a number

    orderSales.unshift({ date, total });
  }

  return orderSales;
};
