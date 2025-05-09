import { Order } from "../types/order";

async function fetchAllOrders() {
    let allOrders: Order[] = [];
    let nextUrl: string | null = "https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/";
  
    try {
      while (nextUrl) {
        const response: Response = await fetch(nextUrl);
        const data = await response.json();
        allOrders = allOrders.concat(data.results);
        
        nextUrl = data.next; // null if no more pages
      }
  
      return allOrders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  }

export default fetchAllOrders;