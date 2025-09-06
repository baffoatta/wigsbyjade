import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { GET_PRODUCTS } from "@/graphql/queries";
import client from "@/lib/apollo";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  image: {
    sourceUrl: string;
    altText: string;
  } | null;
}

interface ProductsData {
  products: {
    nodes: Product[];
  };
}

async function getProducts(category?: string) {
  const variables = category ? { categoryIn: [category] } : {};
  try {
    const { data } = await client.query<ProductsData>({
      query: GET_PRODUCTS,
      variables,
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });
    return data?.products?.nodes || [];
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
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
