import Link from "next/link";
import ProductTable from "../components/ProductTable";
import ProtectedRoute from "../components/ProtextedRoute";

const Products = () => {
  return (
    <ProtectedRoute>
      <div className="m-20 text-zinc-950">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Products</h1>
          <div className="m-5 p-0 flex justify-end">
            <Link className="w-25 btn btn-s" href="/products/add">
              + Add
            </Link>
          </div>
        </div>
        <ProductTable />
      </div>
    </ProtectedRoute>
  );
};

export default Products;
