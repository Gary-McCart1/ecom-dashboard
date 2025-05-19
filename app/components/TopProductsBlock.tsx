"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "../types/order";
import { Product } from "../types/product";
import Loading from "../loading";

const countProductOrders = (orders: Order[], products: Product[]) => {
  const counts: { [key: string]: { count: number; id: number } } = {};

  orders.forEach((order) => {
    order.products.forEach((productId) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      if (!counts[product.name]) {
        counts[product.name] = { count: 1, id: product.id };
      } else {
        counts[product.name].count += 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([name, { count, id }]) => ({ name, count, id }))
    .sort((a, b) => b.count - a.count);
};

const TopProductsBlock = () => {
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState<
    { name: string; count: number; id: number }[]
  >([]);

  const [, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await fetch(
          "https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/"
        );
        const orderData = await orderResponse.json();
        console.log(orderData.results)
        const productResponse = await fetch(
          "https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/"
        );
        const productData = await productResponse.json();
        console.log(productData.results)
        setProducts(productData.results);

        const ordersByProduct = countProductOrders(
          orderData.results,
          productData.results
        );
        setTopProducts(ordersByProduct.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-3 flex flex-col justify-between rounded-lg bg-gray-100 h-50">
      <div className="h-full">
        <div>
          <strong>Top products</strong>
        </div>
        <div className="mt-2">
          <div>
            {topProducts.map((product, index) => (
              <div key={index} className="mt-1">
                <Link
                  className="w-full hover:underline"
                  href={`/products/${product.id}`}
                >
                  <em>{product.name}</em>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Link href="/products">View all products &rarr;</Link>
      </div>
    </div>
  );
};

export default TopProductsBlock;
