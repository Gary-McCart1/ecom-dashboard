import { products } from "@/app/data/products";
import { Product } from "@/app/types/product";
console.log("API ROUTE HIT")

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const product = products.find((m) => m.id === id);

  if (!product) {
    return new Response(null, { status: 404 });
  }

  return Response.json(product);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const updatedProduct: Product = await request.json(); // read from body

  const productIndex = products.findIndex((m) => m.id === id);

  if (productIndex === -1) {
    return new Response("Product not found", { status: 404 });
  }

  products[productIndex] = { ...products[productIndex], ...updatedProduct };

  return Response.json(products[productIndex]);
}

