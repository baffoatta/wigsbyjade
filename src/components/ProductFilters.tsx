"use client";

import { GET_CATEGORIES } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ProductFilters = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  if (loading) return <p>Loading filters...</p>;
  if (error) return <p>Error loading filters.</p>;

  const categories = (data as { productCategories?: { nodes?: Category[] } })
    ?.productCategories?.nodes;

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        <li className={!currentCategory ? "font-bold" : ""}>
          <Link href="/products">All Products</Link>
        </li>
        {categories &&
          categories.map((category: Category) => (
            <li
              key={category.id}
              className={currentCategory === category.slug ? "font-bold" : ""}
            >
              <Link href={`/products?category=${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default ProductFilters;
