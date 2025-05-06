import Link from "next/link";
import { Product } from "../types/product";
import NextImage from "next/image";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            {product.images.length > 0 && <div className="mask mask-squircle h-12 w-12">
              <NextImage
                width={48}
                height={48}
                className="rounded-md object-cover"
                src={product.images[0].url}
                alt={product.name}
              />
            </div>}
          </div>
          <div>
            <div className="font-bold hover:underline hover:cursor-pointer">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </div>
          </div>
        </div>
      </td>
      <td>
        ${product.price}
        <span className="ml-3 text-gray-500 line-through">
          ${product.originalPrice}
        </span>
      </td>
      <td>
        {product.rating} / 5.0
      </td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>
        <button className="btn btn-ghost btn-s">
          <Link href={`/products/${product.id}`}>Details</Link>
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
