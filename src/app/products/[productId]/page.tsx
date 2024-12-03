"use client";

import Loading from "@/components/Loading";
import { useGetProduct } from "@/hooks/useGetProduct";
import { addItem } from "@/redux/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const { productId } = useParams();
  const { data, isLoading } = useGetProduct(productId as string);
  const router = useRouter();
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.product) {
    return notFound();
  }

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      toast.error("Minimum quantity reached. You cannot decrease furthur.");
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity === data.product.stock) {
      toast.error("Maximum stock limit reached. You can not add more.");
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(addItem({ ...data.product, quantity }));
    router.push("/cart");
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* IMAGE */}
        <div className="w-full h-[calc(100vh-4rem)] order-1 md:order-first xl:col-span-2">
          <Image
            src={data.product.image as string}
            alt={data.product.name}
            width={1080}
            height={1920}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        {/* TEXT CONTENTS */}
        <div className="wrapper flex flex-col gap-5 justify-center">
          <div className="flex justify-between gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              {data.product.categories.map((category) => (
                <span
                  key={category._id}
                  className="badge badge-secondary whitespace-nowrap font-medium text-xs uppercase"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <div className="flex-shrink-0 whitespace-nowrap">
              Stocks:{" "}
              <span className="badge badge-accent whitespace-nowrap font-medium text-xs uppercase">
                {data.product.stock}
              </span>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">
            {data.product.name}
          </h3>
          <p>{data.product.description}</p>
          <div className="grid grid-cols-2 gap-5 items-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              ${(data.product.price * quantity).toFixed(2)}
            </h3>
            <div className="flex items-center justify-end">
              <button
                onClick={handleDecreaseQuantity}
                className="btn w-14 h-10 flex items-center justify-center"
              >
                <Minus />
              </button>
              <span className="w-14 h-10 flex items-center justify-center">
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="btn w-14 h-10 flex items-center justify-center"
              >
                <Plus />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center">
            <button onClick={() => router.back()} className="btn">
              Go Back
            </button>
            <button
              onClick={handleAddToCart}
              disabled={data.product.stock === 0}
              className="btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
          <p className="text-sm opacity-50">
            Once an item has been added to the cart, you will not be able to
            modify its quantity. Please ensure the desired quantity is selected
            before adding the item to your cart.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
