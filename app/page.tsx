import ProductCard from "./components/product/ProductCart";

type Size = {
  size_id: number;
  size_name: string;
  price: number;
  variation_product_id: number;
};

type VariationColor = {
  color_id: number;
  color_name: string;
  color_images: string[];
  sizes: Size[];
};

type Product = {
  id: string;
  name: string;
  product_images: { product_image: string }[];
  variation_colors: VariationColor[];
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/new-products/`,
    {
      cache: "no-store", 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-[#161616] lg:mx-10 lg:px-18 px-8 py-5 lg:py-14">
      <h1 className="text-2xl lg:text-3xl text-white mb-6 font-semibold">
        Men's Jordan Shoes
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
