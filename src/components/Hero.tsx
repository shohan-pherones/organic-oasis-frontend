import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="hero h-[calc(100vh-4rem)]"
      style={{
        backgroundImage: "url(/images/hero.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-4xl">
          <h1 className="mb-5 text-5xl font-bold">
            Fresh, Pure, and Delivered to Your Door – Shop Organic Today!
          </h1>
          <p className="mb-5">
            Discover the finest organic products, from farm-fresh produce to
            eco-friendly essentials, all sustainably sourced and delivered
            straight to you. Experience the health benefits of going organic
            with every purchase, while supporting environmentally-conscious
            practices.
          </p>
          <Link href="/products" className="btn btn-accent">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
