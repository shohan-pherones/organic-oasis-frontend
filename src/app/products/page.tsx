"use client";

import Loading from "@/components/Loading";
import Products from "@/components/Products";
import { useGetProducts } from "@/hooks/product/useGetProducts";
import { notFound } from "next/navigation";

const ProductsPage = () => {
  const { data, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.products?.length) {
    return notFound();
  }

  return (
    <main>
      <Products />
    </main>
  );
};

export default ProductsPage;
