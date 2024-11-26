import { IProduct } from "@/interfaces";
import SectionTitle from "./SectionTitle";
import Product from "./Product";

interface ProductsProps {
  products: IProduct[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <section className="wrapper">
      <SectionTitle title="Browse All Products" />
      <div className="grid-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
