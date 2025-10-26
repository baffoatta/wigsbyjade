import ProductCard from "@/components/ProductCard";
import { wcAPI } from "@/lib/woocommerce";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    term?: string;
  }>;
}

async function getSearchResults(term: string) {
  if (!term) return [];
  try {
    const products = await wcAPI.searchProducts(term);
    return products || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

const SearchResults = async ({ term }: { term: string }) => {
  const products = await getSearchResults(term);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Search Results for &quot;{term}&quot;
      </h1>
      {products.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
    </>
  );
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term = "" } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults term={term} />
      </Suspense>
    </div>
  );
}
