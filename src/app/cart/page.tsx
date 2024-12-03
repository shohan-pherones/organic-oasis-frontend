"use client";

import SectionTitle from "@/components/SectionTitle";
import useCart from "@/hooks/useCart";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const {
    items,
    shippingCost,
    subtotal,
    tax,
    totalPrice,
    removeItemDispatcher,
    clearCartDispatcher,
  } = useCart();
  const router = useRouter();

  const handleCheckout = () => {};

  return (
    <main>
      {items.length > 0 && (
        <section className="wrapper grid grid-cols-1 xl:grid-cols-3 gap-10 xl:min-h-screen">
          <div className="xl:col-span-2">
            <SectionTitle
              title={`Cart Item${items.length > 1 ? "s" : ""}: ${items.length}`}
            />
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Calculated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Link
                          href={`/products/${item._id}`}
                          className="flex items-center gap-3"
                        >
                          <div className="avatar">
                            <div className="mask mask-squircle h-16 w-16 md:h-20 md:w-20">
                              <Image
                                src={item.image as string}
                                alt={item.name}
                                width={512}
                                height={512}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">
                              {item.description.substring(0, 100)}...
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() =>
                            removeItemDispatcher(item._id as string)
                          }
                          className="btn"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex items-center gap-5 flex-wrap">
              <Link href="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
              <button onClick={() => router.back()} className="btn">
                Go Back
              </button>
              <button onClick={() => clearCartDispatcher()} className="btn">
                Clear Cart
              </button>
            </div>
          </div>
          <div>
            <SectionTitle title="Summary" />
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Subtotal
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${subtotal.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Shipping Cost
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${shippingCost.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap">
                  Tax (5%)
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap">
                  ${tax.toFixed(2)}
                </span>
              </p>
              <p className="flex gap-2 items-center justify-between">
                <span className="flex-shrink-0 whitespace-nowrap font-bold">
                  Total
                </span>
                <span className="w-full h-px border border-dashed"></span>
                <span className="flex-shrink-0 whitespace-nowrap font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
            <button onClick={handleCheckout} className="mt-5 btn btn-primary">
              Proceed to Checkout
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default CartPage;
