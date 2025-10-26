import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { wcAPI } from "@/lib/woocommerce";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

async function getProducts(category?: string) {
  try {
    const params: Record<string, string | number> = {};
    if (category) {
      // Find category ID by slug - this might require a separate call
      // For now, we'll use the slug directly if the API supports it
      params.category = category;
    }
    const products = await wcAPI.getProducts(params);
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductList = async ({ category }: { category?: string }) => {
  const products = await getProducts(category);
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showQuickView={false}
              showWishlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <Suspense fallback={<div>Loading filters...</div>}>
        <ProductFilters />
      </Suspense>
      <main className="flex-grow p-4">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList category={category} />
        </Suspense>
      </main>
    </div>
  );
}
