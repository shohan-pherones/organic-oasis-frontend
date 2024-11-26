import { IProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  console.log(product);
  return (
    <div className="card bg-base-100 w-full shadow-lg">
      <figure className="w-full h-52">
        <Image
          src={product.image!}
          alt={product.name}
          width={1280}
          height={720}
          priority
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2 flex-wrap">
          {product.categories.map((category) => (
            <span
              key={category._id}
              className="badge badge-secondary whitespace-nowrap font-medium text-xs uppercase"
            >
              {category.name}
            </span>
          ))}
        </div>
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description.substring(0, 200)}...</p>
        <div className="card-actions items-center justify-between">
          <h2 className="card-title">${product.price}</h2>
          <Link href={`/products/${product._id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
