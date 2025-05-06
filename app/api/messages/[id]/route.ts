import { messages } from "@/app/data/messages";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const message = messages.find((m) => m.id === id);

  if (!message) {
    return new Response(null, { status: 404 });
  }

  return Response.json(message);
}
