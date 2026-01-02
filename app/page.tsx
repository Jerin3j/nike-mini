import ProductCard from "./components/product/ProductCart";

export default function Home() {
  return (
    <div className="flex items-center justify-center px-18 bg-[#161616] mx-10">
      <div className="flex flex-col gap-5 py-10">
        <h1 className="text-2xl">Men's Jordan Shoes</h1>
        <div className="flex gap-8">
          {[1, 2, 3, 4].map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
