import { orders } from "@/app/data/orders";

export const GET = (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const order = orders.find((m) => m.id === id);

  if (!order) {
    return new Response(null, { status: 404 });
  }

  return Response.json(order);
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const orderIndex = orders.findIndex((m) => m.id === id);
  if (orderIndex === -1) {
    return new Response(null, { status: 404 });
  }
  const { status } = await request.json();
  const validStatuses = [
    "Shipped",
    "Delivered",
    "Pending",
    "Processing",
    "Cancelled",
  ];

  if (!validStatuses.includes(status)) {
    return new Response(JSON.stringify({ message: "Invalid status" }), {
      status: 400,
    });
  }

  orders[orderIndex].status = status;

  return Response.json(orders[orderIndex]);
};
