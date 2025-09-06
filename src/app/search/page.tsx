import ProductCard from "@/components/ProductCard";
import { PRODUCT_SEARCH_QUERY } from "@/graphql/queries";
import client from "@/lib/apollo";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    term?: string;
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

interface SearchData {
  products: {
    nodes: Product[];
  };
}

async function getSearchResults(term: string) {
  if (!term) return [];
  try {
    const { data } = await client.query<SearchData>({
      query: PRODUCT_SEARCH_QUERY,
      variables: { search: term },
    });
    return data?.products?.nodes || [];
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
            <ProductCard key={product.id} product={product} />
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
